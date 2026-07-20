export interface FeatureItem {
  id: string;
  iconName: string; // Will map to a Lucide icon
  title: string;
  description: string;
}

export interface CompanyLogo {
  id: string;
  iconName: string;
  name: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
}

export interface ServiceItem {
  id: string;
  iconName: string;
  title: string;
  description: string;
}

export interface PropertyItem {
  id: string;
  title: string;
  location: string;
  image: string;
  specs: string;
  details: {
    price?: string;
    type: string;
    size: string;
    status: string;
  };
}

export interface InsightItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  category: string;
}
