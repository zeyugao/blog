---
layout: page
title: Let's Encrypt 配置
slug: letsencrypt
date: 2020-11-7
---

## Installation

```shell
sudo apt install certbot
```

## Configure

假设网站为 example.com

在 Nginx/OpenResty 对应的 conf 中添加

```conf
location /.well-known/acme-challenge/ {
    default_type "text/plain";
    root /var/www/html/example.com;
}
```

> 添加在 http 下的即可

在 `/var/www/html/example.com` 下面创建需要的文件夹

```shell
pushd /var/www/html/example.com
mkdir -p .well-known/acme-challenge
```

## Obain

### Webroot

`--email` 为申请者邮箱，`--webroot` 为 webroot 方式，`-w` 为站点目录，`-d` 为要加 https 的域名

```
certbot certonly --email root@example.com \
    --webroot -w /var/www/html/example.com \
    -d example.com \
    -d www.example.com
```

### Standalone

需要占用 443 端口，需要停止 Nginx 等服务

```shell
certbot certonly --email admin@example.com \
    --standalone \
    -d example.com \
    -d www.example.com
```

## Nginx Conf

生成的证书会在 `/etc/letsencrypt/live/ ` 下面

Nginx Conf 参考

```conf
server {
    listen 80;
    server_name example.com;
    server_name www.example.com;

    location /.well-known/acme-challenge/ {
        default_type "text/plain";
        root /usr/local/openresty/nginx/html/example.com;
    }

    location / {
        return 302 https://$server_name$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name example.com;
    server_name www.example.com;

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    location / {
        include proxy_params;
        proxy_pass http://127.0.0.1:3000;
    }
}
```

## Auto Renew

在 cron 中添加

```text
0 0 * */2 * certbot renew --quiet --post-hook "openresty -s reload"
```

每隔两个月，在 0 点 0 分自动续期
