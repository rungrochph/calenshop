const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const app = express();
const port = process.env.PORT || 3000;
var jwt = require("jsonwebtoken");
const secret = "Doc_app";
// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON in the request body
app.use(bodyParser.json());

// Your PostgreSQL database connection configuration
const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "calenshop",
  password: "password",
  port: 5433, // Change this if your PostgreSQL instance is running on a different port
});

// Example route to fetch data from the database
app.get("/getData", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM users");
    const results = { results: result ? result.rows : null };
    res.json(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get Data calendars list
app.get("/getData/calendars", async (req, res) => {
  try {
    const client = await pool.connect();
    const result =
      await client.query(`SELECT calendar.*, calendar_type.name as name
    FROM calendar
    JOIN calendar_type ON calendar.type_id = calendar_type.id order by calendar.id;
    `);
    const calendars = result.rows;
    res.json({ calendars });
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get Data calendars list
app.get("/getData/calendars/type", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(`SELECT * from calendar_type`);
    const calendarsType = result.rows;
    res.json({ calendarsType });
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route for fetching calendars based on type
app.get("/getData/calendars/type/:type_id", async (req, res) => {
  const type_id = req.params.type_id;

  try {
    const client = await pool.connect();
    const result = await client.query(
      `
      SELECT calendar.*, calendar_type.name as name
      FROM calendar
      JOIN calendar_type ON calendar.type_id = calendar_type.id
      WHERE calendar.type_id = $1;
    `,
      [type_id]
    );

    const calendars = result.rows;
    res.json({ calendars });
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get Data calendars list
app.get("/getOrders", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(`SELECT
    o.id AS order_id,
    o.name AS order_name,
    o.price AS order_price,
    o.created_at AS order_createdat,
    os.name AS order_status,
    u.username AS username
    FROM
    "Order" o
    JOIN
    order_status os ON o.order_status = os.id
    JOIN
    users u ON o.user_id = u.user_id`);
    const orderlist = result.rows;
    res.json({ orderlist });
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// update Status
app.post("/updateStatus/Id", jsonParser, async (req, res) => {
  const id = req.body.id;
  const order_status = req.body.order_status;

  try {
    const client = await pool.connect();
    const result = await client.query(
      `
      UPDATE "Order" 
      SET order_status = $1
      WHERE id = $2;
    `,
      [order_status, id]
    );
    client.release();
    res.json({ status: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getData/calendars/:id", jsonParser, async (req, res) => {
  const id = req.params.id; // Extract the id parameter from the URL

  try {
    const client = await pool.connect();
    const result = await client.query(
      `
      SELECT calendar.*, calendar_type.name as name
      FROM calendar
      JOIN calendar_type ON calendar.type_id = calendar_type.id
      WHERE calendar.id = $1
      ORDER BY calendar.id;
    `,
      [id]
    );

    const calendars = result.rows;
    res.json({ calendars }); // Send the fetched data as a JSON response
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// update Product
app.post("/updateProduct/Id", jsonParser, async (req, res) => {
  // const id = req.params.id;
  const { title, type_id, price, description, quantity, image, id } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query(
      `
      UPDATE "calendar" 
      SET 
          title = $1,
          type_id = $2,
          price = $3,
          description = $4,
          quantity = $5,
          image = $6
      WHERE id = $7;
    `,
      [title, type_id, price, description, quantity, image, id]
    );
    client.release();
    res.json({ status: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// INsert Product
app.post("/insertProduct/Id", jsonParser, async (req, res) => {
  // const id = req.params.id;
  const { title, type_id, price, description, quantity, image, id } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query(
      `
      INSERT INTO "calendar" 
        (title, type_id, price, description, quantity, image)
      VALUES ($1, $2, $3, $4, $5, $6)
    `,
      [title, type_id, price, description, quantity, image]
    );

    client.release();
    res.json({ status: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// INsert Product
app.post("/deleteProduct/Id", jsonParser, async (req, res) => {
  // const id = req.body.id;
  const { id } = req.body; // Destructure id from req.body
  try {
    const client = await pool.connect();
    const result = await client.query(
      `
      DELETE FROM "calendar" 
      WHERE id = $1
    `,
      [id]
    );

    client.release();
    res.json({ status: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// INsert Order
app.post("/insertOrder/Id", jsonParser, async (req, res) => {
  // const id = req.params.id;
  const { name, price, user_id } = req.body;

  try {
    const client = await pool.connect();
    try {
      const result = await client.query(
        `INSERT INTO "Order" (name, price, user_id) VALUES ($1, $2, $3)`,
        [name, price, user_id]
      );
      // Additional handling for the result if needed
    } finally {
      client.release();
    }
    res.json({ status: "ok" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

//login
app.post("/login", jsonParser, async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      res.json({ status: "error", message: "User not found" });
      return;
    }

    const storedPassword = result.rows[0].password;

    if (storedPassword === password) {
      // Passwords match, generate JWT token
      const token = jwt.sign({ email }, secret, { expiresIn: "1h" });

      res.json({
        status: "ok",
        message: "Login successful",
        token,
        results: result.rows,
        id: result.rows[0].user_id,
      });
    } else {
      // Passwords do not match
      res.json({ status: "error", message: "Login failed" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/authen", jsonParser, function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, secret);
    res.json({ status: "ok", decoded });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
