import React, { useState, useContext } from 'react';
import { Doctor } from '../types';
import { AppointmentContext } from '../contexts/AppointmentContext';
import { v4 as uuidv4 } from 'uuid';

interface AppointmentFormProps {
  doctor: Doctor;
  selectedTime: string;
  selectedDate: Date;
  onSuccess: () => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ doctor, selectedTime, selectedDate, onSuccess }) => {
  const [patientName, setPatientName] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const { addAppointment } = useContext(AppointmentContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !reason.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');

    const newAppointment = {
      id: uuidv4(),
      doctor,
      patientName,
      appointmentTime: selectedTime,
      appointmentDate: selectedDate.toISOString().split('T')[0], // YYYY-MM-DD
      reason,
    };
    
    addAppointment(newAppointment);
    onSuccess();
  };
  
  const formattedDisplayDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(selectedDate);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
        <input
          type="text"
          id="patientName"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm bg-gray-50 dark:bg-slate-700 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Reason for Visit</label>
        <textarea
          id="reason"
          rows={3}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm bg-gray-50 dark:bg-slate-700 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          required
        />
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-slate-700 p-3 rounded-md">
        <p><strong>Doctor:</strong> {doctor.name} ({doctor.specialty})</p>
        <p><strong>Date:</strong> {formattedDisplayDate}</p>
        <p><strong>Time:</strong> {selectedTime}</p>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Confirm Booking
        </button>
      </div>
    </form>
  );
};

export default AppointmentForm;