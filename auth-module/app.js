
const express = require('express');
const { register, login } = require('./services/authService');

const app = express();

app.use(express.json({ limit: '10kb' }));

app.post('/api/auth/register', (req, res) => {
  try {
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
      return res.status(400).json({
        message: 'Dữ liệu yêu cầu không hợp lệ',
      });
    }

    const { username, password } = req.body;
    const user = register(username, password);

    return res.status(201).json({
      message: 'Đăng ký thành công',
      user,
    });
  } catch (error) {
    if (error.code === 'DUPLICATE_USERNAME') {
      return res.status(409).json({ message: error.message });
    }

    if (error.code === 'INVALID_INPUT') {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({
      message: 'Lỗi hệ thống',
    });
  }
});

app.post('/api/auth/login', (req, res) => {
  try {
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
      return res.status(400).json({
        message: 'Dữ liệu yêu cầu không hợp lệ',
      });
    }
    const { username, password } = req.body;
    const user = login(username, password);

    return res.status(200).json({
      message: 'Đăng nhập thành công',
      user,
    });
  } catch (error) {
    if (error.code === 'INVALID_INPUT') {
      return res.status(400).json({ message: error.message });
    }

    if (error.code === 'INVALID_CREDENTIALS') {
      return res.status(401).json({ message: error.message });
    }

    return res.status(500).json({
      message: 'Lỗi hệ thống',
    });
  }
});

module.exports = app;
