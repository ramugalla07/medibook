
import { useState, useEffect, useCallback } from 'react';
import { Doctor } from '../types';
import { fetchDoctorsFromGemini } from '../services/geminiService';

export const useDoctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadDoctors = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const cachedDoctors = sessionStorage.getItem('doctors');
      if (cachedDoctors) {
        setDoctors(JSON.parse(cachedDoctors));
      } else {
        const fetchedDoctors = await fetchDoctorsFromGemini();
        sessionStorage.setItem('doctors', JSON.stringify(fetchedDoctors));
        setDoctors(fetchedDoctors);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDoctors();
  }, [loadDoctors]);

  return { doctors, loading, error, refresh: loadDoctors };
};
