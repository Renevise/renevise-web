
export interface CaseStudy {
  _id: string;
  title: string;
  client: string;
  problem?: string;
  solution?: string;
  tech?: string[];
  result?: string;
  image?: any;
  slug?: string;
  serviceTitle?: string;
  serviceSlug?: string;
  details?: any[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface Service {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  tagline?: string;
  problemsSolved?: string[];
  outcomes?: string[];
  image?: any;
  details?: any[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

export interface NavService {
  title: string;
  slug: { current: string };
}
