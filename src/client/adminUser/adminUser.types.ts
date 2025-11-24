export interface CreateAdminUserData {
  email: string;
  password?: string;
  fullName?: string;
  role: 'ADMIN' | 'SUPERADMIN';
  addedBy?: string;
}

export interface AdminUserResponse {
  id: string;
  email: string;
  fullName?: string | null;
  role: 'ADMIN' | 'SUPERADMIN';
  addedBy?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddAdminUserData {
  email: string;
  role: 'ADMIN' | 'SUPERADMIN';
  addedBy?: string;
}

export interface RegisterAdminData {
  email: string;
  password: string;
  fullName: string;
}

export interface LoginAdminData {
  email: string;
  password: string;
}