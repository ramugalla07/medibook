
import React, { useState, useMemo } from 'react';
import { useDoctors } from '../hooks/useDoctors';
import DoctorCard from '../components/DoctorCard';
import Spinner from '../components/common/Spinner';
import Alert from '../components/common/Alert';
import { Search } from 'lucide-react';

const DoctorList: React.FC = () => {
  const { doctors, loading, error, refresh } = useDoctors();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  const specialties = useMemo(() => {
    const allSpecialties = new Set(doctors.map(doc => doc.specialty));
    return ['All', ...Array.from(allSpecialties).sort()];
  }, [doctors]);

  const filteredDoctors = useMemo(() => {
    return doctors.filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialty = selectedSpecialty === 'All' || doctor.specialty === selectedSpecialty;
      return matchesSearch && matchesSpecialty;
    });
  }, [doctors, searchTerm, selectedSpecialty]);

  if (loading) {
    return <div className="flex justify-center items-center h-64"><Spinner /></div>;
  }

  if (error) {
    return <Alert type="error" message={error} onRetry={refresh} />;
  }

  return (
    <div className="animate-fade-in">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Find Your Doctor</h1>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-gray-50 dark:bg-slate-700 focus:ring-primary-500 focus:border-primary-500"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          <div>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-gray-50 dark:bg-slate-700 focus:ring-primary-500 focus:border-primary-500"
            >
              {specialties.map(spec => <option key={spec} value={spec}>{spec}</option>)}
            </select>
          </div>
        </div>
      </div>

      {filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map(doctor => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">No Doctors Found</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default DoctorList;
