// MEDSHARE Global Medical Collaboration Platform Types

export type UrgencyLevel = 'Normal' | 'Urgent' | 'Emergency';

export type CaseStatus = 
  | 'Draft'
  | 'Sent'
  | 'Under Review'
  | 'Accepted'
  | 'Appointment'
  | 'In Progress'
  | 'Completed'
  | 'Returned'
  | 'Cancelled';

export type ReferralType = 'Direct' | 'Public' | 'Assisted' | 'PrivateRecord';

export type UserRole = 
  | 'Doctor'
  | 'Specialist'
  | 'Student'
  | 'Intern'
  | 'Mentor'
  | 'Admin';

export interface SpecialtyItem {
  id: string;
  name: string;
  arabicName: string;
  icon: string;
  count?: number;
}

export interface MedicalCase {
  id: string;
  patientCode: string; // Anonymous code (e.g. PT-8402) to protect privacy
  patientAge: number;
  patientGender: 'Male' | 'Female';
  specialtyId: string;
  specialtyName: string;
  chiefComplaint: string;
  clinicalFindings: string;
  toothNumber?: number; // Optional for dental cases
  urgency: UrgencyLevel;
  referralType: ReferralType;
  status: CaseStatus;
  createdAt: string;
  referringDoctor: {
    id: string;
    name: string;
    title: string;
    avatarUrl?: string;
    city: string;
  };
  specialistDoctor?: {
    id: string;
    name: string;
    title: string;
    avatarUrl?: string;
    hospital: string;
  };
  files: {
    type: 'xray' | 'mri' | 'ct' | 'lab' | 'photo' | 'other';
    name: string;
    size?: string;
    uri?: string;
  }[];
  treatmentReport?: {
    date: string;
    procedure: string;
    toolsUsed: string[];
    notes: string;
    nextSteps: string[];
    attachedFiles: string[];
  };
}

// Backwards-compatible alias for existing dental components
export type DentalCase = MedicalCase;

export interface SpecialistDoctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  subSpecialties: string[];
  hospital: string;
  city: string;
  avatarUrl: string;
  rating: number;
  reviewsCount: number;
  distanceKm: number;
  yearsExp: number;
  casesCompleted: number;
  avgResponseMin: number;
  isVerified: boolean;
  acceptsReferrals: boolean;
  languages: string[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isDoctor: boolean;
  attachmentName?: string;
}

export interface PlatformAnalytics {
  totalDoctors: number;
  verifiedDoctors: number;
  activeSpecialties: number;
  totalReferrals: number;
  completedReferrals: number;
  successRate: number;
  avgResponseTimeMin: number;
}
