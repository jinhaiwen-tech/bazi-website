# 八字分析网站 Vercel 免费部署图文指南

---

## 前期准备

无需准备任何内容，您的网站文件已经准备好了：
```
D:\jinhaiwen\Desktop\MyAIProject\bazi-website
```

---

## 第一步：注册 Vercel 账号（2分钟）

1. 打开浏览器，访问：**https://vercel.com**

2. 点击右上角 **【Sign Up】** 按钮

3. 选择注册方式（任选其一）：
   - 📧 **Continue with Email**（使用邮箱注册）
   - 🟢 **Continue with GitHub**（如果有 GitHub）
   - 🌐 **Continue with Google**（使用 Google）

4. **如果用邮箱注册：**
   - 输入您的邮箱地址
   - 设置密码
   - 查收验证邮件并确认

---

## 第二步：进入 Dashboard（1分钟）

1. 注册/登录成功后，会自动进入 **Dashboard（仪表板）**
2. 您会看到你的用户名，例如：`username.vercel.app`

---

## 第三步：开始部署（5分钟）- 详细步骤

### 方式一：直接拖拽上传（最简单）

1. **在 Dashboard 页面**，找到并点击 **【Add New...】** 按钮
   - 通常在页面中间或顶部

2. 在弹出的菜单中选择 **【Project】**

3. 此时会出现一个新页面，让您选择项目来源

4. **关键步骤：找到导入方式**
   - 默认可能显示 "Import Git Repository"
   - **往下滑动** 或点击 **【Explore with git】** 旁边的小箭头
   - 找到 **【Other】** 或 **【Upload a Folder】** 选项

5. **点击上传按钮**
   - 点击 **【Upload a Folder】** 或 **【Browse】** 按钮
   - 浏览器会打开文件选择窗口

6. **选择您的网站文件夹**
   - 导航到：`D:\jinhaiwen\Desktop\MyAIProject\bazi-website`
   - 选中这个文件夹
   - 点击 **选择文件夹** 或 **上传**

7. **等待上传完成**
   - 显示上传进度条
   - 完成后会出现项目配置页面

---

### 方式二：如果找不到上传选项（备用方案）

**使用 Vercel CLI 工具部署（需要安装）：**

1. 打开 **PowerShell** 或 **命令提示符**

2. 安装 Vercel CLI：
```bash
npm install -g vercel
```

3. 进入您的网站目录：
```bash
cd D:\jinhaiwen\Desktop\MyAIProject\bazi-website
```

4. 运行部署命令：
```bash
vercel
```

5. 按提示操作：
   - 首次运行需要登录
   - 一路回车（使用默认设置）

---

## 第四步：配置并部署（1分钟）

1. **项目名称**
   - 默认值：`bazi-website`
   - 可以自定义：例如 `my-bazi-analysis`

2. **框架预设**
   - 自动识别：**Other（其他）**
   - 点击 **【Continue】** 继续

3. **根目录**
   - 默认：**./**
   - 点击 **【Continue】** 继续

4. **环境变量**
   - 本项目不需要
   - 直接点击 **【Deploy】** 部署按钮

5. **等待部署**
   - 看到进度条
   - 通常 10-30 秒完成

---

## 第五步：获取网站地址（完成！）

部署成功后，您会看到：

✅ **Congratulations!** 恭喜！

📌 **您的网站地址：**
```
https://your-project-name.vercel.app
```

例如：
- `https://bazi-website.vercel.app`
- `https://my-bazi-analysis.vercel.app`

---

## 部署后操作

### 查看网站
- 点击域名链接，直接访问您的在线网站

### 自定义域名（可选）
1. 在项目页面点击 **【Settings】**
2. 点击 **【Domains】**
3. 添加您自己的域名（需提前购买）

### 更新网站
- 修改 `bazi-website` 文件夹内的文件
- 在 Vercel 项目页面点击 **【Redeploy】**
- 重新上传或提交更新即可

---

## 常见问题

### Q1：上传按钮找不到怎么办？
A: 仔细查看页面，寻找 "Other"、"Upload" 或 "Browse" 选项，可能在展开菜单中。

### Q2：部署失败？
A: 检查文件夹内是否有 index.html 文件，确保结构正确。

### Q3：网站打不开？
A: Vercel 全球部署，可能需要 1-2 分钟生效，请稍后刷新。

### Q4：可以更换域名吗？
A: 可以！在 Settings → Domains 中添加自定义域名，每年免费一个。

---

## 总结

**整个部署流程：**
注册 → 登录 → 上传文件夹 → 部署 → 获得免费域名

**耗时：** 约 10-15 分钟

**费用：** 完全免费

**有效期：** 永久（只要您不删除项目）

**访问限制：** 无，任何人都可以访问

---

祝您部署成功！如有问题欢迎随时询问。
