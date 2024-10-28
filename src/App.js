// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentList from './components/StudentList';
import StudentDetail from './components/StudentDetail';
import AddStudent from './components/AddStudent';
import StudentEdit from './components/StudentEdit';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<StudentList />} />
      <Route path="/students/:id" element={<StudentDetail />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/students/:id/edit" element={<StudentEdit />} />
      </Routes>
    </Router>
  );
};

export default App;
