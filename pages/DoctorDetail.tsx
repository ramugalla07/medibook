import React, { useState, useMemo, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDoctors } from '../hooks/useDoctors';
import Spinner from '../components/common/Spinner';
import Alert from '../components/common/Alert';
import Modal from '../components/common/Modal';
import AppointmentForm from '../components/AppointmentForm';
import { ArrowLeft, Info } from 'lucide-react';
import { AppointmentContext } from '../contexts/AppointmentContext';

const DoctorDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { doctors, loading, error, refresh } = useDoctors();
  const { appointments } = useContext(AppointmentContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const getTomorrow = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d;
  };

  const [selectedDate, setSelectedDate] = useState<Date>(getTomorrow());

  const doctor = useMemo(() => {
    return doctors.find(doc => doc.id.toString() === id);
  }, [doctors, id]);

  const formattedDateForStorage = selectedDate.toISOString().split('T')[0];

  const bookedSlots = useMemo(() => {
    return new Set(
      appointments
        .filter(app => app.doctor.id.toString() === id && app.appointmentDate === formattedDateForStorage)
        .map(app => app.appointmentTime)
    );
  }, [appointments, id, formattedDateForStorage]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    // Adjust for timezone offset to prevent date from shifting
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    setSelectedDate(new Date(date.getTime() + userTimezoneOffset));
  };

  const formattedDisplayDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(selectedDate);

  const handleBookClick = (slot: string) => {
    setSelectedSlot(slot);
    setIsModalOpen(true);
  };
  
  const getMinDate = () => {
      const today = new Date();
      today.setDate(today.getDate() + 1);
      return today.toISOString().split('T')[0];
  }


  if (loading) {
    return <div className="flex justify-center items-center h-64"><Spinner /></div>;
  }

  if (error) {
    return <Alert type="error" message={error} onRetry={refresh} />;
  }

  if (!doctor) {
    return <Alert type="warning" message="Doctor not found." />;
  }

  return (
    <div className="animate-fade-in">
      <Link to="/doctors" className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to Doctors
      </Link>
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img className="h-full w-full object-cover md:w-64" src={doctor.profilePictureUrl} alt={`Dr. ${doctor.name}`} />
          </div>
          <div className="p-8 flex-grow">
            <div className="uppercase tracking-wide text-sm text-primary-500 font-semibold">{doctor.specialty}</div>
            <h1 className="block mt-1 text-3xl leading-tight font-bold text-black dark:text-white">{doctor.name}</h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300">{doctor.biography}</p>
          </div>
        </div>
        <div className="p-8 border-t border-gray-200 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Available Appointments</h2>
                    <p className="text-md text-gray-600 dark:text-gray-400">{formattedDisplayDate}</p>
                </div>
                <div>
                    <label htmlFor="appointmentDate" className="sr-only">Choose date</label>
                    <input 
                        type="date"
                        id="appointmentDate"
                        value={formattedDateForStorage}
                        min={getMinDate()}
                        onChange={handleDateChange}
                        className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-gray-50 dark:bg-slate-700 focus:ring-primary-500 focus:border-primary-500"
                    />
                </div>
            </div>
            <div className="flex items-start bg-blue-50 dark:bg-slate-700/50 p-3 rounded-md mb-6 text-sm text-blue-700 dark:text-blue-300">
                <Info className="w-5 h-5 mr-2 flex-shrink-0"/>
                <span>For demonstration purposes, the same appointment slots are shown as available for every day. Booked slots on a selected day will be disabled.</span>
            </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {doctor.availableSlots.map(slot => {
              const isBooked = bookedSlots.has(slot);
              return (
                <button
                  key={slot}
                  onClick={() => handleBookClick(slot)}
                  disabled={isBooked}
                  className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors duration-200 ${
                    isBooked 
                      ? 'bg-gray-200 dark:bg-slate-700 text-gray-400 dark:text-slate-500 cursor-not-allowed line-through' 
                      : 'border-primary-500 text-primary-600 dark:text-primary-400 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500 dark:hover:text-white'
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {isModalOpen && selectedSlot && (
        <Modal title={`Book Appointment with ${doctor.name}`} onClose={() => setIsModalOpen(false)}>
          <AppointmentForm
            doctor={doctor}
            selectedTime={selectedSlot}
            selectedDate={selectedDate}
            onSuccess={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default DoctorDetail;