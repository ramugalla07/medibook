import React, { useContext, useState } from 'react';
import { AppointmentContext } from '../contexts/AppointmentContext';
import { Link } from 'react-router-dom';
import { CalendarX2 } from 'lucide-react';
import { Appointment } from '../types';
import Modal from '../components/common/Modal';

const MyAppointments: React.FC = () => {
  const { appointments, removeAppointment } = useContext(AppointmentContext);
  const [appointmentToCancel, setAppointmentToCancel] = useState<Appointment | null>(null);
  
  const convertTo24Hour = (time: string) => {
    const [timePart, modifier] = time.split(' ');
    let [hours, minutes] = timePart.split(':');
    if (hours === '12') {
      hours = '00';
    }
    if (modifier === 'PM') {
      hours = (parseInt(hours, 10) + 12).toString();
    }
    return `${hours.padStart(2, '0')}:${minutes}`;
  };

  const sortedAppointments = [...appointments].sort((a, b) => {
    const dateA = new Date(`${a.appointmentDate}T${convertTo24Hour(a.appointmentTime)}:00`);
    const dateB = new Date(`${b.appointmentDate}T${convertTo24Hour(b.appointmentTime)}:00`);
    return dateA.getTime() - dateB.getTime();
  });

  const handleConfirmCancel = () => {
    if (appointmentToCancel) {
      removeAppointment(appointmentToCancel.id);
      setAppointmentToCancel(null);
    }
  };

  const formatDisplayDate = (dateString: string) => {
    const date = new Date(dateString);
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date.getTime() + userTimezoneOffset));
  };


  return (
    <div className="animate-fade-in">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">My Appointments</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">You have {appointments.length} upcoming appointment(s).</p>
      </div>

      {sortedAppointments.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
          <CalendarX2 className="mx-auto h-16 w-16 text-primary-400" />
          <h2 className="mt-6 text-2xl font-semibold text-gray-700 dark:text-gray-300">No Appointments Booked</h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">Looks like you haven't booked any appointments yet.</p>
          <Link
            to="/doctors"
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Find a Doctor
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedAppointments.map(app => (
            <div key={app.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
                <img src={app.doctor.profilePictureUrl} alt={app.doctor.name} className="w-24 h-24 rounded-full object-cover border-4 border-primary-200 dark:border-primary-700" />
                <div className="flex-grow">
                  <p className="text-sm text-primary-600 dark:text-primary-400 font-semibold">{app.doctor.specialty}</p>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">Dr. {app.doctor.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1"><strong>Reason:</strong> {app.reason}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Booked for {app.patientName}</p>
                </div>
                <div className="w-full md:w-auto mt-4 md:mt-0 text-center md:text-right bg-primary-50 dark:bg-slate-700 p-4 rounded-lg">
                  <p className="font-bold text-lg text-primary-700 dark:text-primary-300">{app.appointmentTime}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{formatDisplayDate(app.appointmentDate)}</p>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-slate-700/50 px-6 py-3 flex justify-end">
                <button 
                  onClick={() => setAppointmentToCancel(app)}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-danger hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Cancel Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {appointmentToCancel && (
        <Modal
          title="Confirm Cancellation"
          onClose={() => setAppointmentToCancel(null)}
        >
          <div>
            <p className="text-gray-700 dark:text-gray-300">
              Are you sure you want to cancel your appointment with <strong>Dr. {appointmentToCancel.doctor.name}</strong> on <strong>{formatDisplayDate(appointmentToCancel.appointmentDate)}</strong> at <strong>{appointmentToCancel.appointmentTime}</strong>?
            </p>
            <div className="flex justify-end gap-3 pt-6">
              <button
                onClick={() => setAppointmentToCancel(null)}
                className="px-4 py-2 border border-gray-300 dark:border-slate-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Keep Appointment
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-danger hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MyAppointments;