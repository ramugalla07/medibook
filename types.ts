export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  biography: string;
  profilePictureUrl: string;
  availableSlots: string[];
}

export interface Appointment {
  id: string;
  doctor: Doctor;
  patientName: string;
  appointmentTime: string;
  appointmentDate: string; // Changed from bookingDate
  reason: string;
}