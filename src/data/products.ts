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
  { id: 'all', name: 'جميع الحقائب', iconName: 'Sparkles' },
  { id: 'women-handbags', name: 'حقائب يد وكتف نسائية', iconName: 'ShoppingBag' },
  { id: 'evening-bags', name: 'حقائب سهرات ومناسبات', iconName: 'Sparkle' },
  { id: 'backpacks', name: 'حقائب ظهر نسائية (Sac à dos)', iconName: 'Compass' },
  { id: 'kids-bags', name: 'حقائب أطفال ومدرسية', iconName: 'Heart' },
  { id: 'crossbody', name: 'حقائب كروس وتوت يومية', iconName: 'Tag' },
  { id: 'wallets', name: 'محافظ وحقائب صغيرة', iconName: 'CreditCard' },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'bag-1',
    code: 'ROSA-HB01',
    title: 'حقيبة يد نسائية كلاسيكية فاخرة من الجلد الإيطالي',
    description: 'حقيبة يد وكتف أنيقة مصنوعة من أجود أنواع الجلد المقاوم للخدوش والماء. مزودة بحزام كتف قابل للإزالة وتفاصيل معدنية ذهبية تضفي فخامة استثنائية على إطلالتك اليومية والرسمية.',
    price: 3800,
    originalPrice: 4600,
    category: 'women-handbags',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    isBestSeller: true,
    material: 'جلد مبطن ممتاز مع إكسسوارات ذهبية غير قابلة للصدأ'
  },
  {
    id: 'bag-2',
    code: 'ROSA-EV01',
    title: 'حقيبة كلاتش سهرات كريستالية فاخرة (Pochette de Soirée)',
    description: 'حقيبة يد للسهرات والمناسبات السعيدة والأعراس، مرصعة بالكامل بحبات الكريستال البراقة مع قفل معدني أنيق وحبل كتف سلسال ذهبي راقي.',
    price: 3200,
    originalPrice: 3900,
    category: 'evening-bags',
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    isNew: true,
    isBestSeller: true,
    material: 'ساتان فاخر مرصع بالكريستال اللامع'
  },
  {
    id: 'bag-3',
    code: 'ROSA-KD01',
    title: 'حقيبة ظهر للأطفال بتصميم الأرنب الكيوت ثلاثي الأبعاد',
    description: 'حقيبة ظهر مبهجة للأطفال والخرجات والروضة، خفيفة الوزن ومريحة للظهر مع أحزمة مبطنة وقماش مقاوم للمياه وسحابات ناعمة وسهلة الاستخدام.',
    price: 2400,
    originalPrice: 2900,
    category: 'kids-bags',
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    isBestSeller: true,
    material: 'بوليستر آمن وعالي الجودة مقاوم للماء والتلف'
  },
  {
    id: 'bag-4',
    code: 'ROSA-BP01',
    title: 'حقيبة ظهر نسائية عصرية من الجلد الناعم (Sac à dos Élégant)',
    description: 'حقيبة ظهر عملية وأنيقة جداً للجامعة والعمل والخرجات اليومية، تتسع لأجهزة التابلت والمستلزمات مع جيوب متعددة وسحاب أمان خلفي ضد السرقة.',
    price: 3600,
    originalPrice: 4200,
    category: 'backpacks',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    isNew: true,
    material: 'جلد اصطناعي PU مقاوم للماء وناعم الملمس'
  },
  {
    id: 'bag-5',
    code: 'ROSA-CB01',
    title: 'حقيبة كروس بودي شيك بنقشة المونوغرام الفاخرة',
    description: 'حقيبة كروس نسائية صغيرة الحجم لكنها رحبة من الداخل، حزام عريض مريح قابل للتعديل ومناسبة لجميع التنسيقات الصيفية والشتوية.',
    price: 2800,
    originalPrice: 3400,
    category: 'crossbody',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    material: 'جلد منقوش فاخر مع إبزيم معدني جذاب'
  },
  {
    id: 'bag-6',
    code: 'ROSA-KD02',
    title: 'طقم حقيبة مدرسية للأطفال (حقيبة ظهر + مقلمة + حقيبة طعام)',
    description: 'مجموعة متكاملة ومقاومة للأوزان المدرسية بتصاميم كرتونية جميلة ومميزة للأولاد والبنات مع تقويم طبي مريح لظهر الطفل.',
    price: 4500,
    originalPrice: 5300,
    category: 'kids-bags',
    image: 'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    isNew: true,
    material: 'أقمشة أوكسفورد الطبية المتينة المقاومة للأتربة والماء'
  },
  {
    id: 'bag-7',
    code: 'ROSA-HB02',
    title: 'حقيبة توت باغ (Tote Bag) نسائية كبيرة للعمل والتسوق',
    description: 'حقيبة تسوق وعمل واسعة وعصرية تتسع للابتوب والمجلدات ومستلزمات اليوم بالكامل مع محفظة صغيرة مرفقة هدية.',
    price: 3400,
    originalPrice: 3950,
    category: 'women-handbags',
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    material: 'جلد صناعي مقوى وخياطة مزدوجة متينة'
  },
  {
    id: 'bag-8',
    code: 'ROSA-WL01',
    title: 'محفظة نسائية فاخرة متعددة البطاقات بسحاب مزدوج',
    description: 'محفظة يد أنيقة وصغيرة لحمل النقود، البطاقات البنكية، والهاتف الذكي مع حبل معصم جلدي أنيق.',
    price: 1600,
    originalPrice: 2100,
    category: 'wallets',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    isBestSeller: true,
    material: 'جلد ناعم بتقنية حماية البطاقات RFID'
  },
  {
    id: 'bag-9',
    code: 'ROSA-EV02',
    title: 'حقيبة يد سهرة حريرية مرصعة باللؤلؤ الفاخر',
    description: 'تحفة فنية للأفراح والمناسبات الراقية مرصعة بلآلئ متناسقة ومقبض يد لؤلؤي ساحر.',
    price: 3500,
    originalPrice: 4200,
    category: 'evening-bags',
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    material: 'ساتان ولؤلؤ طبيعي صناعي مع مقبض مجوهرات'
  }
];
