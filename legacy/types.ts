
export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  status: 'Novo' | 'Disponível' | 'Esgotado' | 'Top Vendas';
  brand: string;
  specs: string[];
}

export interface Inquiry {
  id: string;
  date: string;
  client: string;
  location: string;
  product: string;
  status: 'New' | 'Contacted' | 'Proposal Sent';
  initials: string;
}

export enum Page {
  Home = 'home',
  About = 'about',
  Catalog = 'catalog',
  Backoffice = 'backoffice',
  HumanResources = 'hr',
  CleanEnergy = 'clean-energy',
  Contact = 'contact',
  Support247 = 'support-247',
  Terms = 'terms',
  Privacy = 'privacy'
}
