import express from "express";
import mysql from "mysql";
import cors from "cors";
var app = express();
app.use(cors({ origin: true, credentials: true }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Hello@mysql991",
  database: "test",
  sqlState: 8800,
  fatal: true,
});

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.get("/", (req, res) => {
  res.json("hello this is the backend");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`, `desc`,`price`, `cover`) VALUES (?) ";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("books has been created");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("books has been Deleted sucessfully");
  });
});
app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET  `title` = ?. `desc`=?, `price`=?, `cover`= ? WHERE id =?";
  const calues = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("books has been updated sucessfully");
  });
});

app.listen(8800, () => {
  console.log("connected to backend!");
});
