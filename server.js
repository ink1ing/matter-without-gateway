import express from "express";
import fs from "fs";
import { Environment, StorageService, Logger } from "@matter/main";
import { CommissioningController } from "@project-chip/matter.js";
import { OnOffClient } from "@matter/main/behaviors/on-off";
import "@matter/nodejs-ble";

const app = express();
const port = 3000;
const SCHEDULE_FILE = "./schedule.json";

app.use(express.static("public"));
app.use(express.json());

const environment = Environment.default;
environment.vars.set("storage.path", ".matter-storage");

const commissioningController = new CommissioningController({
    environment: { environment, id: "controller" },
    autoConnect: true,
    adminFabricLabel: "Anywhere Controller",
});

let targetNode = null;
let schedule = { onTime: "", offTime: "", enabled: false };

// 加载定时设置
if (fs.existsSync(SCHEDULE_FILE)) {
    schedule = JSON.parse(fs.readFileSync(SCHEDULE_FILE));
}

async function initMatter() {
    console.log("📂 加载 Matter 存储...");
    await commissioningController.start();
    const nodes = commissioningController.getCommissionedNodes();
    if (nodes.length > 0) {
        targetNode = await commissioningController.getNode(nodes[0]);
        console.log("🔌 设备已就绪");
    }
}

// 定时任务检查引擎 (每分钟检查一次)
setInterval(async () => {
    if (!schedule.enabled || !targetNode) return;

    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    try {
        const endpoint = targetNode.parts.get(1);
        const onOffCommands = endpoint.commandsOf(OnOffClient);

        if (currentTime === schedule.onTime) {
            console.log(`⏰ 定时：到达开启时间 ${currentTime}`);
            await onOffCommands.on();
        } else if (currentTime === schedule.offTime) {
            console.log(`⏰ 定时：到达关闭时间 ${currentTime}`);
            await onOffCommands.off();
        }
    } catch (e) {
        console.error("定时执行出错:", e.message);
    }
}, 60000);

// API 接口
app.get("/api/status", async (req, res) => {
    if (!targetNode) return res.status(503).json({ error: "Node not ready" });
    try {
        const endpoint = targetNode.parts.get(1);
        const onOffState = endpoint.stateOf(OnOffClient);
        res.json({ on: onOffState.onOff, schedule });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.post("/api/toggle", async (req, res) => {
    if (!targetNode) return res.status(503).json({ error: "Node not ready" });
    try {
        const endpoint = targetNode.parts.get(1);
        const onOffCommands = endpoint.commandsOf(OnOffClient);
        await onOffCommands.toggle();
        const onOffState = endpoint.stateOf(OnOffClient);
        res.json({ success: true, on: onOffState.onOff });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// 设置计划接口
app.post("/api/schedule", (req, res) => {
    const { onTime, offTime, enabled } = req.body;
    schedule = { onTime, offTime, enabled };
    fs.writeFileSync(SCHEDULE_FILE, JSON.stringify(schedule));
    console.log("📅 计划任务已更新:", schedule);
    res.json({ success: true });
});

initMatter().then(() => {
    app.listen(port, () => console.log(`🚀 饮水机后台已启动: http://localhost:${port}`));
});
