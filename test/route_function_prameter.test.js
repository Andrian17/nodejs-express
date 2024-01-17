import express from "express";
import request from "supertest";

const app = express();



app.get('/', (req, res) => {
    res.send(`Hello ${req.query.name}`);
});

// app.get("/products", (req, res) => {
//     res.send(`Route ${req.originalUrl}`);
// });

// app.get("/products/:id", (req, res) => {
//     res.send(`Parameter ${req.params.id}`);
// });

test("Route parameter", async () => {
    app.get("/products/:id/seller/:sellerId", (req, res) => {
        res.send(`Parameter ${req.params.id}, ${req.params.sellerId}`);
    });

    const response = await request(app).get("/products/11/seller/20");
    expect(response.text).toBe("Parameter 11, 20");
    expect(response.text).not.toBe("Parameter 20, 30");
});

test("Route function and grouping", async () => {
    app.route("/products")
        .get((req, res) => {
            res.send("Get Products");
        })
        .post((req, res) => {
            res.send("Create Products");
        })
        .put((req, res) => {
            res.send("Update Products");
        })
        .delete((req, res) => {
            res.send("Delete Products");
        });

    let response = await request(app).get("/products");
    expect(response.text).toBe("Get Products");

    response = await request(app).post("/products");
    expect(response.text).toBe("Create Products");

    response = await request(app).put("/products");
    expect(response.text).toBe("Update Products");

    response = await request(app).delete("/products");
    expect(response.text).toBe("Delete Products");

});