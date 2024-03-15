JWT Json Web Token giúp bạn tạo ra chỗi mã hóa 
cấu trúc 3 phần: 
Header: xác định token
Payload: dữ liệu
verify signature:

cách sử dụng:
khi người dùng đâng nhập bằng mật khẩu thì nó sẽ gửi lên authen server và server sẽ kiểm tra xem có đúng không. Sau đó tạo ra JWT sau đó gửi lại user và lưu lại local, mỗi lần muốn lấy dữ liệu từ server thì người dùng pass JWT
 