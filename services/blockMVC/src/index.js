const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars'); // Import `engine` từ `express-handlebars`
const app = express();
const port = 8080;

const router = require('./router');

app.use(express.static(path.join(__dirname, 'public')));

// Middleware để xử lý form data (quan trọng)
app.use(express.urlencoded({ extended: true }));
// file JSON để xử lý form data (quan trọng)
app.use(express.json());

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
  }),
); // Sử dụng `engine` từ `express-handlebars`
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views')); // Đặt đúng đường dẫn đến thư mục views

// Route init

router(app);

// Start server
              app.listen(port, () => {
                console.log(`Example app listening on port ${port}`);
              });
