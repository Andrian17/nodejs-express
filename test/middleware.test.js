import express, { query } from "express";
import request from "supertest";

const app = express();

// middleware
const logging = (req, res, next) => {
    console.log(`Requested at ${new Date()}`);
    next();
}

const addPoweredByHeader = (req, res, next) => {
    res.set("X-Powered-By", "Andrian Dev");
    next();
}

const apiKeyCheck = (req, res, next) => {
    if (req.query.apiKey == 12345) {
        res.set("X-Status-Valid", "Ok");
        next();
    } else {
        console.log("Unauthorized");
        res.status(401).send("Unauthorized");
    }
}

const requestTimeMiddleware = (req, res, next) => {
    req.timeNow = Date.now();
    next();
}

app.use(apiKeyCheck);
app.use(logging);
app.use(addPoweredByHeader);
app.use(requestTimeMiddleware);

test("Request URL middleware", async () => {
    app.get("/", (req, res) => {
        const type = req.get("Accept");
        res.send(`Hello ${type}`);
    });

    const response = await request(app)
        .get("/").set("Accept", "text/plain").query({
            apiKey: 12345
        });
    expect(response.text).toBe("Hello text/plain");
});

test("Request URL middleware set header", async () => {
    app.get("/", (req, res) => {
        const type = req.get("Accept");
        res.send(`Hello ${type}`);
    });

    const response = await request(app)
        .get("/").query({
            apiKey: 12345
        });
    expect(response.get("X-Powered-By")).toBe("Andrian Dev");
    expect(response.get("X-Powered-By")).not.toBe("Cimen Dev");
});

test("Request URL middleware Check API key", async () => {
    app.get("/", (req, res) => {
        const type = req.get("Accept");
        res.send(`Hello ${type}`);
    });

    const response = await request(app)
        .get("/").query({
            apiKey: 12345
        });
    expect(response.get("X-Status-Valid")).toBe("Ok");
    expect(response.get("X-Status-Valid")).not.toBe("Yes");
});

test("Request URL middleware Time Now", async () => {
    app.get("/time", (req, res) => {
        res.send(`Hay, today is ${req.timeNow}`);
    });

    const response = await request(app)
        .get("/time").query({
            apiKey: 12345
        });
    expect(response.get("X-Status-Valid")).toBe("Ok");
    expect(response.text).toContain("Hay, today is");
});