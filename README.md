# Cốt Đờ Store — Bảng Giá Dịch Vụ

Clone giao diện bảng giá dịch vụ (Netflix, YouTube, Google One, ChatGPT, Apple One, Canva, CapCut, Studocu, Duolingo/Quizlet).

## Cách dùng
- Mở trực tiếp `index.html` bằng trình duyệt, hoặc
- Deploy bằng GitHub Pages: push repo này lên GitHub → vào **Settings → Pages** → chọn branch `main` / thư mục gốc → Save.

## Cấu trúc
```
index.html   → nội dung trang
style.css    → toàn bộ style + hiệu ứng hover + responsive
assets/      → thư mục để bỏ ảnh logo/icon (64x64px) vào
```

## Thêm icon/logo
- Hầu hết thẻ dịch vụ có 1 khung `div.icon-slot` chứa `<img>` trỏ tới `assets/<tên>.png`, kích thước **64x64px**, đứng một mình (netflix, youtube, chatgpt, canva, capcut, studocu, duolingo, quizlet).
- Riêng **Combo Google One** và **Combo Apple One** có 4 logo con, mỗi cái **32x32px**, xếp thành khối 2x2 (`div.icon-cube`):
  - Google One: `assets/google-drive.png`, `assets/gmail.png`, `assets/google-photos.png`, `assets/gemini.png`
  - Apple One: `assets/icloud.png`, `assets/apple-music.png`, `assets/apple-tv.png`, `assets/apple-arcade.png`
- Logo brand ở sidebar: `assets/logo.png`, kích thước 32x32px.

Chỉ cần bỏ ảnh đúng tên file vào thư mục `assets/` là ảnh tự hiện lên, không cần sửa code. Nếu chưa có ảnh, khung sẽ hiện placeholder viền đứt.

## Ghi chú
- Trên **desktop/laptop**: layout nằm ngang, vừa khít màn hình (100vh), không cần cuộn.
- Trên **điện thoại**: sidebar chuyển thành thanh ngang phía trên, 9 thẻ dịch vụ thu nhỏ về **2 cột**, nội dung giữ nguyên, có thể cuộn dọc.
- Hover / chạm vào từng thẻ sẽ nổi lên (translateY + scale + đổ bóng).

## Di chuyển tên brand
Thẻ `.brand-name` trong `index.html` có thuộc tính `style="--brand-name-x: 0px;"`. Đổi số đó để dịch tên "CỐT ĐỜ STORE" qua trái/phải mà không ảnh hưởng phần khác:
- Số dương (vd `10px`, `20px`) → dịch sang **phải**
- Số âm (vd `-10px`, `-20px`) → dịch sang **trái**

## Cấu trúc từng thẻ dịch vụ (card)
Mỗi `<article class="card">` gồm 2 phần:
1. `<header class="card-head">`: chứa icon (nổi bên phải bằng `float:right`), tên combo (`<h2>`) và mô tả ngắn (`<p class="lead">`). Vì icon dùng `float`, khi tiêu đề hoặc mô tả quá dài sẽ **tự động xuống dòng** tránh icon thay vì đè lên.
2. `<div class="info">`: chứa toàn bộ phần thông tin giá (`.divider`, `.note`, `.row`), nằm ngay dưới `card-head`, các dòng này được **align center**.
