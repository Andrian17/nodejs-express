import express from "express";
import request from "supertest";
import fileUpload from "express-fileupload";

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(fileUpload());
app.post("/form", async (req, res) => {
    const name = req.body.name;
    const txtFile = req.files.article;
    await txtFile.mv(__dirname + "/upload/" + txtFile.name);
    res.send(`Hello ${name}, you upload ${txtFile.name}`);
});

test("Request Body Form", async () => {

    const response = await request(app)
        .post("/form")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .field("name", "Andrian")
        .attach('article', __dirname + "/static/contoh.txt");
    expect(response.text).toBe(`Hello Andrian, you upload contoh.txt`);
});



