---
layout: page
title: 'imx7d GPIO'
slug: imx7d-gpio
date: 2021-04-04
---

PINOUT 的参考为 [I/O Pinouts](https://developer.android.com/things/hardware/imx7d)

GPIO2_IO00 对应的是 sysfs 中的 `(2-1)*32 + 0`，或者 chardev 的 `/dev/gpiochip1` 的 `line=0`

```shell
echo 32 > /sys/class/gpio/export
echo out > /sys/class/gpio/gpio32/direction
echo 1 > /sys/class/gpio/gpio32/value
```

```python
from periphery import GPIO
import time

r = GPIO("/dev/gpiochip1", 0, "out")
g = GPIO("/dev/gpiochip1", 5, "out")
b = GPIO("/dev/gpiochip1", 7, "out")

while True:
    for i in range(7):
        r.write(i%2==0)
        g.write((i>>1)%2==0)
        b.write((i>>2)%2==0)
        time.sleep(0.2)

r.close()
g.close()
b.close()
```
