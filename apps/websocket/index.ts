import { prisma } from "db/client";

Bun.serve({
    port: 8081,
    fetch(req, server) {
        // upgrade the request to a WebSocket
        if (server.upgrade(req)){
            return;
        }
        return new Response("Upgrade failed", { status: 500} );
    },
    websocket: {
        async message(ws, message) {
            await prisma.user.create({
                data: {
                    email: Math.random().toString(),
                    password: Math.random().toString()
                }
            })
            ws.send(message);
        }
    }
})