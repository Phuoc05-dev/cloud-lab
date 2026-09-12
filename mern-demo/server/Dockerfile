# Câu 32: Khai báo Node.js Image làm Base Image
FROM node:18-alpine

# Câu 33: Thiết lập thư mục làm việc bên trong Container
WORKDIR /app

# Câu 34: Sao chép package.json và package-lock.json vào Container
COPY package*.json ./

# Câu 35: Cài đặt các thư viện cần thiết
RUN npm install

# Câu 36: Sao chép toàn bộ source code Backend vào Container
COPY . .

# Câu 37: Mở cổng 5000 để Backend có thể lắng nghe các request từ bên ngoài
EXPOSE 5000

# Câu 38: Chạy lệnh npm start để khởi động Backend
CMD ["npm", "start"]