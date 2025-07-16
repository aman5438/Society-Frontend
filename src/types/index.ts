
export interface User {
  name: string;
  email: string;
}

export interface SignupRequest {
  id: string | number;
  user: User;
  flatNumber: string;
  role: string;
  documents: File[];
}

export interface SignupFormData {
  society: string;
  fullname: string;
  email: string;
  password: string;
  phone: string;
  flat: string;
  role: 'FLAT_OWNER' | 'TENANT';
}

export interface FlatResponse {
  id: number;
  flatNumber: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SubSociety {
  id: number;
  name: string;
}

export interface SocietyResponse {
  id: number;
  societyCode: string;
  subSocieties: SubSociety[];
}


export interface Flat {
  flatNumber: string;
  type: string;
  status: string;
  society: {
    name: string;
    societyCode: string;
  };
};

export interface TenantUser {
  name: string;
  email: string;
  phone: string;
};