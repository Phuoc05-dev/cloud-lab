# Câu 51: Khai báo Node.js Image làm Base Image
FROM node:20-alpine

# Câu 52: Thiết lập thư mục làm việc bên trong Frontend Container
WORKDIR /app

# Câu 53: Sao chép package.json và package-lock.json vào Container
COPY package*.json ./

# Câu 54: Cài đặt các thư viện của React 
RUN npm install

# Câu 55: Sao chép toàn bộ source code React vào Container
COPY . .

# Câu 56: Build React Application 
RUN npm run build

# Khai báo port 4173 
EXPOSE 4173

# Lệnh khởi động Frontend khi Container chạy 
CMD ["npm", "run", "preview", "--", "--host"]