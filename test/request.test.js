import express from "express";
import request from "supertest";

const app = express();



// app.get('/', (req, res) => {
//      res.send("Hello World");
// });

app.get('/', (req, res) => {
    res.send(`Hello ${req.query.name}`);
});

// test("Hello world", async () => {
//     const response = await request(app).get("/");
//     expect(response.text).toBe("Hello World");
// });

test("Request", async () => {
    const response = await request(app).get('/').query({
        name: "Andrian"
    });
    expect(response.text).toBe("Hello Andrian");
});