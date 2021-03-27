---
layout: page
title: 'WireGuard 配置'
slug: wireguard
date: 2021-03-26
---

## Installation

比较新的内核都已经将 WireGuard 打包进了内核，直接安装管理工具即可

```shell
sudo apt install wireguard
```

查看是否安装完成

```
sudo modprobe wireguard | lsmod | grep wireguard
```

在 `/etc/moduels` 后追加 `wireguard` 使得能够自动载入内核模块

## Config

### 生成公私钥

```shell
wg genkey | tee private | wg pubkey > public
```

### Peer 1

这个作为接受外来连接的对等端

编辑 `/etc/wireguard/wg0.conf`，添加

```conf
[Interface]
Address = 10.1.1.1/24 # 对等端的 IP
ListenPort = 48659 # 监听的端口
PrivateKey = Private Key 1

[Peer] # 发起连接到这个客户端的对端
PublicKey = Public key 2
AllowedIPs = 10.1.1.2/32
PersistentKeepalive = 15
```

### Peer 2

```conf
[Interface]
PrivateKey = Private Key 2
Address = 10.1.1.2/24 # 发起连接的客户端的地址

[Peer]
PublicKey = Public Key 1
AllowedIPs = 10.1.1.0/24 # 在本地有哪些 IP 地址需要走 wg 的端口出去
Endpoint = ip1:port
PersistentKeepalive = 15
```

## Route

> 参考了 [Wireguard 使用笔记](https://gobomb.github.io/post/wireguard-notes/)

### Forward

需要修改 `/etc/sysctl.conf`

```conf
net.ipv4.ip_forward = 1
```

使得允许内核转发

### iptables

现在应该已经可以访问 WireGuard 的内网中的其他设备了，但是无法通过另一个设备将包转发出去

添加 iptables 的 filter 表中 FORWARD 链的规则，允许来自 wg0 和发往 wg0 的包通过

```shell
iptables -t filter -A FORWARD -i wg0 -j ACCEPT
iptables -t filter -A FORWARD -o wg0 -j ACCEPT
```

在这个时候应该可以在外面的设备上收到了请求，但是外面的设备收到的 ip 的源地址是内网地址，
而其上面不会有到内网地址的路由，因此需要通过 NAT 将源地址修改为出口网卡的出口地址

```shell
iptables -t nat -A POSTROUTING -s 10.1.1.0/24 -o eth0 -j MASQUERADE
```

之后就应该可以正常地访问了

## Config

```conf
[Interface]
    Address = 10.3.1.1/24
    ListenPort = 48659
    PrivateKey = Pirvate Key 1
    PostUp = iptables -t filter -A FORWARD -i %i -j ACCEPT; iptables -t filter -A FORWARD -o %i -j ACCEPT; iptables -t nat -A POSTROUTING -s 10.3.1.0/24 -o wlan0 -j MASQUERADE
    PostDown = iptables -t filter -D FORWARD -i %i -j ACCEPT; iptables -t filter -D FORWARD -o %i -j ACCEPT; iptables -t nat -D POSTROUTING -s 10.3.1.0/24 -o wlan0 -j MASQUERADE
[Peer]
    PublicKey = Public Key 2
    AllowedIPs = 10.3.1.2/32
    PersistentKeepalive = 15
```

```conf
[Interface]
PrivateKey = Private Key 2
Address = 10.3.1.2/24

[Peer]
PublicKey = Public Key 1
AllowedIPs = 10.3.1.0/24
Endpoint = ip:port
PersistentKeepalive = 15
```
