const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Настройки для Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Укажите здесь путь к папке, куда вы хотите сохранять файлы
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.use(express.static('public')); // Папка для статических файлов, например, CSS или JS

app.post('/upload', upload.single('file-upload'), (req, res) => {
  res.send('Файл успешно загружен.'); // Отправляем сообщение об успешной загрузке файла
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});