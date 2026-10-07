import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [students, setStudents] = useState([])
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    email: ''
  })

  const apiUrl = 'https://mern-backend-234753.onrender.com/api/students'

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      const res = await axios.get(apiUrl)
      setStudents(res.data)
    } catch (error) {
      console.error('Lỗi lấy dữ liệu:', error)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.studentId || !formData.name || !formData.email) {
      alert('Vui lòng nhập đầy đủ thông tin!')
      return
    }

    try {
      await axios.post(apiUrl, formData)

      setFormData({
        studentId: '',
        name: '',
        email: ''
      })

      fetchStudents()
    } catch (error) {
      console.error('Lỗi thêm sinh viên:', error)
    }
  }

  const handleEdit = async (sv) => {
    const newName = prompt('Nhập họ tên mới:', sv.name)

    if (!newName) return

    try {
      await axios.put(`${apiUrl}/${sv._id}`, {
        studentId: sv.studentId,
        name: newName,
        email: sv.email
      })

      fetchStudents()
    } catch (error) {
      console.error('Lỗi cập nhật sinh viên:', error)
    }
  }

  const handleDelete = async (sv) => {
    const confirmDelete = confirm(
      `Bạn có chắc muốn xóa sinh viên ${sv.name} không?`
    )

    if (!confirmDelete) return

    try {
      await axios.delete(`${apiUrl}/${sv._id}`)
      fetchStudents()
    } catch (error) {
      console.error('Lỗi xóa sinh viên:', error)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#eef3f5',
        padding: '40px 20px'
      }}
    >
      <div
        style={{
          maxWidth: '980px',
          margin: '0 auto',
          backgroundColor: 'white',
          padding: '32px',
          borderRadius: '15px',
          boxShadow: '0 5px 20px rgba(0,0,0,0.12)'
        }}
      >
        <h1
          style={{
            textAlign: 'center',
            color: '#243c5a',
            marginBottom: '30px'
          }}
        >
          🎓 Hệ Thống Quản Lý Sinh Viên - Version 2.0
        </h1>

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.8fr 1.8fr auto',
            gap: '15px',
            marginBottom: '35px'
          }}
        >
          <input
            type="text"
            name="studentId"
            placeholder="MSSV..."
            value={formData.studentId}
            onChange={handleChange}
            style={{
              padding: '14px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#3a3a3a',
              color: 'white'
            }}
          />

          <input
            type="text"
            name="name"
            placeholder="Họ và tên..."
            value={formData.name}
            onChange={handleChange}
            style={{
              padding: '14px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#3a3a3a',
              color: 'white'
            }}
          />

          <input
            type="email"
            name="email"
            placeholder="Địa chỉ Email..."
            value={formData.email}
            onChange={handleChange}
            style={{
              padding: '14px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#3a3a3a',
              color: 'white'
            }}
          />

          <button
            type="submit"
            style={{
              padding: '14px 22px',
              backgroundColor: '#27ae60',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            + Thêm SV
          </button>
        </form>

        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left'
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: '#2980b9',
                color: 'white'
              }}
            >
              <th style={{ padding: '15px' }}>MSSV</th>
              <th style={{ padding: '15px' }}>Họ tên</th>
              <th style={{ padding: '15px' }}>Email</th>
              <th style={{ padding: '15px' }}>Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {students.map((sv, index) => (
              <tr
                key={sv._id}
                style={{
                  backgroundColor:
                    index % 2 === 0 ? '#f8f9fa' : '#ffffff'
                }}
              >
                <td
                  style={{
                    padding: '15px',
                    color: '#2c3e50',
                    fontWeight: '500'
                  }}
                >
                  {sv.studentId}
                </td>

                <td
                  style={{
                    padding: '15px',
                    color: '#34495e'
                  }}
                >
                  {sv.name}
                </td>

                <td
                  style={{
                    padding: '15px',
                    color: '#7f8c8d'
                  }}
                >
                  {sv.email}
                </td>

                <td
                  style={{
                    padding: '15px'
                  }}
                >
                  <button
                    onClick={() => handleEdit(sv)}
                    style={{
                      marginRight: '8px',
                      padding: '8px 12px',
                      backgroundColor: '#f39c12',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    Sửa
                  </button>

                  <button
                    onClick={() => handleDelete(sv)}
                    style={{
                      padding: '8px 12px',
                      backgroundColor: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}

            {students.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  style={{
                    padding: '20px',
                    textAlign: 'center',
                    color: '#95a5a6'
                  }}
                >
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