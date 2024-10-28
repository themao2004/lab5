import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StudentDetail = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    axios.get(`https://student-api-nestjs.onrender.com/students/${id}`)
      .then((response) => {
        setStudent(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching student detail:', error);
      });
  }, [id]);

  if (!student) return <div>Loading...</div>;

  return (
    <div>
      <h2>Student Detail</h2>
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Student Code:</strong> {student.studentCode}</p>
      <p><strong>Status:</strong> {student.isActive ? 'Active' : 'Inactive'}</p>
    </div>
  );
};

export default StudentDetail;
