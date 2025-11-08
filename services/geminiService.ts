import { Doctor } from '../types';
import { mockDoctors } from './mockData';

/**
 * Fetches the list of doctors.
 * For local development, this service returns mock data to ensure the application
 * runs without needing a live API key. It simulates a network delay.
 */
export const fetchDoctorsFromGemini = async (): Promise<Doctor[]> => {
  console.log("Using mock data for local development to ensure application runs smoothly.");
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockDoctors);
    }, 500); // Simulate a 500ms network request
  });
};
