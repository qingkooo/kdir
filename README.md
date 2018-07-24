# kdir

#### 项目介绍

小型web静态资源服务


#### 安装方法

```cmd
npm i -g kdir
```

#### 使用说明

```cmd
# 指定端口号，默认8000
kdir -p 8000

# 指定根目录，默认是当前进程启动地址（即process.cwd())
kdir -r /user/desktop/test

# 指定域名，默认127.0.0.1
kdir -h hostname

# 查看版本号
kdir -v

# 查看帮助
kdir --help
```
