import { Category, Product, StoreConfig } from '../types';

export const HERO_BANNER_IMAGE = '/src/assets/images/rosa_hero_banner_1786622277992.jpg';
export const BRAND_LOGO_IMAGE = '/src/assets/images/rosa_brand_logo_1786622288804.jpg';

export const DEFAULT_STORE_CONFIG: StoreConfig = {
  whatsappNumber: '966501234567', // Default shop WhatsApp number (can be edited by owner in settings)
  storeName: 'Rosa Accessories',
  currency: 'ر.س',
  instagramHandle: '@rosa_accessories',
  locationText: 'المملكة العربية السعودية - توصيل لكافة المناطق',
  announcementText: '✨ أهلاً بكم في متجر Rosa Accessories! اطلبي الآن وتواصلي معنا مباشرة عبر الواتساب ✨'
};

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'الكل', iconName: 'Sparkles' },
  { id: 'necklaces', name: 'قلادات وسلاسل', iconName: 'Gem' },
  { id: 'earrings', name: 'أقراط وحلقان', iconName: 'Sparkle' },
  { id: 'bracelets', name: 'أساور وبناجر', iconName: 'CircleDot' },
  { id: 'rings', name: 'خواتم أنيقة', iconName: 'Circle' },
  { id: 'sets', name: 'أطقم فاخرة', iconName: 'Crown' },
  { id: 'hair', name: 'إكسسوارات شعر', iconName: 'Scissors' },
  { id: 'bags', name: 'حقائب وسهرات', iconName: 'ShoppingBag' },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    code: 'ROSA-N01',
    title: 'قلادة الوردة الذهبية بمرصع الزركون',
    description: 'قلادة أنيقة مطلية بالذهب عيار 18 بتصميم وردة الجوري المرصعة بحبات الزركون البراق الناعم. مطلية بطلاء مقاوم للتغير ومناسبة للإهداء والمناسبات.',
    price: 135,
    originalPrice: 175,
    category: 'necklaces',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611591475170-438492d7736f?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    isBestSeller: true,
    material: 'معدن مطلي بالذهب عيار 18 وزركون نقي'
  },
  {
    id: 'prod-2',
    code: 'ROSA-E01',
    title: 'أقراط اللؤلؤ الملكية المرصعة',
    description: 'أقراط خفيفة الوزن بتصميم فاخر تجمع بين اللؤلؤ الطبيعي والزركون اللامع، تضفي لمسة ساحرة على إطلالتك في السهرات.',
    price: 95,
    originalPrice: 120,
    category: 'earrings',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    isNew: true,
    material: 'لؤلؤ زركون مطلي بالفضة Sterling'
  },
  {
    id: 'prod-3',
    code: 'ROSA-B01',
    title: 'سوار الفراشة المضيئة روز جولد',
    description: 'سوار روز جولد ناعم بتصميم الفراشات المتتالية. قابل للتعديل يناسب جميع مقاسات المعصم.',
    price: 110,
    category: 'bracelets',
    image: 'https://images.unsplash.com/photo-1611591475170-438492d7736f?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    isBestSeller: true,
    material: 'مطلي روز جولد ثابت اللون'
  },
  {
    id: 'prod-4',
    code: 'ROSA-R01',
    title: 'طقم خواتم الكريستال الناعمة (3 قطع)',
    description: 'مجموعة من 3 خواتم رفيعة يمكن ارتداؤها معاً أو منفردة. تتألق بلون فضي زركون كريستالي راقي.',
    price: 85,
    originalPrice: 110,
    category: 'rings',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    material: 'زركون وكريستال متين'
  },
  {
    id: 'prod-5',
    code: 'ROSA-S01',
    title: 'طقم سهرة روزا الفاخر الكامل (قلادة + أقراط + سوار)',
    description: 'طقم متكامل يتكون من قلادة طويلة، أقراط متدلية، وسوار مطابق مرصع بحبات الكريستال والزركون النقي. يأتيك داخل علبة مخملية فاخرة.',
    price: 290,
    originalPrice: 350,
    category: 'sets',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    isBestSeller: true,
    isNew: true,
    material: 'طقم كامل مطلي بالذهب الأبيض والزركون'
  },
  {
    id: 'prod-6',
    code: 'ROSA-H01',
    title: 'طوق شعر اللؤلؤ الذهبي للمناسبات',
    description: 'طوق شعر مغطى باللؤلؤ والكريستال الذهبي، مريح جداً أثناء الارتداء ويعطي مظهر أميري أنيق.',
    price: 75,
    category: 'hair',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    material: 'لؤلؤ اصطناعي فاخر وسلك مرن'
  },
  {
    id: 'prod-7',
    code: 'ROSA-N02',
    title: 'سلسلة القلب الكريستالي المزدوج',
    description: 'سلسلة طبقتين ناعمة بقلادة قلب مرصع بالزركون الوردي الناعم والهادئ.',
    price: 120,
    category: 'necklaces',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    isNew: true,
    material: 'تيتانيوم صلب مطلي بالذهب'
  },
  {
    id: 'prod-8',
    code: 'ROSA-BAG01',
    title: 'حقيبة كلاتش مرصعة بالكريستال الذهبي',
    description: 'حقيبة يد لسهرات والمناسبات بتصميم مميز مغطى بالكامل بالكريستال الذهبي مع حبل كتف معدني أنيق.',
    price: 210,
    originalPrice: 260,
    category: 'bags',
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    isBestSeller: true,
    material: 'ستان مرصع وحزام معدني ذهبي'
  },
  {
    id: 'prod-9',
    code: 'ROSA-E02',
    title: 'أقراط حلقة الجوانب الذهبية البسيطة',
    description: 'أقراط هووبس دائرية مطلية بلون ذهبي دافئ خفيفة اليومية والاستخدام الذاتي.',
    price: 65,
    category: 'earrings',
    image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    material: 'ستانلس ستيل مطلي'
  },
  {
    id: 'prod-10',
    code: 'ROSA-B02',
    title: 'بناجر ذهبية منقوشة (طقم قطعتين)',
    description: 'بنجرتين عريضتين بنقوش إسلامية وعصرية متقنة تناسب الأعياد والمناسبات السعيدة.',
    price: 160,
    originalPrice: 195,
    category: 'bracelets',
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    material: 'نحاس مطلي بماء الذهب'
  }
];
