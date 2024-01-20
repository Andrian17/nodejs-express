import express from "express";
import request from "supertest";

const app = express();
app.get("/", (req, res) => {
    res.send("Ok");
});
app.use((req, res, next) => {
    res.status(404).send("404 Not Found!");
});

test("Test Success", async () => {
    const response = await request(app).get("/");
    expect(response.text).toBe("Ok");
});

test("Test Not Found", async () => {
    const response = await request(app).get("/not-found");
    expect(response.status).toBe(404);
    expect(response.text).toBe("404 Not Found!");
});

