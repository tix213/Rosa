export type CategoryType = 
  | 'all'
  | 'women-handbags' 
  | 'women-crossbody' 
  | 'evening-bags' 
  | 'kids-bags' 
  | 'backpacks';

export interface Category {
  id: CategoryType;
  name: string;
  iconName: string;
}

export interface ProductColorVariant {
  name: string;       // اسم اللون (مثل: وردي ناعم، بيج نيود، أسود ملكي)
  colorCode: string;  // رمز اللون للعرض مثل #F472B6, #E5C49A, #18181B
  image: string;      // الصورة الخاصة بهذا اللون
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: CategoryType;
  image: string;
  colors?: ProductColorVariant[]; // ألوان المنتج مع صورها المخصصة
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
  selectedColor?: string; // اللون الذي اختارته الزبونة
}

export interface StoreConfig {
  whatsappNumber: string;
  storeName: string;
  currency: string;
  instagramHandle?: string;
  locationText?: string;
  announcementText?: string;
}
