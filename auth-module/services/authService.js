
const crypto = require('node:crypto');

const users = [];

function createAuthError(message, code) {
    const error = new Error(message);
    error.code = code;
    return error;
}

function hashPassword(password, salt) {
    return crypto.scryptSync(password, salt, 64);
}

function register(username, password) {
    if (typeof username !== 'string' || !username.trim()) {
        throw createAuthError('Tên đăng nhập không hợp lệ', 'INVALID_INPUT');
    }

    if (typeof password !== 'string' || password.length < 6) {
        throw createAuthError('Mật khẩu phải có ít nhất 6 ký tự', 'INVALID_INPUT');
    }

    const normalizedUsername = username.trim();

    if (users.some((user) => user.username === normalizedUsername)) {
        throw createAuthError('Tên đăng nhập đã tồn tại', 'DUPLICATE_USERNAME');
    }

    const salt = crypto.randomBytes(16).toString('hex');
    const passwordHash = hashPassword(password, salt);

    const user = {
        id: users.length + 1,
        username: normalizedUsername,
        passwordHash,
        salt,
    };

    users.push(user);

    return {
        id: user.id,
        username: user.username,
    };
}

function login(username, password) {
    if (typeof username !== 'string' || !username.trim()
        || typeof password !== 'string' || !password) {
        throw createAuthError('Thông tin đăng nhập không hợp lệ', 'INVALID_INPUT');
    }

    const user = users.find(
        (item) => item.username === username.trim()
    );

    if (!user) {
        throw createAuthError('Tên đăng nhập hoặc mật khẩu không đúng', 'INVALID_CREDENTIALS');
    }

    const passwordHash = hashPassword(password, user.salt);

    if (!crypto.timingSafeEqual(passwordHash, user.passwordHash)) {
        throw createAuthError(
            'Tên đăng nhập hoặc mật khẩu không đúng',
            'INVALID_CREDENTIALS'
        );
    }

    return {
        id: user.id,
        username: user.username,
    };
}

module.exports = { register, login };
