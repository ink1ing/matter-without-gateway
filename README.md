# 🚰 HomeKit Anywhere - IT 工作室饮水机控制器

这是一款基于 **Matter 协议** 的开源智能设备控制方案。它允许你直接通过 Mac/服务器控制 Matter 插座，完全**脱离** Home Assistant、小米米家或 Apple Home 中枢。

通过本方案，你可以获得一个极速的、公网可访问的、且完全自定义的 iOS 风格控制面板。

![Screenshot](https://img.shields.io/badge/UI-iOS_Style-green) ![Protocol](https://img.shields.io/badge/Protocol-Matter-blue) ![Tunnel](https://img.shields.io/badge/Tunnel-Cloudflare-orange)

## ✨ 核心特性

- **🚀 脱离中枢**：不需要 Apple HomePod、小米多模网关或 Home Assistant，Mac 即可作为 Matter 控制器。
- **🌍 公网直连**：集成 Cloudflare Tunnel，通过自定义域名（如 `water.yourdomain.com`）随时随地远程控制。
- **📱 iOS 风格 UI**：极简纯黑 IT 工作室美学，采用高仿真 iOS 拨动开关手感。
- **⏰ 离线自动化**：支持设置定时开启和关闭时间，由本地服务器守护执行。
- **🛡️ 稳定运行**：基于 PM2 进程管理，支持崩溃自动重启与开机自启。

## 🛠️ 技术栈

- **Matter.js**: 核心协议驱动，用于同插座进行局域网通信。
- **Node.js**: 后端逻辑与 API 服务。
- **Cloudflare Tunnel**: 内网穿透与外网加密映射。
- **PM2**: 生产级进程守护。

## 📦 快速开始

### 1. 环境准备
确保你的 Mac 已安装 Node.js (v18+) 和 Homebrew。

```bash
# 全局安装守护工具
npm install -g pm2
```

### 2. 获取代码
```bash
git clone https://github.com/[your-username]/homekit-anywhere.git
cd homekit-anywhere
npm install
```

### 3. 配置与配网
1. 获取插座的 11 位 Matter 配对码。
2. 运行配网脚本：
   ```bash
   node pair.js
   ```

### 4. 启动系统
双击桌面上的 `启动饮水机系统.command` 或运行：
```bash
pm2 start server.js --name "water-server"
pm2 start "cloudflared tunnel run" --name "water-tunnel"
```

## 🎨 UI 预览
- **开启**：🚰 (对应自定义状态)
- **关闭**：💤 (对应待机状态)
- **主题**：True Black 极简主义

## 📄 开源协议
MIT License

---
*Powered by Matter.js & Cloudflare.*
