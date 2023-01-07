# 项目初始化

## 1.1、项目创建

1、在 `github` 创建一个没有 `README.md` 的项目

2、在本地创建一个新的项目推送到远程仓库

```sh
# 1. 检查与 github 的联通性
ssh -T git@github.com

# 2. 项目初始化
git init

# 3.
git add .

# 4. 
git commit -m "this is the first push"

# 5. 
git branch -M main

# 6. 
git remote add origin git@github.com:dlpmmk/next-app-demo.git


git push -u origin main
```

