export type CategoryType = 
  | 'all'
  | 'necklaces' 
  | 'earrings' 
  | 'bracelets' 
  | 'rings' 
  | 'sets' 
  | 'hair' 
  | 'bags';

export interface Category {
  id: CategoryType;
  name: string;
  iconName: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: CategoryType;
  image: string;
  gallery?: string[];
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  material?: string;
  code?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface StoreConfig {
  whatsappNumber: string;
  storeName: string;
  currency: string;
  instagramHandle?: string;
  locationText?: string;
  announcementText?: string;
}
