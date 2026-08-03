export interface Country {
  id: number;
  name: string;
}

export interface Subject {
  id: number;
  name: string;
}

export interface Role {
  id: number;
  name: string;
}

export interface ParticipationRequest {
  id: number;
  full_name: string;
  country: Country;
  role: Role;
  subject: Subject;
  email: string | null;
  whatsapp_number: string | null;
  additional_number: string | null;
  number_of_students: number;
  number_of_team_leaders: number;
  created_at: string;
  updated_at: string;
}

export interface TeamLeader {
  id: number;
  delegation: number;
  full_name: string;
  badge_name: string | null;
  date_of_birth: string | null;
  gender: string | null;
  passport_number: string | null;
  email: string;
  phone_number: string;
  role: string;
  t_shirt_size: string | null;
  food_type: string | null;
  dietary_requirements: string | null;
  passport_scan: string | null;
  id_photo: string | null;
  consent_form: string | null;
}

export interface Contestant {
  id: number;
  delegation: number;
  full_name: string;
  badge_name: string | null;
  date_of_birth: string;
  gender: string | null;
  competition_subject: string;
  passport_number: string;
  passport_expiry_date: string;
  t_shirt_size: string | null;
  food_type: string | null;
  dietary_requirements: string | null;
  special_requirements: string | null;
  passport_scan: string | null;
  id_photo: string | null;
  commitment_form: string | null;
  consent_form: string | null;
  parental_consent_form: string | null;
}

export interface Delegation {
  id: number;
  official_delegation_name: string;
  position: number;
  team_leaders: TeamLeader[];
  contestants: Contestant[];
}

export interface DetailedRegistration {
  id: number;
  country: Country;
  number_of_teams: number;
  confirm_information: boolean;
  agree_rules: boolean;
  delegations: Delegation[];
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface NewsGalleryImage {
  id: number;
  image: string;
  caption: string;
  sort_order: number;
  created_at: string;
}

export interface NewsArticle {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  main_image: string;
  gallery_images: NewsGalleryImage[];
  is_published: boolean;
  is_featured: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface MediaImage {
  id: number;
  image: string | null;
  image_url: string;
  external_url: string;
  title: string;
  alt_text: string;
  sort_order: number;
  created_at: string;
}

export interface MediaAlbum {
  id: number;
  title: string;
  description: string;
  external_url: string;
  external_url_label: string;
  is_published: boolean;
  sort_order: number;
  images: MediaImage[];
  created_at: string;
  updated_at: string;
}
