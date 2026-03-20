import { serve } from "@hono/node-server";
import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import app from "./app";
import { config } from "./config/envs";
import { WebSocketManager } from "./ws/manager";

// start hono server
const server = serve({
    fetch: app.fetch,
    port: config.port,
}, (info) => {
    console.log(`🚀 Server is running on http://localhost:${info.port}`);
});

const wss = new WebSocketServer({ server: server as any });

wss.on('connection', (ws, req) => {
    // Note: In production, we'd parse the URL or headers for token/projectId
    // For now, let's assume a message-based join or simple token in URL
    const url = new URL(req.url || '', `http://${req.headers.host}`);
    const token = url.searchParams.get('token');
    const projectIdStr = url.searchParams.get('projectId');

    if (!token || !projectIdStr) {
        ws.close(4001, 'Missing token or projectId');
        return;
    }

    try {
        const decoded = jwt.verify(token, config.auth.jwtSecret) as { userId: number };
        const projectId = parseInt(projectIdStr, 10);
        
        console.log(`🔌 New WebSocket connection for project ${projectId}`);
        WebSocketManager.getInstance().addClient(projectId, ws);
    } catch (e) {
        ws.close(4002, 'Invalid token');
    }

    ws.on('close', () => {
        console.log('🔌 WebSocket disconnected');
    });
});