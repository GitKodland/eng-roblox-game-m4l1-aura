const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const contentTypes = {
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png"
};

http.createServer((request, response) => {
    const requested = request.url === "/" ? "index.html" : decodeURIComponent(request.url.split("?")[0]).replace(/^\/+/, "");
    const filePath = path.resolve(root, requested);

    if (!filePath.startsWith(root)) {
        response.writeHead(403);
        response.end("Forbidden");
        return;
    }

    fs.readFile(filePath, (error, contents) => {
        if (error) {
            response.writeHead(404);
            response.end("Not found");
            return;
        }
        response.setHeader("Content-Type", contentTypes[path.extname(filePath)] || "application/octet-stream");
        response.end(contents);
    });
}).listen(8000, "127.0.0.1", () => {
    console.log("AURA//LAB: http://127.0.0.1:8000");
});
