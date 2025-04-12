import { Shift } from '@/components/shifts';

// Mock data for available shifts
export const mockShifts: Shift[] = [
  {
    id: '1',
    role: 'Registered Nurse RN - Long Term Care',
    roleType: 'RN',
    location: 'Rocky Mtn Care of Heber - the Lodge Heber City Utah',
    date: 'Jun 9',
    time: '8 AM - 5 PM',
    hourlyRate: 400,
    distance: 3.4,
    longTerm: false,
    isFavorite: false
  },
  {
    id: '2',
    role: 'Registered Nurse RN - Long Term Care',
    roleType: 'CNA',
    location: 'Rocky Mtn Care of Heber - the Lodge Heber City Utah',
    date: 'Jun 9',
    time: '8 AM - 5 PM',
    hourlyRate: 400,
    distance: 3.4,
    longTerm: true,
    isFavorite: true
  },
  {
    id: '3',
    role: 'Licensed Practical Nurse - Rehabilitation',
    roleType: 'LPN',
    location: 'Aspen Ridge Rehabilitation Center, Utah',
    date: 'Jun 10',
    time: '7 AM - 3 PM',
    hourlyRate: 350,
    distance: 5.2,
    longTerm: false,
    isFavorite: false
  },
  {
    id: '4',
    role: 'Certified Nursing Assistant - Senior Care',
    roleType: 'CNA',
    location: 'Sunrise Senior Living, Salt Lake City',
    date: 'Jun 11',
    time: '3 PM - 11 PM',
    hourlyRate: 280,
    distance: 7.1,
    longTerm: true,
    isFavorite: false
  },
  {
    id: '5',
    role: 'Registered Nurse RN - Emergency Department',
    roleType: 'RN',
    location: 'University Medical Center, Salt Lake City',
    date: 'Jun 12',
    time: '7 PM - 7 AM',
    hourlyRate: 450,
    distance: 8.5,
    longTerm: false,
    isFavorite: false
  },
  {
    id: '6',
    role: 'Home Health Aide - Elderly Care',
    roleType: 'OTHER',
    location: 'Visiting Angels, Park City',
    date: 'Jun 13',
    time: '9 AM - 5 PM',
    hourlyRate: 250,
    distance: 10.2,
    longTerm: true,
    isFavorite: false
  },
  {
    id: '7',
    role: 'Certified Nursing Assistant - Pediatrics',
    roleType: 'CNA',
    location: 'Primary Children\'s Hospital, Salt Lake City',
    date: 'Jun 14',
    time: '10 AM - 6 PM',
    hourlyRate: 300,
    distance: 12.3,
    longTerm: false,
    isFavorite: false
  }
]; 