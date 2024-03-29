---
layout: post
title: 用国内的源（Source）替换官方源，提高下载速度（包括Homebrew, npm 和 Composer 等）
date: 2016-12-13
---
* TOC
{:toc}
引自我在知乎上的回答[Homebrew有比较快的源（mirror）吗？ - 知乎](https://www.zhihu.com/question/31360766/answer/132082951)

## 1. Homebrew

#### A. 中科大的源（推荐）

(1). [替换 homebrew-core源](https://lug.ustc.edu.cn/wiki/mirrors/help/homebrew-core.git)

运行：
```bash
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin git://mirrors.ustc.edu.cn/homebrew-core.git
```


(2). [替换 Homebrew Bottles源](https://lug.ustc.edu.cn/wiki/mirrors/help/homebrew-bottles)

```bash
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles' >> ~/.bash_profile
source ~/.bash_profile

brew update
```



#### B. 清华的源

(1). [替换 formula 索引的镜像（即 brew update 时所更新内容）](https://mirrors.tuna.tsinghua.edu.cn/help/homebrew/)

运行：
```bash
cd "$(brew --repo)"
git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git

cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git

brew update
```

(2). [替换 Homebrew 二进制预编译包的镜像](https://mirrors.tuna.tsinghua.edu.cn/help/homebrew-bottles/)

运行：
```bash
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles' >> ~/.bash_profile
source ~/.bash_profile
```

**PS: 如果运行brew update的时候报了这段error，请使用中科大的源**

运行：
```bash
brew update
error: Packfile index for .git/objects/pack/pack-b2cf6673962afb44029dea036d48174efb361bc9.pack SHA1 mismatch
error: Unable to find a4d50c465d7398710f04022fafea080c7da83347 under https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git
Cannot obtain needed object a4d50c465d7398710f04022fafea080c7da83347
error: fetch failed.
```

-------------------------------------

## 2. Composer
来自[Packagist / Composer 中国全量镜像](http://pkg.phpcomposer.com/)
也有两种方式：

#### A. 修改 composer 的全局配置文件（推荐方式）

打开命令行窗口（windows用户）或控制台（Linux、Mac 用户）并执行如下命令：

```bash
composer config -g repo.packagist composer https://packagist.phpcomposer.com
```

#### B. 修改当前项目的 composer.json 配置文件：

打开命令行窗口（windows用户）或控制台（Linux、Mac 用户），进入你的项目的根目录（也就是 composer.json 文件所在目录），执行如下命令：

```bash
composer config repo.packagist composer https://packagist.phpcomposer.com
```

上述命令将会在当前项目中的 composer.json 文件的末尾自动添加镜像的配置信息（你也可以自己手工添加）：

```json
"repositories": {
    "packagist": {
        "type": "composer",
        "url": "https://packagist.phpcomposer.com"
    }
}
```
----------------------------------------

## 3. npm
有永久和临时两种形式：

#### A. 通过 config 命令作全局永久替换

运行：
```bash
npm config set registry https://registry.npm.taobao.org 
npm info underscore 
```

如果上面配置正确，这个 npm info 命令会有字符串显示，如:
```bash
...
dist:
 { shasum: '4f3fb53b106e6097fcf9cb4109f2a5e9bdfa5022',
   size: 34172,
   noattachment: false,
   tarball: 'http://registry.npm.taobao.org/underscore/download/underscore-1.8.3.tgz' },
directories: {},
publish_time: 1427988774520 }
```

#### B. 通过命令行临时替换

运行：
```bash
npm --registry https://registry.npm.taobao.org info underscore 
```

### C. 另一种临时方法
运行：
```bash
SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/ npm install -g node-sass
```
----------------------------------------

## 4. apm (Atom editor)

[Atom 官方说apm是基于npm的](https://github.com/atom/apm#relation-to-npm))，所以可以使用上面淘宝的npm源。

编辑或新建文件`~/.atom/.apmrc`，加上这段：

```bash
registry=https://registry.npm.taobao.org/
strict-ssl=false
```

> 可选项，给apm加上代理：`apm config set proxy http://127.0.0.1:1080`


另外，Windows版的Atom会使用自带的node.exe，而忽略你自行安装的是哪个版本，为了统一node版本，可以将Atom自带的node和npm都替换掉：

用Administrator模式启动CMD，然后：
```bash
d:
cd "D:\Program Files\ATOM\resources\app\apm\bin"
node.exe -v
rename node.exe node.exe.original
mklink node.exe "D:\Program Files\node\node.exe"
node.exe -v
rename npm.cmd npm.cmd.original
mklink npm.cmd "D:\Program Files\node\npm.cmd"
cd ..
npm -v
```

安装个插件试试，看看有没有快些：

```bash
apm i sync-settings
```

另外，如果你用的是Windows Git Bash，装好Atom后运行apm，python等命令是会提示`bash: apm: command not found`的，解决办法很简单，在Git Bash里运行：

```bash
cd ~
echo "alias apm='winpty apm.cmd'" >> .bashrc
echo "alias python='winpty python.exe'" >> .bashrc
source .bashrc
```




