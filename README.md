# MCP Server Demo

This project demonstrates a Model Context Protocol (MCP) server and client integration, including Gemini AI and Twitter (X) tool usage.

## Project Structure

- `server/` — Express-based MCP server with tool registration (e.g., addTwoNumbers, createPost for Twitter/X)
- `client/` — Node.js client that connects to the MCP server, uses Gemini AI, and supports tool calling

## Prerequisites

- Node.js (v18+ recommended)
- npm
- Twitter/X Developer account (for posting)
- Google Gemini API key

## Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Jain-Tirth/MCP-Server-Demo.git
   cd MCP-Server-Demo
   ```

2. **Install dependencies:**
   ```sh
   cd server && npm install
   cd ../client && npm install
   ```

3. **Environment variables:**
   - Copy `.env.example` to `.env` in both `server/` and `client/` folders (if provided), or create `.env` files manually.
   - For Twitter/X posting, set:
     ```env
     TWITTER_API_KEY=your_api_key
     TWITTER_API_SECRET=your_api_secret
     TWITTER_ACCESS_TOKEN=your_access_token
     TWITTER_ACCESS_TOKEN_SECRET=your_access_token_secret
     ```
   - For Gemini API, set:
     ```env
     GEMINI_API_KEY=your_gemini_api_key
     ```

4. **Start the MCP server:**
   ```sh
   cd server
   node index.js
   # or use nodemon for auto-reload
   # npx nodemon index.js
   ```

5. **Start the client:**
   ```sh
   cd ../client
   node index.js
   ```

## Features

- **MCP Server**
  - Registers tools (e.g., addTwoNumbers, createPost)
  - Handles tool calls from clients
- **Client**
  - Connects to MCP server via SSE
  - Uses Gemini AI for chat and tool invocation
  - Supports function calling (e.g., posting to Twitter/X)

## Notes
- Ensure your Twitter/X app permissions are set to "Read and Write" and use regenerated access tokens after changing permissions.
- Sensitive files like `.env` and credential JSONs are gitignored for security.


