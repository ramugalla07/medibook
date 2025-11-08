
import React, { useContext, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AppointmentContext } from '../contexts/AppointmentContext';
import { Link } from 'react-router-dom';
import { Stethoscope, CalendarPlus } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { appointments } = useContext(AppointmentContext);

  const appointmentData = useMemo(() => {
    const specialtyCounts = appointments.reduce((acc, appointment) => {
      const specialty = appointment.doctor.specialty;
      acc[specialty] = (acc[specialty] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(specialtyCounts).map(([name, count]) => ({
      name,
      appointments: count,
    }));
  }, [appointments]);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Welcome to MediBook</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">Your health, our priority. Easily find and book appointments with top doctors.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Link to="/doctors" className="group block bg-primary-500 text-white p-8 rounded-xl shadow-lg hover:bg-primary-600 transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center gap-4">
            <Stethoscope className="w-16 h-16 opacity-80 group-hover:opacity-100" />
            <div>
              <h2 className="text-2xl font-bold">Find a Doctor</h2>
              <p className="opacity-90">Browse specialists and find the right one for you.</p>
            </div>
          </div>
        </Link>
        <Link to="/appointments" className="group block bg-green-500 text-white p-8 rounded-xl shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center gap-4">
            <CalendarPlus className="w-16 h-16 opacity-80 group-hover:opacity-100" />
            <div>
              <h2 className="text-2xl font-bold">My Appointments</h2>
              <p className="opacity-90">View and manage your upcoming appointments.</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Appointment Statistics</h2>
        {appointments.length > 0 ? (
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={appointmentData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-slate-700" />
                <XAxis dataKey="name" className="text-xs fill-current text-gray-600 dark:text-gray-400" />
                <YAxis allowDecimals={false} className="text-xs fill-current text-gray-600 dark:text-gray-400" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid #ccc',
                    color: '#333'
                  }}
                  cursor={{ fill: 'rgba(0, 123, 255, 0.1)' }}
                />
                <Legend />
                <Bar dataKey="appointments" fill="#007BFF" name="Appointments" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-10">No appointments booked yet. Your statistics will appear here.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
