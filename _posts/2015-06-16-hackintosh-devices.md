---
layout: post
title: 黑苹果硬件配置单
date: 2015-06-16
---

* TOC
{:toc}
开发Android可以用任何主流OS (Windows, Linux 或者 OSX (发音：OS ten))，这些OS上都有相应的 IDE 和 Compilation Env.，但是做 iOS 开发“只能”在 Apple 独有的 OSX 上做，由于 OSX 以及 Mac 电脑的的封闭性和独特性，并不像装 Windows 那样随意买几坨硬件攒台PC就能跑得起来，因为这些硬件在 OSX 上大多都没有相应的驱动（硬件厂家没为 OSX 开发驱动）。

但是，从[OSX 10.6 Snow Leopard](http://www.cocoachina.com/apple/20130119/5572.html)开始，OSX的所有代码已经完全撇除对 IBM Power 系列 CPU 的支持，转向了 Intel，这就为黑苹果（Hackintosh）的诞生提供了可能性。

要攒黑苹果，选购硬件的原则只有一个：**`尽量与市面上已发售的Mac机器配备的硬件（芯片）型号相同（品牌不一定相同，比如下面列出的昂达显卡）`。**

## 1. 组装黑苹果最关键的几大件是：
1. CPU：必须 Intel CPU，农企的 U 会让你很受伤
2. 主板：技嘉 Intel 芯片组的主板的安装成功率最高
3. 显卡：基于1.的选择，如果 CPU 集成了显卡，通常都可以直接完美驱动；或者干脆买N记的显卡。
4. 无线网卡/蓝牙模块： 参照下表

### 1.1. 附上我的配置：

>* **Intel 英特尔 Core酷睿 i3-3220 盒装CPU 双核四线程/3.3GHz/3MB三级缓存/LGA1155** 该CPU集成的HD2500显卡无法直驱，建议选择其他型号，这便省下了显卡的钱，专心学习，少玩游戏 XD
>* **GIGABYTE 技嘉 GA-B75N 主板 Intel B75/LGA1155** 
>* **昂达(ONDA)GTX650典范1GD5 1058/5000MHz 1G/128bit DDR5显卡**
>* **博通 BCM94352Z 无线网卡（带蓝牙4.0，对蓝牙设备很重要！！！）** ，我的主板是坑爹的mini PCI-E口，所以要搭配[NGFF转mini pci-e转接卡](https://item.taobao.com/item.htm?id=43414511551&_u=lc741n7a38)和[ipex4代转ipex1代底座转接线](https://item.taobao.com/item.htm?id=528150772581&_u=lc741na3f4)才能对接得上。`并且一定记得买一对`[Wifunni天线](http://item.taobao.com/item.htm?id=15968550189)，不然接受不到信号。
>* **鼠标键盘** 如无必要，尽可能用有线鼠标键盘，直接插机箱后面的USB口）
>* **SilverStone 银欣 SST-ST45SF 台式机电源**
>* **海盗船(CORSAIR)追击者 DDR3 1600 8GB * 2 台式机内存**
>* **希捷（Seagate）1TB ST1000DM003 7200转64M SATA 6Gb/秒** 分区后作Windows安装盘和主要数据储存盘用
>* **闪迪(SanDisk) 至尊高速版-II代 240G 固态硬盘** `用来装OSX，最多买128G的就够，因为SSD是耗材迟早要报销的，一旦买太大了到时坏了心疼`

## 2. 开始安装 OS X 和 Windows 双系统
具体的安装步骤我就不做搬运工了，请跟着pcbeta的[这个教程](http://bbs.pcbeta.com/viewthread-1542110-1-1.html)做，期间会遇到一些问题，我尝试给出以下帮助。

1. 遇到问题就[爬论坛](http://bbs.pcbeta.com/viewthread-1494831-1-1.html)找答案，99%的问题在pcbeta都可以找到答案，当然你有梯子更好。
2. OS X Yosemite 10.10.3 镜像解压后里面那个5G多的.dmg就是真身，TransMac 要用的就是这个。
3. 坊间公认 Clover 引导比变色龙引导要稳定，也最接近真正的Mac。
4. Mac 下怎么显示隐藏的 EFI 分区，并图形化设置 Clover 参数呢？用 Clover Configurator。

暂时写这么多吧，有问题请留言，我看看有没有遇到过能帮你的忙，不过实际上找pcbeta比找我更快。DIY黑苹果只适合不折腾会死星人，过程中充满了一次又一次巨大的挫败感。但成功后，强大的配置和可扩展性又是正品Mac所无法比拟的。

当然，壕要么直接 Mac Pro，要么[淘宝一个黑苹果](http://s.taobao.com/search?q=%E9%BB%91%E8%8B%B9%E6%9E%9C&commend=all&ssid=s5-e&search_type=mall&sourceId=tb.index&spm=a1z02.1.6856637.d4910789)也未尝不可。

声明：文中提到的所有软件版权归软件所有者所有，本文仅供学习试验参考，请在24小时内删除未经授权之软件，建议购买经授权的正版软件。
