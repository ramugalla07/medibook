import React from 'react';
import { Link } from 'react-router-dom';
import { Doctor } from '../types';
import { ArrowRight } from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 transform hover:-translate-y-1 transition-transform duration-300 flex flex-col items-center text-center h-full">
      <img className="h-32 w-32 rounded-full object-cover border-4 border-primary-200 dark:border-primary-700 mb-4" src={doctor.profilePictureUrl} alt={`Dr. ${doctor.name}`} />
      <div className="flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">{doctor.name}</h3>
        <p className="text-primary-600 dark:text-primary-400 font-semibold mt-1">{doctor.specialty}</p>
        <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm flex-grow">{doctor.biography}</p>
        <Link 
          to={`/doctors/${doctor.id}`} 
          className="mt-6 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          View Profile & Book
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;