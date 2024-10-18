import SubmitForm from "./submitForm";
import TotalSelect from "./totalSelect";
import TableStudent from "./tableStudent";
import "../styles/studentTemplate.css";
import React, { useState } from 'react'; 

const StudentTemplate = () => {
  const [students, setStudents] = useState([
    { studentName: 'Nguyen Van A', studentCode: '001', status: 'active', checked: false },
    { studentName: 'Tran Van B', studentCode: '002', status: 'in-active', checked: false },
  ]);

  // Tạo state để lưu số lượng checkbox được tick
  const [selectedCount, setSelectedCount] = useState(0);
  const handleAddStudent = (newStudent) => {
    setStudents([newStudent, ...students]); // Thêm sinh viên mới vào đầu mảng
  };
  return (
    <div className="StudentTemplate-container">
      <TotalSelect selectedCount={selectedCount} setSelectedCount={setSelectedCount}/> {/* Truyền selectedCount vào TotalSelect */}
      <SubmitForm setStudents={setStudents} students={students}/>
      <TableStudent students={students} setStudents={setStudents} setSelectedCount={setSelectedCount}/> {/* Truyền setStudents và setSelectedCount */}
    </div>
  );
}

export default StudentTemplate;
