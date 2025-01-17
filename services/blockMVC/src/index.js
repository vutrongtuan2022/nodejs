const path = require("path");
const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars"); // Import `engine` từ `express-handlebars`
const app = express();
const port = 8000;

app.use(express.static(path.join(__dirname, "public")));

// Middleware để xử lý form data (quan trọng)
app.use(express.urlencoded({ extended: true }));
// file JSON để xử lý form data (quan trọng)
app.use(express.json());

// HTTP logger
app.use(morgan("combined"));

// Template engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
  })
); // Sử dụng `engine` từ `express-handlebars`
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views")); // Đặt đúng đường dẫn đến thư mục views

// Route
app.get("/", (req, res) => {
  res.render("home"); // Render file `resources/views/home.handlebars`
});

app.get("/news", (req, res) => {
  res.render("news"); // Render file `resources/views/news.handlebars`
});

app.get("/search", (req, res) => {
  res.render("search"); // Render file `resources/views/search.handlebars`
});

app.post("/search", (req, res) => {
  console.log(req.body);
  // res.send(`Data received: ${JSON.stringify(req.body)}`);
  res.send(""); // Render file `resources/views/search.handlebars`
  // trong trường hợp này không sử dụng render mà dùng send thì chỉ dùng để hiển thị 1 chuỗi rỗng
});

// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
