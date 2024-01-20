import express from "express";
import request from "supertest";

const app = express();



test("Request Static File", async () => {
    // Declare middleware
    // app.use(express.static("./static"));
    app.use(express.static(__dirname + "/static"));
    app.get("/", (req, res) => {
        res.send("Hello Response");
    });
    let response = await request(app).get("/");
    expect(response.text).toBe("Hello Response")
    response = await request(app).get("/contoh.txt");
    expect(response.text).toBe("Hello Bro");
});