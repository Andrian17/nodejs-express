import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser("RAHASIA"));
app.use(express.json());

app.get("/", (req, res) => {
    const name = req.signedCookies["login"];
    res.send(`Hello ${name}`);
});

app.post("/login", (req, res) => {
    const name = req.body.name
    res.cookie("login", name, {
        path: "/",
        signed: true
    });
    res.send(`Hello ${name}`);
});



let storeCookie = null;

const setCookie = (cookie) => {
    storeCookie = cookie;
}

const getCookie = () => {
    return storeCookie;
}


test("Test Cookie Write Signed", async () => {
    const response = await request(app)
    .post("/login").send({
        name: "Andrian"
    });
    setCookie(response.get("Set-Cookie").toString());
    console.log(response.get("Set-Cookie").toString());
    expect(response.get("Set-Cookie").toString()).toContain("Andrian");
    expect(response.text).toBe("Hello Andrian");
});


test("Test Cookie Read Signed", async () => {
    const response = await request(app)
        .get("/")
        .set("Cookie", "login=s%3AAndrian.UWM0tDYo8BtYulWSOg5gbmL90eZ7WWw5Pp7tINPre18; Path=/");
        console.log(getCookie());
    expect(response.text).toBe("Hello Andrian");
});
