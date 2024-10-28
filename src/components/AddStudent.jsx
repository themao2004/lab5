// src/components/AddStudent.jsx
import React, { useState } from 'react';
import api from '../api';

const AddStudent = () => {
  const [studentCode, setStudentCode] = useState('');
  const [name, setName] = useState('');
  const [isActive, setIsActive] = useState(true);

  const handleAddStudent = async () => {
    try {
      const response = await api.post('/students', { studentCode, name, isActive });
      console.log('Student added:', response.data);
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <div>
      <h2>Add Student</h2>
      <input
        type="text"
        value={studentCode}
        onChange={(e) => setStudentCode(e.target.value)}
        placeholder="Student Code"
      />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <label>
        Active:
        <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
      </label>
      <button onClick={handleAddStudent}>Add Student</button>
    </div>
  );
};

export default AddStudent;
