import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { Appointment } from '../types';
import toast from 'react-hot-toast';

interface AppointmentContextType {
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
  removeAppointment: (appointmentId: string) => void;
}

export const AppointmentContext = createContext<AppointmentContextType>({
  appointments: [],
  addAppointment: () => {},
  removeAppointment: () => {},
});

interface AppointmentProviderProps {
  children: ReactNode;
}

export const AppointmentProvider: React.FC<AppointmentProviderProps> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const savedAppointments = localStorage.getItem('appointments');
      return savedAppointments ? JSON.parse(savedAppointments) : [];
    } catch (error) {
      console.error("Failed to parse appointments from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('appointments', JSON.stringify(appointments));
    } catch (error) {
      console.error("Failed to save appointments to localStorage", error);
    }
  }, [appointments]);

  const addAppointment = (appointment: Appointment) => {
    setAppointments((prevAppointments) => [...prevAppointments, appointment]);
    toast.success(`Appointment with ${appointment.doctor.name} booked successfully!`);
  };
  
  const removeAppointment = (appointmentId: string) => {
    const appointmentToRemove = appointments.find(app => app.id === appointmentId);
    if (appointmentToRemove) {
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment.id !== appointmentId)
      );
      toast.error(`Appointment with ${appointmentToRemove.doctor.name} has been canceled.`);
    }
  };

  return (
    <AppointmentContext.Provider value={{ appointments, addAppointment, removeAppointment }}>
      {children}
    </AppointmentContext.Provider>
  );
};
