global.crypto = require('crypto');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const app = express();

const port = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI;

app.use(express.json());
app.use(cors());

mongoose.connect(uri)
  .then(() => console.log('Ket noi MongoDB Atlas thanh cong!'))
  .catch((err) => console.error('Loi ket noi MongoDB:', err));

// Câu 35
const studentSchema = new mongoose.Schema({
  studentId: String,
  name: String,
  email: String
});
const Student = mongoose.model('Student', studentSchema);

// Câu 36
app.get('/api/students', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// Câu 37
app.post('/api/students', async (req, res) => {
  const newStudent = await Student.create(req.body);
  res.json(newStudent);
});

// Câu 38
app.put('/api/students/:id', async (req, res) => {
  const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedStudent);
});

// Câu 39
app.delete('/api/students/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: 'Đã xóa sinh viên' });
});

app.listen(port, () => {
  console.log(`Server dang chay tren port ${port}`);
});