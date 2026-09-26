let express = require("express");
let mysql = require("mysql2");
let cors = require("cors");
require("dotenv").config();

let app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));


// ================= DATABASE CONNECTION =================

let db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect(function(error) {

    if (error) {
        console.log("MySQL Connection Failed");
        console.log(error);
    } else {
        console.log("MySQL Connected Successfully");
    }

});


// ================= GET ALL PRODUCTS =================

app.get("/api/products", function(req, res) {

    let sql = "SELECT * FROM products";

    db.query(sql, function(error, result) {

        if (error) {

            console.log(error);

            res.status(500).json({
                message: "Error getting products"
            });

        } else {

            res.json(result);

        }

    });

});


// ================= PLACE ORDER =================

app.post("/api/orders", function(req, res) {

    let data = req.body;

    let sql = `
        INSERT INTO orders
        (
            customer_name,
            email,
            mobile,
            address,
            city,
            state,
            pincode,
            payment_method,
            total_amount
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    let values = [
        data.customer_name,
        data.email,
        data.mobile,
        data.address,
        data.city,
        data.state,
        data.pincode,
        data.payment_method,
        data.total_amount
    ];


    // Start Transaction
    db.beginTransaction(function(error) {

        if (error) {

            console.log(error);

            return res.status(500).json({
                message: "Transaction failed"
            });

        }


        // Insert Order
        db.query(sql, values, function(error, result) {

            if (error) {

                console.log(error);

                return db.rollback(function() {

                    res.status(500).json({
                        message: "Order failed"
                    });

                });

            }


            // Get Order ID
            let orderId = result.insertId;


            // ================= ORDER ITEMS =================

            let items = data.items || [];

            if (items.length === 0) {

                return db.commit(function(error) {

                    if (error) {

                        console.log(error);

                        return db.rollback(function() {

                            res.status(500).json({
                                message: "Order failed"
                            });

                        });

                    }

                    res.json({
                        message: "Order placed successfully",
                        order_id: orderId
                    });

                });

            }


            let itemValues = items.map(function(item) {

                return [
                    orderId,
                    item.product_id,
                    item.product_name,
                    item.quantity,
                    item.price
                ];

            });


            let itemSql = `
                INSERT INTO order_items
                (
                    order_id,
                    product_id,
                    product_name,
                    quantity,
                    price
                )
                VALUES ?
            `;


            db.query(itemSql, [itemValues], function(error) {

                if (error) {

                    console.log(error);

                    return db.rollback(function() {

                        res.status(500).json({
                            message: "Order items failed"
                        });

                    });

                }


                // ================= COMMIT =================

                db.commit(function(error) {

                    if (error) {

                        console.log(error);

                        return db.rollback(function() {

                            res.status(500).json({
                                message: "Order failed"
                            });

                        });

                    }


                    res.json({

                        message: "Order placed successfully",

                        order_id: orderId

                    });

                });

            });

        });

    });

});


// ================= HOME PAGE =================

app.get("/", function(req, res) {

    res.sendFile(__dirname + "/index.html");

});


// ================= START SERVER =================

app.listen(3000, function() {

    console.log("Server running on http://localhost:3000");

});