import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(express.json());


test("Test Cookie Read", async () => {
    app.get("/", (req, res) => {
        const name = req.cookies["name"];
        const author = req.cookies["author"];
        res.json({
            name,
            author
        });
    });

    const response = await request(app)
    .get("/")
    .set("Cookie", "name=Andrian;author=Andrian Dev")
    .set("Content-Type", "application/json");
    expect(response.body).toEqual({
        name: "Andrian",
        author: "Andrian Dev"
    });
});


test("Test Cookie Write", async () => {
    app.get("/", (req, res) => {
        const name = req.body.name;
        res.cookie("login", name, {
            path: "/"
        });
        res.send(`Hello ${name}`);
    });

    const response = await request(app)
        .get("/").send({
            name: "Andrian"
        });
    expect(response.get("Set-Cookie").toString())
        .toContain("Andrian");
});