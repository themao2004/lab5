import React from 'react';
import "../styles/tableStudent.css";

const TableStudent = ({ students, setStudents, setSelectedCount }) => {  
  const handleCheckboxChange = (index) => {
    const updatedStudents = students.map((student, i) =>
      i === index ? { ...student, checked: !student.checked } : student
    );
    
    setStudents(updatedStudents);
    const count = updatedStudents.filter(student => student.checked).length;
    setSelectedCount(count);
  };

  const handleDeleteStudent = (index) => {
    const updatedStudents = students.filter((_, i) => i !== index);
    setStudents(updatedStudents);
    const count = updatedStudents.filter(student => student.checked).length;
    setSelectedCount(count);
  };

  return (
    <div>
      <table className="student-table">
        <thead>
          <tr>
            <th>Select</th>
            <th>Student Name</th>
            <th>Student Code</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={student.checked}
                  onChange={() => handleCheckboxChange(index)}
                />
              </td>
              <td>{student.studentName}</td>
              <td>{student.studentCode}</td>
              <td className={student.status === 'active' ? 'status-active' : 'status-inactive'}>
                {student.status === 'active' ? 'Active' : 'In-Active'}
              </td>
              <td>
                <button className="delete-button" onClick={() => handleDeleteStudent(index)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableStudent;
