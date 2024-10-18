import '../styles/submitForm.css';
import { useState } from 'react';

const SubmitForm = ({ setStudents, students }) => {  // Nhận setStudents từ props
  const [studentName, setStudentName] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [isActive, setIsActive] = useState(false);

  const handleAddStudent = () => {
    const newStudent = {
      studentName,
      studentCode,
      status: isActive ? 'active' : 'in-active'
    };

    // Thêm học sinh mới vào danh sách hiện tại
    setStudents([newStudent, ...students]);

    // Xóa trắng input sau khi thêm
    setStudentName('');
    setStudentCode('');
    setIsActive(false);
  };

  return (
    <div className="submit-container">
      <div className="flex">
        <input 
          type="text" 
          placeholder="Student name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Student code"
          value={studentCode}
          onChange={(e) => setStudentCode(e.target.value)}
        />
        <div className="checkbox-container">
          <input 
            type="checkbox" 
            id="active" 
            name="active"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          <label htmlFor="active">Still active</label>
        </div>
      </div>
      <div className="button-container">
        <button className="submit-button" onClick={handleAddStudent}>Add</button>
      </div>
    </div>
  );
}

export default SubmitForm;
