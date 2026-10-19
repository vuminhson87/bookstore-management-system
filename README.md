# Hệ thống Quản lý Nhà sách – Nhóm 04

## Công nghệ sử dụng

- Backend: Java 21, Spring Boot 4.0.8, Maven.
- Frontend: React, Vite, Axios.
- Cơ sở dữ liệu: MySQL (XAMPP).

## Hướng dẫn cài đặt và chạy chương trình

### 1. Chuẩn bị môi trường

Cài đặt Java 21, Maven, Node.js, npm và XAMPP.

### 2. Khởi động cơ sở dữ liệu

- Mở XAMPP và khởi động MySQL tại cổng `3306`.
- Truy cập phpMyAdmin và tạo cơ sở dữ liệu `bookstore_db`.
- Cấu hình kết nối trong `backend/src/main/resources/application.properties`.
- Có thể sử dụng các biến môi trường `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` để thay đổi thông tin kết nối.

### 3. Chạy Backend

Mở CMD tại thư mục `backend` và thực hiện:

`mvn spring-boot:run`

Backend chạy tại `http://localhost:8080`.

### 4. Chạy Frontend

Mở một cửa sổ CMD khác tại thư mục `frontend` và thực hiện:

`npm install`

`npm run dev`

Mở địa chỉ `http://localhost:5173` trên trình duyệt.

### 5. Cấu hình giao tiếp API

Frontend sử dụng Axios trong `frontend/src/services/api.js`, với địa chỉ Backend `http://localhost:8080/api`.

**Lưu ý:** Dự án hiện ở giai đoạn xây dựng khung mã nguồn. Các chức năng nghiệp vụ sẽ được phát triển trong các bước tiếp theo. Không đưa mật khẩu hoặc thông tin nhạy cảm lên GitHub.