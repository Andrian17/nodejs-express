import express from "express";
import request from "supertest";

const app = express();

test("Request Body JSON", async () => {
    app.use(express.json());
    app.post("/json", (req, res) => {
        const name = req.body.name;
        res.json({
            hello: `Hello ${name}`
        });
    });

    const response = await request(app)
        .post("/json")
        .set("Content-Type", "application/json")
        .send({
            name: "Andrian"
        });
        expect(response.body).toEqual({
            hello: "Hello Andrian"
        });
});

test("Request Body Form", async () => {
    app.use(express.urlencoded({extended: false}));
    app.post("/form", (req, res) => {
        const name = req.body.name;
        res.json({
            hello: `Hello ${name}`
        });
    });

    const response = await request(app)
        .post("/form")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send("name=Andrian");
    expect(response.body).toEqual({
        hello: "Hello Andrian"
    });
});



