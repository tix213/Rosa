import { Category, Product, StoreConfig } from '../types';

export const HERO_BANNER_IMAGE = '/src/assets/images/rosa_hero_banner_1786622277992.jpg';
export const BRAND_LOGO_IMAGE = '/src/assets/images/rosa_brand_logo_1786622288804.jpg';

export const DEFAULT_STORE_CONFIG: StoreConfig = {
  whatsappNumber: '213561001185', // رقم الواتساب الخاص بالمتجر في الجزائر (+213561001185)
  storeName: 'Rosa Bags - حقائب روزا',
  currency: 'د.ج', // الدينار الجزائري DA
  instagramHandle: '@rosa_bags_dz',
  locationText: 'الجزائر - توصيل متوفر وسريع لكافة ولايات الجزائر (58 ولاية)',
  announcementText: '👜 مرحباً بكم في متجر Rosa للحقائب بالجزائر! نوفر لكم أروع الحقائب النسائية وحقائب الأطفال مع توصيل سريع لجميع الولايات 58 والدفع عند الاستلام 🇩🇿'
};

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'جميع المعروضات', iconName: 'Sparkles' },
  { id: 'women-handbags', name: 'Classic Handbags (حقائب كلاسيكية)', iconName: 'ShoppingBag' },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'bag-hurmes-classic',
    code: 'ROSA-HURMES-01',
    title: 'حقيبة يد كلاسيكية فاخرة ماركة Hurmes (مستوردة بجودة عالية)',
    description: 'حقيبة يد كلاسيكية فاخرة وأنيقة مستوردة بأعلى معايير الجودة من العلامة الشهيرة Hurmes. تتميز بتصميم بيج نيود راقي، خامة جلدية متينة مقاومة للخدش، مساحة داخلية رحبة ومنظمة مع سحاب معدني أنيق ومقابض يد مزدوجة مريحة بالإضافة إلى حزام كتف قابل للتعديل. قطعة مميزة تجمع بين الفخامة والعملية لتكمل إطلالتك في كافة المشاوير والمناسبات.',
    price: 3200,
    originalPrice: 4200,
    category: 'women-handbags',
    image: '/src/assets/images/hermes_classic_bag_1786678118984.jpg',
    gallery: [
      '/src/assets/images/hermes_classic_bag_1786678118984.jpg',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    isNew: true,
    isBestSeller: true,
    material: 'جلد فاخر مستورد عالي الجودة مع إكسسوارات معدنية ذهبية أصلية'
  }
];

