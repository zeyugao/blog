---
layout: page
title: Time Machine Server on Linux
slug: time-machine-on-linux
date: 2020-11-21
---

在 Linux 上配置了 Samba 之后，并不能字节用来作为 Time Machine 的备份分区，在 Finder 的 Network 下，直接尝试 Connect As 并不能够连上服务器，只能通过 `cmd + k` 连接上去。都是用于没有配置 afp 协议。

## Installation

```shell
apt install netatalk avahi-daemon
```

## Configure

### netatalk

位置 `/etc/netatalk/afp.conf`

```conf
[Global]
 dbus daemon = /usr/bin/dbus-daemon
 disconnect time = 3
 sleep time = 2
 log file = /var/log/netatalk.log
 log level = default:info
 uam list = uams_dhx2.so
 zeroconf = yes
 save password = no


[SharedFolder]
 path = 'shared folder path'
 ; http://netatalk.sourceforge.net/wiki/index.php/Spotlight
 ; spotlight = yes
 valid users = USERNAME1 USERNAME2 USERNAME3
 unix priv = yes
 file perm = 0600

[TimeCapsule]
path = 'time machine folder'
valid users = USERNAME2
time machine = yes
unix priv = yes
file perm = 0600
```

### avahi

添加 afp 协议 

位置 `/etc/avahi/services/timecapsule_afpd.service`

```xml
<?xml version="1.0" standalone='no'?>
<!DOCTYPE service-group SYSTEM "avahi-service.dtd">
<service-group>
 <name replace-wildcards="yes">%h</name>
 <service>
 <type>_afpovertcp._tcp</type>
 <port>548</port>
 </service>
 <service>
 <type>_device-info._tcp</type>
 <port>0</port>
 <txt-record>model=TimeCapsule</txt-record>
 </service>
</service-group>
```