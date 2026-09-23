import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [students, setStudents] = useState([])
  const [formData, setFormData] = useState({ studentId: '', name: '', email: '' })

  const apiUrl = 'http://localhost:5000/api/students';

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      const res = await axios.get(apiUrl)
      setStudents(res.data)
    } catch (error) {
      console.error("Lỗi lấy dữ liệu:", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(apiUrl, formData)
      fetchStudents() 
      setFormData({ studentId: '', name: '', email: '' }) 
    } catch (error) {
      console.error("Lỗi thêm sinh viên:", error)
      alert("Chưa thêm được! Kiểm tra lại xem Port 5000 đã bật sang Public chưa nha.")
    }
  }

  return (
    <div style={{ padding: '40px 20px', fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif', backgroundColor: '#eef2f3', minHeight: '100vh' }}>
      
      {/* Khung chứa nội dung chính */}
      <div style={{ maxWidth: '850px', margin: '0 auto', backgroundColor: '#ffffff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        
        <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '30px', fontSize: '28px' }}>
          🎓 Hệ Thống Quản Lý Sinh Viên - Version 2.0
        </h2>
        
        {/* Form nhập liệu */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '15px', marginBottom: '40px', flexWrap: 'wrap' }}>
          <input 
            placeholder="MSSV..." 
            value={formData.studentId} 
            onChange={(e) => setFormData({...formData, studentId: e.target.value})} 
            required 
            style={{ padding: '12px', border: '1px solid #dcdde1', borderRadius: '6px', flex: '1', minWidth: '120px', outline: 'none' }}
          />
          <input 
            placeholder="Họ và tên..." 
            value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
            required 
            style={{ padding: '12px', border: '1px solid #dcdde1', borderRadius: '6px', flex: '2', minWidth: '180px', outline: 'none' }}
          />
          <input 
            placeholder="Địa chỉ Email..." 
            value={formData.email} 
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
            required 
            style={{ padding: '12px', border: '1px solid #dcdde1', borderRadius: '6px', flex: '2', minWidth: '180px', outline: 'none' }}
          />
          <button type="submit" style={{ padding: '12px 25px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>
            + Thêm SV
          </button>
        </form>

        {/* Bảng hiển thị danh sách */}
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#2980b9', color: 'white' }}>
              <th style={{ padding: '15px', borderRadius: '6px 0 0 0' }}>MSSV</th>
              <th style={{ padding: '15px' }}>Họ tên</th>
              <th style={{ padding: '15px', borderRadius: '0 6px 0 0' }}>Email</th>
            </tr>
          </thead>
          <tbody>
            {students.map((sv, index) => (
              <tr key={sv._id} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#ffffff', borderBottom: '1px solid #ecf0f1' }}>
                <td style={{ padding: '15px', color: '#2c3e50', fontWeight: '500' }}>{sv.studentId}</td>
                <td style={{ padding: '15px', color: '#34495e' }}>{sv.name}</td>
                <td style={{ padding: '15px', color: '#7f8c8d' }}>{sv.email}</td>
              </tr>
            ))}
            {/* Dòng chữ báo hiệu nếu chưa có dữ liệu */}
            {students.length === 0 && (
              <tr>
                <td colSpan="3" style={{ padding: '20px', textAlign: 'center', color: '#95a5a6' }}>
                  Chưa có sinh viên nào trong danh sách.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App