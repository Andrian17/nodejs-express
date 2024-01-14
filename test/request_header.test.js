import express, { query } from "express";
import request from "supertest";

const app = express();

test("Request URL", async () => {
    const app = express();
    app.get("/", (req, res) => {
        const type = req.get("Accept");
        res.send(`Hello ${type}`);
    });

    const response = await request(app)
        .get("/").set("Accept", "text/plain");
    expect(response.text).toBe("Hello text/plain");
});

test("Response URL", async () => {
    const app = express();
    app.get("/", (req, res) => {
        if (req.query.name) {
            res.status(200).send(`Hello ${req.query.name}`);
        } else {
            res.status(400).send("Bad Request");
        }
    });

    let response = await request(app).get("/")
        .query({
            name: "Andrian"
        })
    expect(response.text).toBe("Hello Andrian");
    expect(response.status).toBe(200);

    response = await request(app).get("/");
    expect(response.text).toBe("Bad Request");
    expect(response.status).toBe(400);
});

test("Response Header", async () => {
    const app = express();
    app.get("/", (req, res) => {
        res.set({
            "X-Powered-By": "Andrian Dev",
            "Author": "Andrian"
        }).end();
    });

    let response = await request(app).get("/");
    expect(response.get("X-Powered-By")).toBe("Andrian Dev");
    expect(response.get("Author")).toBe("Andrian");
});

test("Response Body", async () => {
    const app = express();
    app.get("/", (req, res) => {
        res.set("Content-Type", "text/html");
        res.send("<html><body>Hello World</body></html>");
    });

    let response = await request(app).get("/");
    expect(response.get("Content-Type")).toContain("text/html");
    expect(response.text).toContain("Hello World");
});

test("Response Redirect ", async () => {
    const app = express();
    app.get("/", (req, res) => {
        res.status(302).redirect("https://andrian17.github.io")
    });

    let response = await request(app).get("/");
    expect(response.status).toBe(302);
    expect(response.get("location")).toBe("https://andrian17.github.io");
    expect(response.get("location")).not.toBe("https://andrian17.gitlab.com");
});