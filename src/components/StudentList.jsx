import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/StudentList.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState({
    name: '',
    studentCode: '',
    isActive: false,
  });
  const [selectedStudents, setSelectedStudents] = useState([]); // Để theo dõi sinh viên được chọn
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://student-api-nestjs.onrender.com/students')
      .then((response) => {
        setStudents(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching student list:', error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`https://student-api-nestjs.onrender.com/students/${id}`)
      .then(() => {
        // Cập nhật danh sách sinh viên
        setStudents(prevStudents => prevStudents.filter(student => student._id !== id));
        // Cập nhật danh sách selectedStudents
        setSelectedStudents(prevSelected => prevSelected.filter(studentId => studentId !== id));
      })
      .catch((error) => {
        console.error('Error deleting student:', error);
      });
  };

  const handleUpdate = (id) => {
    navigate(`/students/${id}/edit`); // Điều hướng đến trang cập nhật
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudent({
      ...student,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    axios.post('https://student-api-nestjs.onrender.com/students', student)
      .then((response) => {
        setStudents([...students, response.data.data]); // Cập nhật danh sách sinh viên
        setStudent({ name: '', studentCode: '', isActive: false }); // Reset form
      })
      .catch((error) => {
        console.error('Error adding student:', error);
      });
  };

  const handleSelectStudent = (id) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(selectedStudents.filter(studentId => studentId !== id));
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  };

  const handleClearSelected = () => {
    const deletePromises = selectedStudents.map((id) =>
      axios.delete(`https://student-api-nestjs.onrender.com/students/${id}`)
    );

    Promise.all(deletePromises)
      .then(() => {
        // Cập nhật lại danh sách sinh viên sau khi xóa
        setStudents(prevStudents => prevStudents.filter(student => !selectedStudents.includes(student._id)));
        // Reset danh sách selectedStudents về rỗng
        setSelectedStudents([]);
      })
      .catch((error) => {
        console.error('Error deleting selected students:', error);
      });
  };

  return (
    <div className="student-table-container">
      <h2>
        Selected Total: {selectedStudents.length}
        <button onClick={handleClearSelected} style={{ marginLeft: '10px' }}>
          Clear
        </button>
      </h2> {/* Hiển thị số lượng sinh viên được chọn */}
      <form onSubmit={handleAddStudent} className="student-form">
        <div className="input-group">
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
          <input
            type="text"
            name="studentCode"
            value={student.studentCode}
            onChange={handleChange}
            placeholder="Student Code"
            required
          />
        </div>
        <div className="checkbox-button-group">
          <label>
            <input
              type="checkbox"
              name="isActive"
              checked={student.isActive}
              onChange={handleChange}
            />
            Active
          </label>
          <button type="submit">Add Student</button>
        </div>
      </form>
      <table className="student-table">
        <thead>
          <tr>
            <th>Select</th> {/* Cột Select */}
            <th>Student Code</th>
            <th>Full Name</th>
            <th>Status</th>
            <th>Action</th> {/* Cột Action */}
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedStudents.includes(student._id)}
                  onChange={() => handleSelectStudent(student._id)}
                />
              </td>
              <td>{student.studentCode}</td>
              <td>
                <Link to={`/students/${student._id}`}>{student.name}</Link>
              </td>
              <td>{student.isActive ? 'Active' : 'Inactive'}</td>
              <td>
                <button onClick={() => handleUpdate(student._id)}>Update</button>
                <button onClick={() => handleDelete(student._id)}>Delete</button>
              </td> {/* Các nút Update và Delete */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
