// src/hooks/useFetchStudents.js
import { useState, useEffect } from 'react';
import api from '../api';

const useFetchStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get('/students');
        setStudents(response.data.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return { students, loading };
};

export default useFetchStudents;
