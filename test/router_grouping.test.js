import express from "express";
import request from "supertest";

const app = express();

const loggingMiddleware = (req, res, next) => {
    console.log(`Receive ${req.originalUrl}`);
    next();
}

const router = express.Router();
router.use(loggingMiddleware);

router.get("/products", (req, res) => {
    res.send("Get Products");
});

router.post("/products", (req, res) => {
    res.send("Create Products");
});

app.use(router);

test("Router Enabled", async () => {
    let result = await request(app).get("/products");
    expect(result.text).toBe("Get Products");

    result = await request(app).post("/products");
    expect(result.text).toBe("Create Products");
});
