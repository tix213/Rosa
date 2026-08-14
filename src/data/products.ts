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
  { id: 'women-handbags', name: 'حقائب يد وكتف كلاسيكية', iconName: 'ShoppingBag' },
  { id: 'backpacks', name: 'حقائب ظهر ورياضية (Sacs à dos)', iconName: 'Compass' },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'bag-hermes-blue-set',
    code: 'ROSA-HR-SET01',
    title: 'طقم حقيبة هيرميس الفاخرة باللون الأزرق الملكي (حقيبة + حزام جلد + علبة أصلية)',
    description: 'طقم متكامل وفائق الفخامة من العلامة الراقية هيرميس باللون الأزرق الملكي الجذاب. يحتوي على حقيبة يد كلاسيكية فاخرة بقفل ذهبي ومفاتيح، حزام خصر جلدي أنيق بإبزيم H الذهبي، تعليقة الحصان الجلدية المميزة، وحزام كتف طويل، تأتي داخل علبة هيرميس البرتقالية الفخمة.',
    price: 5000,
    originalPrice: 6500,
    category: 'women-handbags',
    image: '/src/assets/images/hermes_blue_set_1786680461964.jpg',
    gallery: [
      '/src/assets/images/hermes_blue_set_1786680461964.jpg'
    ],
    inStock: true,
    isNew: true,
    isBestSeller: true,
    material: 'جلد طبيعي فاخر مستورد + إكسسوارات ذهبية مختومة + علبة هدايا كاملة'
  },
  {
    id: 'bag-gucci-mini-ophidia',
    code: 'ROSA-GC-01',
    title: 'حقيبة كتف غوتشي ميني بنقشة المونوغرام الفاخرة وسلسال ذهبي (Gucci)',
    description: 'حقيبة كتف ويد ميني راقية من ماركة غوتشي العالمية بنقشة GG الأيقونية الكلاسيكية وحواف جلدية بنية فاخرة. تتميز بشعار GG الذهبي وسلسال كتف ذهبي أنيق مع مساحة ممتازة لحمل الهاتف، النقود، وأدوات التجميل.',
    price: 3500,
    originalPrice: 4600,
    category: 'women-handbags',
    image: '/src/assets/images/gucci_mini_bag_1786680473233.jpg',
    gallery: [
      '/src/assets/images/gucci_mini_bag_1786680473233.jpg'
    ],
    inStock: true,
    isNew: true,
    isBestSeller: true,
    material: 'كانفاس عالي الجودة مع جلد متين وسلسال معدني ذهبي غير قابل لتغير اللون'
  },
  {
    id: 'bag-nike-backpack-black',
    code: 'ROSA-NK-01',
    title: 'حقيبة ظهر نايكي الرياضية الأصلية مع مقلمة ملحقة (Nike Backpack)',
    description: 'حقيبة ظهر عملية وأنيقة من نايكي باللون الأسود الكلاسيكي وشعار Nike الأبيض المميز. ممتازة للجامعة، المدرسة، الجيم، والسفر، مزودة بجيوب داخلية وخارجية متعددة ومقلمة برتقالية ملحقة، مع أحزمة أكتاف مبطنة ومريحة.',
    price: 2000,
    originalPrice: 2800,
    category: 'backpacks',
    image: '/src/assets/images/nike_black_backpack_1786680488848.jpg',
    gallery: [
      '/src/assets/images/nike_black_backpack_1786680488848.jpg'
    ],
    inStock: true,
    isNew: true,
    isBestSeller: true,
    material: 'قماش أوكسفورد بوليستر مقاوم للمياه والتمزق مع سحابات متينة'
  },
  {
    id: 'bag-hurmes-classic',
    code: 'ROSA-HURMES-01',
    title: 'حقيبة يد كلاسيكية فاخرة ماركة Hurmes بلون بيج نيود (مستوردة)',
    description: 'حقيبة يد كلاسيكية فاخرة وأنيقة مستوردة بأعلى معايير الجودة من العلامة الشهيرة Hurmes. تتميز بتصميم بيج نيود راقي، خامة جلدية متينة مقاومة للخدش، مساحة داخلية رحبة ومنظمة مع سحاب معدني أنيق ومقابض يد مزدوجة مريحة بالإضافة إلى حزام كتف قابل للتعديل.',
    price: 3200,
    originalPrice: 4200,
    category: 'women-handbags',
    image: '/src/assets/images/hermes_classic_bag_1786678118984.jpg',
    gallery: [
      '/src/assets/images/hermes_classic_bag_1786678118984.jpg'
    ],
    inStock: true,
    isNew: true,
    isBestSeller: true,
    material: 'جلد فاخر مستورد عالي الجودة مع إكسسوارات معدنية ذهبية أصلية'
  }
];

