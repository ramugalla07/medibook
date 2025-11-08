
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppointmentProvider } from './contexts/AppointmentContext';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import DoctorList from './pages/DoctorList';
import DoctorDetail from './pages/DoctorDetail';
import MyAppointments from './pages/MyAppointments';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <ThemeProvider>
      <AppointmentProvider>
        <HashRouter>
          <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
            <Header />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/doctors" element={<DoctorList />} />
                <Route path="/doctors/:id" element={<DoctorDetail />} />
                <Route path="/appointments" element={<MyAppointments />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
            <footer className="text-center py-4 border-t border-gray-200 dark:border-slate-700 text-sm text-gray-500 dark:text-gray-400">
              © 2024 MediBook. All rights reserved.
            </footer>
          </div>
          <Toaster position="top-right" reverseOrder={false} />
        </HashRouter>
      </AppointmentProvider>
    </ThemeProvider>
  );
}

export default App;
