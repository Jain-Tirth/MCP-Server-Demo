import express from "express";
import { randomUUID } from "node:crypto";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { createPost } from "../server/mcp.tool.js"

const server = new McpServer({
    name: "exmaple-server",
    version: "1.0.0"
})

server.tool("addTwoNumbers", "Add two numbers",
    {
        a: z.number(),
        b: z.number()
    },
    async (args) => {
        const { a, b } = args;
        return {
            content: [{
                type: "text",
                text: `Sum of the ${a} and ${b} is ${a + b}`
            }]
        }
    })
server.tool("createPost", "It post your content on the twitter known as X", { status: z.string().describe("Posts the provided status text to Twitter (X). Requires a status string") }, async (args) => {
    const { status } = args;
    return createPost(status);
})
const app = express();
const transports = {};

app.get("/sse", async (req, res) => {
    const transport = new SSEServerTransport('/messages', res);
    transports[transport.sessionId] = transport;
    res.on("close", () => {
        delete transports[transport.sessionId];
    });
    await server.connect(transport);
});

app.post("/messages", async (req, res) => {
    const sessionId = req.query.sessionId;
    const transport = transports[sessionId];
    if (transport) {
        await transport.handlePostMessage(req, res);
    } else {
        res.status(400).send('No transport found for sessionId');
    }
});


app.listen(3000, () => {
    console.log("App is running on port 3000!!")
});
