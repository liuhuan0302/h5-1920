# git
    + 分布式版本控制工具

# git 工作流程
    + 工作区（写代码的终端）
    + 暂存区
    + 版本库
    `txt
        工作的流程：
            1：工作区写代码
            2：工作区代码编辑完毕，将代码提交到暂存区
                - 暂存区：类似于过滤层，保护工作区与版本库的代码， 避免错误操作。
            3：将暂存区的代码 提交到 版本库，形成版本（版本可以进行处理）
    `
    + 将版本库内容迁到远端（github\gitee）


# 下载git


# 在 git bash 终端操作 查看git版本

    + $ git --version
        -git version 2.23.0.windows.1


# git 第一次操作需要配置个人信息

    + $ git config --global user.name 名字
    + $ git config --global user.email 邮箱地址
    + $ git config --list 查看配置信息


# 一项目（工作区）被git管理 先初始化git

    + $ git init    当前项目被git管理
        - git默认情况下不会管理空文件
        - git管理文件包括所有的子文件



# 查看当前被git管理的项目文件的状态
    + $ git status  
        - 如果文件显示红色：文件在工作区没有向暂存区提交
        - 如果文件显示绿色：文件在暂存区没有向版本库提交

# 将工作区的文件提交到暂存区
    + $ git add index.html   提交某个文件
    + $ git add css/         提交某个文件夹
    + $ git add --all        提交所有
    + $ git add .            提交所有


# 将暂存区的文件拉回到工作区
    + $ git reset HEAD -- index.html    拉回某个文件
    + $ git reset HEAD -- css/          拉回某个文件夹
    + $ git reset HEAD -- .           拉回所有



# 将暂存区提交到版本库（形成一个版本控制）
    + $ git commit -m '版本日志';



# 查看版本
    + $ git log 
        `txt
            commit d5341a5d3bd79b3780feb932ebbd3e1cd0032bdb    版本id
            Author: wangshuai <wangsbruce@163.com>             提交作者
            Date:   Fri Oct 18 14:10:26 2019 +0800             时间
    
        `
    
    + $ git reflog 
        `txt
            daae0a3 HEAD@{2}: commit (initial): 第一个版本添加h1
            版本号                               版本日志
        `


# 版本回退

    + $ git reset --hard d5341a5d3bd79b3780feb932ebbd3e1cd0032bdb
    + $ git reset --hard daae0a3
    + $ git reset --hard HEAD ^    一个^代表回退一个版本


# 文件的比对

    + $ git diff 文件名称 查看当前文件 工作区和暂存区的不同
    + $ git diff 分支名   查看 工作区和版本库的不同
    + $ git diff --cached     查看暂存区和版本库的不同



# 文件的删除
    + $ git rm -f 文件名    删除暂存区和工作区的文件
    + $ git rm --cached    删除暂存区 保留 工作区



# git管理空文件 && git忽略某个文件
    + 对空文件夹管理 在文件夹里面 放置一个文件 .gitkeep;
    + 不让git管理某个文件  在git管理的目录下面放置一个文件起名 .gitignore 把不需要管理的文件的名字放在.gitignore
        - 文件名  忽略文件
        - 文件/   忽略文件夹
        - *.js    所有js



# 分支：
    + master   主分支
        - master 不进行项目开发
            1：保持最终、最干净项目代码
            2: 存在公共的库
            3: 整个项目大架构


    + 创建一个开发分支：dev分支
        - dev 分支（自己创建的分支）
            1：合并每一个分支的整体项目。（用于测试、用于项目联调）
            2：开发过程中，需要合并到项目中的代码



# 分支的操作：
    + $ git branch              查看分支 
    + $ git branch 分支名称      创建分支
    + $ git checkout 分支名称    切换分支
    + $ git checkout -b 分支名称  创建并切换
    + $ git branch -d 分支名称    删除分支
    + $ git merge 分支名称        合并分支










# 远端（github\gitee）
    `txt
        想把本地仓库 推送 到远端
            1：在github创建仓库！
            2：拿到远端仓库的地址
                a: 通过https
                b: 通过SSH密钥
            3：将本地仓库按照远端仓库地址推送
    `

#### 将本地仓库按照远端仓库地址推送
    - $ git remote add origin https://github.com/bruce-ws/h5-1920.git   添加远端仓库的地址
    - $ git push -u origin 分支名称
    - $ git remote rm origin        如果更改远端仓库地址之前 先把上一次的远端连接移除。


#### 将远端仓库拉到本地
    - $ git clone 远端地址
    - $ git clone -b 远端分支名称 远端仓库地址
    - $ git pull origin 分支名称






# 配置密钥

    + $ ssh-keygen -t rsa -C “你的邮箱地址”
    + $ cat ~/.ssh/id_rsa.pub
    
    `txt
        配置密钥流程：
            1：在终端 ssh-keygen -t rsa -C “你的邮箱地址” 
            2：在终端 cat ~/.ssh/id_rsa.pub
            3：得到 ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDFI/4Xh6vEnBKoadpohBvCP8PQdi0zGRupOfn8IrWqz+G9ZAGFJdAEDItXhQs6HIfk3ps34xnPuiSRAE8y/oCtNiUgcQ0Q8l2TGhFBZ2q1rrv15+HmBhf07obsDGNU01WxbVwf81Vv8R6Q9LI7D31j8ifFHJJOKtBEJoMMDuehHnXltzQ5/onRpE+QRBW3UuX9Fhvw/aLoX9gD5M3AuwRzSqe/gALViKtzr+Pj2tRjbwUQwmHR62Obz9kFTHQ414GmtUYpRSRg6VwAJ5dl+heijW1j6bR1gWpnyKW5Hs6PM9PAIx9UiYHfpAl+kPYguWxZHigSd7OoMzAhBU64dyb9ZFSIZqfhodQgiEIZVj3CKTYAgdLSWchTVLq6U3te+rhAnrWD2MBT7IFPZ+jQZoH1kNhx3y8OvEq6TudrP6ICkvDN6dYD4r007gaXmRT5WFqWaKGhf2XI8fJg/cAnWMImURcfUI/KgIl1LXCMUP/lT1/HbTjkTa7E0n7tIqlXJAM= wangsbruce@163.com
    
            4：把拿到的密钥配置到github
    `



# 33333333333333333333333333333333333333333333333