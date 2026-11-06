import { MedicalCase, SpecialistDoctor, SpecialtyItem, PlatformAnalytics } from '../types';

export const platformAnalyticsData: PlatformAnalytics = {
  totalDoctors: 1420,
  verifiedDoctors: 980,
  activeSpecialties: 12,
  totalReferrals: 348,
  completedReferrals: 284,
  successRate: 98.4,
  avgResponseTimeMin: 18,
};

export const specialtiesList: SpecialtyItem[] = [
  { id: 'dentistry', name: 'Dentistry', arabicName: 'طب وجراحة الأسنان', icon: 'medical', count: 480 },
  { id: 'cardiology', name: 'Cardiology', arabicName: 'أمراض القلب والأوعية', icon: 'heart', count: 185 },
  { id: 'orthopedics', name: 'Orthopedics', arabicName: 'جراحة العظام والمفاصل', icon: 'fitness', count: 210 },
  { id: 'pediatrics', name: 'Pediatrics', arabicName: 'طب الأطفال والولادة', icon: 'happy', count: 165 },
  { id: 'internal', name: 'Internal Medicine', arabicName: 'الباطنة العامة والجهاز الهضمي', icon: 'pulse', count: 230 },
  { id: 'neurology', name: 'Neurology', arabicName: 'المخ والأعصاب', icon: 'git-network', count: 95 },
  { id: 'dermatology', name: 'Dermatology', arabicName: 'الجلدية والتجميل', icon: 'sparkles', count: 140 },
  { id: 'surgery', name: 'General Surgery', arabicName: 'الجراحة العامة والمناظير', icon: 'cut', count: 115 },
  { id: 'ophthalmology', name: 'Ophthalmology', arabicName: 'طب وجراحة العيون', icon: 'eye', count: 88 },
];

export const mockDoctorProfile: SpecialistDoctor = {
  id: 'dr_ahmed_medshare',
  name: 'Dr. Ahmed El-Sherif',
  title: 'Consultant Endodontist & Microscopic Surgery',
  specialty: 'Dentistry',
  specialties: [
    'Microscopic Root Canal Retreatment',
    'Separated Instrument Bypass/Removal',
    'Apicoectomy & Perforation Repair',
    'CBCT 3D Endodontic Imaging',
  ],
  subSpecialties: [
    'Microscopic Root Canal Retreatment',
    'Separated Instrument Bypass/Removal',
    'Apicoectomy & Perforation Repair',
    'CBCT 3D Endodontic Imaging',
  ],
  hospital: 'Al-Safwa Medical Center',
  city: 'Cairo / Heliopolis',
  avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400',
  rating: 4.95,
  reviewsCount: 142,
  distanceKm: 3.2,
  yearsExp: 11,
  casesCompleted: 386,
  avgResponseMin: 15,
  isVerified: true,
  acceptsReferrals: true,
  languages: ['Arabic', 'English'],
};

export const sampleCaseDM10254: MedicalCase = {
  id: 'MS-8924',
  patientCode: 'PT-9402',
  patientAge: 38,
  patientGender: 'Male',
  specialtyId: 'dentistry',
  specialtyName: 'Dentistry / Endodontics',
  chiefComplaint: 'Separated Instrument & Persistent Apical Pathology',
  clinicalFindings:
    'Patient referred with broken rotary NiTi file (#25/.06) at apical third of mesiobuccal canal (Tooth 46). Moderate sensitivity on vertical percussion. Asymptomatic soft tissue.',
  toothNumber: 46,
  urgency: 'Urgent',
  referralType: 'Direct',
  status: 'In Progress',
  createdAt: '05 Nov 2026 - 11:20 AM',
  referringDoctor: {
    id: 'dr_abdelrahman',
    name: 'Dr. Abdelrahman Mostafa',
    title: 'General Dental Practitioner',
    city: 'Nasr City, Cairo',
  },
  specialistDoctor: {
    id: 'dr_ahmed_medshare',
    name: 'Dr. Ahmed El-Sherif',
    title: 'Consultant Endodontist',
    hospital: 'Al-Safwa Medical Center',
  },
  files: [
    { type: 'xray', name: 'Pre-op Periapical Radiograph.png', size: '2.4 MB' },
    { type: 'ct', name: 'Mandibular High-Res CBCT.dicom', size: '42.8 MB' },
    { type: 'photo', name: 'Clinical Microscope Photo MB Canal.jpg', size: '3.1 MB' },
  ],
  treatmentReport: {
    date: '05 Nov 2026 - 02:30 PM',
    procedure: 'Ultrasonic troughing (E6 tip) under 16x dental magnification. Separated instrument retrieved intact.',
    toolsUsed: ['Zeiss Extaro Microscope', 'EDTA 17% chelation', 'Continuous NaOCl 5.25% irrigation'],
    notes: 'Working length confirmed via electronic apex locator. Canals patent and sealed with bioceramic sealer.',
    nextSteps: ['Core build-up', 'Full coronal coverage (Zirconia Crown)'],
    attachedFiles: ['Post-Op Retrieval Radiograph.png', 'Canal Orifice Cleared.jpg'],
  },
};
