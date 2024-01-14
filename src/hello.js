import express from "express";
import request from "supertest";

const app = express();
app.listen(3000, () => {
    console.log("server is running on port 3000");
})


app.get('/', (req, res) => {
     res.send("Hello World");
});

// test("Hello world", async () => {
//     const response = await request(app).get("/");
//     expect(response.text).toBe("Hello World");
// })