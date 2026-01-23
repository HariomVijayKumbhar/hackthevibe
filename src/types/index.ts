export type AppRole = 'student' | 'admin';

export type ComplaintStatus = 'submitted' | 'in_review' | 'resolved';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: AppRole;
}

export interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
  created_at: string;
}

export interface Complaint {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  status: ComplaintStatus;
  student_id: string;
  created_at: string;
  updated_at: string;
  profiles?: Profile;
}

export interface CyberModule {
  id: string;
  title: string;
  description: string;
  content: string;
  icon: string;
  display_order: number;
  created_at: string;
}

export interface Progress {
  id: string;
  user_id: string;
  module_id: string;
  completed: boolean;
  completed_at: string | null;
  cyber_modules?: CyberModule;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}