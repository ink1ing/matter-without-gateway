# 🚀 Matter Without Gateway (Matter-Anywhere)

这是一个让 Matter 智能设备彻底摆脱网关（Hub/Gateway）束缚的开源方案。

无需 Apple HomePod、Home Assistant 或小米多模网关，只需一台联网的电脑（如 Mac、树莓派或 NAS），即可实现对 **任何 Matter 标准设备** 的直接配网、本地控制与公网映射。

![Status](https://img.shields.io/badge/Status-Open_Source-brightgreen) ![License](https://img.shields.io/badge/License-MIT-blue) ![Technology](https://img.shields.io/badge/Tech-Matter.js_|_Cloudflare-orange)

## 💡 为什么需要这个项目？

通常控制 Matter 设备需要一个硬件中枢（Matter Controller），而本项目通过软件模拟实现了这一功能：
1. **零成本起步**：利用你现有的电脑（Mac/Linux）作为控制器。
2. **公网自由**：内置 Cloudflare Tunnel，打破局域网限制，在全球任何地方通过自定义域名控制设备。
3. **完全自定义**：提供极简的 Web UI，你可以根据设备类型（开关、灯、饮水机、排插）自由定制控制界面。
4. **隐私可控**：数据仅在你的本地服务器与设备间流动，不经过厂商云端。

## ✨ 核心功能

- **🔗 直接配网**：使用设备 11 位配对码，直接与电脑完成 PASE 握手。
- **🌍 远程控制**：集成 Cloudflare 命名隧道，支持自定义域名（如 `switch.yourname.tech`）。
- **📅 自动化面板**：支持离线定时任务，到点自动执行动作。
- **🛡️ 稳定守护**：通过 PM2 进行进程管理，支持崩溃自启和开机自启。
- **📱 极简 UI**：提供一套仿 iOS 质感的通用 Web 控制面板。

## 🛠️ 技术要求

- Node.js (v18+)
- 对局域网具有 MDNS 发现能力的设备（Mac, Raspberry Pi, Linux Server 等）
- Cloudflare 账号 (用于公网映射)

## 📦 快速部署

1. **克隆项目**
   ```bash
   git clone https://github.com/ink1ing/matter-without-gateway.git
   cd matter-without-gateway
   npm install
   ```

2. **配网 (Commissioning)**
   打开 `pair.js` 修改配对码，运行：
   ```bash
   node pair.js
   ```

3. **一键启动 (macOS)**
   双击桌面的 `启动饮水机系统.command`（或根据 README 自定义名称）。

## 🤝 贡献与支持
欢迎提交 Issue 或 Pull Request 来增加对更多 Matter Cluster（如温控、传感器）的支持！

---
*Powered by Matter.js & Cloudflare Tunnel.*
