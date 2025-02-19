# Hệ thống quản lý Tài Chính - EJB & WildFly
## 1. Giới thiệu
Hệ thống tài chính này được xây dựng dựa trên nền tảng Java EE với EJB (Enterprise JavaBeans) để quản lý giao dịch tài chính, xử lý dữ liệu và cung cấp các dịch vụ API. Ứng dụng được triển khai trên WildFly, một máy chủ ứng dụng Java EE mạnh mẽ và linh hoạt.
Hệ thống hỗ trợ các tính năng:<br>
* Kế toán.
* Kiểm toán.
* Quản lý ngân sách.
* Quản lý đầu tư.
## 2. Công nghệ sử dụng.
* __Java EE__: Nền tảng phát triển ứng dụng doanh nghiệp.
* __EJB__ (Enterprise JavaBeans): Xử lý logic nghiệp vụ của ứng dụng.
* __WildFly__: Máy chủ ứng dụng Java EE để triển khai ứng dụng.
* __MongoDB__: Lưu dữ liệu người dùng, dữ liệu tài chính.
* __Maven__: Công cụ quản lý dự án và phụ thuộc.
* __RESTful API__: Cung cấp dịch vụ web API.
## 3. Cách cài đặt hệ thống.
### 3.1 Cài đặt WildFly
1. Tải WildFly từ trang chính thức: https://www.wildfly.org/downloads/
2. Giải nén vào thư mục mong muốn.
3. Cấu hình quản trị viên: <br>
  ```
  cd wildfly/bin
  ./add-user.sh
  ```
  * Chọn loại người dùng: Management User
  * Nhập tên người dùng, mật khẩu và xác nhận
4. Khởi động WildFly
  - MacOS:
  ```
  ./standalone.sh 
  ```
  - Window:
  ```
  ./standalone.bat
  ```
### 3.2 Cấu hình cơ sở dữ liệu
1. Cài đặt MongoDB từ trang chính thức: https://www.mongodb.com/try/download/community
2. Khởi động MongoDB:
   ```
   mongod --dbpath /path/to/your/database
   ```
### 3.3 Triển khai ứng dụng
   1. Biên dịch ứng dụng bằng Maven:
      ```
      mvn clean package
      ```
   2. Copy tệp WAR/EAR vào thư mục deployments của WildFly:
      ```
      cp target/app.war /path/to/wildfly/standalone/deployments/
      ```
   3. Kiểm tra trạng thái triển khai bằng giao diện quản trị WildFly hoặc dòng lệnh:
      ```
      ./jboss-cli.sh --connect --command="deployment-info"
      ```
### 3.4 Truy cập hệ thống
* Truy cập ứng dụng qua trình duyệt: http://localhost:8080/app
* Truy cập API: http://localhost:8080/app/api
## 4. Liên hệ
Nếu có bất kỳ câu hỏi hoặc vấn đề nào, vui lòng liên hệ qua email: thanhlong0j@gmail.com
