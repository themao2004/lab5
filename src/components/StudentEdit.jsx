import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const StudentEdit = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({ name: '', studentCode: '', isActive: true });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://student-api-nestjs.onrender.com/students/${id}`)
      .then((response) => {
        setStudent(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching student details:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://student-api-nestjs.onrender.com/students/${id}`, student)
      .then(() => {
        navigate(`/`); // Quay lại trang chi tiết sinh viên sau khi cập nhật
      })
      .catch((error) => {
        console.error('Error updating student:', error);
      });
  };

  return (
    <div>
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Student Code:</label>
          <input type="text" name="studentCode" value={student.studentCode} onChange={handleChange} disabled={true}/>
        </div>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={student.name} onChange={handleChange} />
        </div>
        <div>
          <label>Status:</label>
          <select name="isActive" value={student.isActive} onChange={handleChange}>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default StudentEdit;
