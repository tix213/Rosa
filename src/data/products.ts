import { Category, Product, StoreConfig } from '../types';

import heroBannerImg from '../assets/images/rosa_pink_hero_banner_1786703954849.jpg';
import brandLogoImg from '../assets/images/rosa_brand_logo_1786622288804.jpg';
import hermesBlueSetImg from '../assets/images/hermes_blue_set_1786680461964.jpg';
import gucciMiniImg from '../assets/images/gucci_mini_bag_1786680473233.jpg';
import emeraldBagImg from '../assets/images/women_crossbody_emerald_1786701731170.jpg';
import eveningClutchImg from '../assets/images/evening_glitter_clutch_1786701714601.jpg';
import hermesClassicImg from '../assets/images/hermes_classic_bag_1786678118984.jpg';
import hermesPinkImg from '../assets/images/hermes_pink_bag_1786703967388.jpg';
import hermesBlackImg from '../assets/images/hermes_black_bag_1786703978700.jpg';
import kidsBunnyPinkImg from '../assets/images/kids_backpack_pink_1786701703330.jpg';
import kidsBunnyPurpleImg from '../assets/images/kids_backpack_purple_1786703988753.jpg';
import kidsDinoBlueImg from '../assets/images/kids_dino_backpack_1786701742115.jpg';
import nikeBackpackImg from '../assets/images/nike_black_backpack_1786680488848.jpg';
import cats1 from '../assets/images/20260814_114804.jpg';
import cats2 from '../assets/images/20260814_114815.jpg';
import cats3 from '..src/assets/images/20260814_114756.jpg';
export const HERO_BANNER_IMAGE = heroBannerImg;
export const BRAND_LOGO_IMAGE = brandLogoImg;

export const DEFAULT_STORE_CONFIG: StoreConfig = {
  whatsappNumber: '213561001185', // رقم الواتساب المباشر للطلب (+213561001185)
  storeName: 'Rosa Bags - بوتيك روزا للحقائب',
  currency: 'د.ج', // الدينار الجزائري DA
  instagramHandle: '@rosa_bags_dz',
  locationText: 'الجزائر 🇩🇿 - توصيل سريع لكافة الـ 58 ولاية والدفع عند الاستلام',
  announcementText: '🌸 مرحباً بكم في بوتيك Rosa للحقائب بالجزائر! نوفر لكم أروع تشكيلات الحقائب النسائية وحقائب الأطفال مع خيارات ألوان متعددة وشحن سريع لكافة الـ 58 ولاية 🇩🇿💕'
};

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'جميع الحقائب المعروضة', iconName: 'Sparkles' },
  { id: 'women-handbags', name: 'حقائب يد نسائية كلاسيكية', iconName: 'ShoppingBag' },
  { id: 'women-crossbody', name: 'حقائب كتف وكروس بودي', iconName: 'Layers' },
  { id: 'evening-bags', name: 'حقائب سهرات وكلاتش فاخر', iconName: 'Sparkles' },
  { id: 'kids-bags', name: 'حقائب أطفال ومدرسية (Kids)', iconName: 'Heart' },
  { id: 'backpacks', name: 'حقائب ظهر ورياضية (Sacs à dos)', iconName: 'Compass' },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'bag-hurmes-classic',
    code: 'ROSA-HB-01',
    title: 'حقيبة يد كلاسيكية فاخرة بألوان متعددة (وردي ناعم / بيج نيود / أسود ملكي)',
    description: 'حقيبة يد نسائية كلاسيكية فاخرة وأنيقة مستوردة بأعلى معايير الجودة والتفصيل المتقن. متوفرة بعدة ألوان ساحرة تناسب إطلالتك اليومية والمناسبات الراقية مع خامة جلدية مقاومة للخدش وقفل ذهبي أنيق ومقابض يد متينة بالإضافة إلى حزام كتف قابل للتعديل.',
    price: 3200,
    originalPrice: 4200,
    category: 'women-handbags',
    image: cats1,
    colors: [
      { name: 'وردي ناعم (Soft Rose)', colorCode: '#F472B6', image: cats1},
      { name: 'بيج نيود (Nude Beige)', colorCode: '#D8B48D', image: cats2},
      { name: 'أسود ملكي (Royal Black)', colorCode: '#18181B', image: cats3 }
    ],
    gallery: [
      cats1,
      cats2,
      cats3
    ],
    inStock: true,
    isNew: true,
    isBestSeller: true,
    material: 'جلد فاخر مستورد عالي الجودة مع إكسسوارات معدنية ذهبية أصلية وقفل محكم'
  },
  {
    id: 'bag-hermes-blue-set',
    code: 'ROSA-HR-01',
    title: 'طقم حقيبة هيرميس الفاخرة بالأزرق الملكي (حقيبة + حزام جلد + علبة أصلية)',
    description: 'طقم متكامل وفائق الفخامة من العلامة الراقية هيرميس باللون الأزرق الملكي الجذاب. يحتوي على حقيبة يد كلاسيكية فاخرة بقفل ذهبي ومفاتيح، حزام خصر جلدي أنيق بإبزيم H الذهبي، تعليقة الحصان الجلدية المميزة، وحزام كتف طويل، تأتي داخل علبة هيرميس البرتقالية الفخمة.',
    price: 5000,
    originalPrice: 6500,
    category: 'women-handbags',
    image: hermesBlueSetImg,
    colors: [
      { name: 'أزرق ملكي (Royal Blue)', colorCode: '#1E3A8A', image: hermesBlueSetImg }
    ],
    gallery: [
      hermesBlueSetImg
    ],
    inStock: true,
    isNew: true,
    isBestSeller: true,
    material: 'جلد طبيعي فاخر مستورد + إكسسوارات ذهبية مختومة + علبة هدايا كاملة'
  },
  {
    id: 'bag-kids-bunny-multicolor',
    code: 'ROSA-KD-01',
    title: 'حقيبة ظهر أطفال بناتية بأذني أرنب كيوت (متوفرة بالوردي والبنفسجي اللافندر)',
    description: 'حقيبة ظهر ناعمة ومحبوبة جداً للبنات الصغيرات بتصميم أذني أرنب ثلاثية الأبعاد جذابة. متوفرة بلونين باستيل رائعين: الوردي الناعم والبنفسجي اللافندر. مصنوعة من جلد خفيف ومقاوم للماء مع أحزمة أكتاف مبطنة ومريحة، مثالية للروضة، النزهات، وحمل الألعاب.',
    price: 2400,
    originalPrice: 3200,
    category: 'kids-bags',
    image: kidsBunnyPinkImg,
    colors: [
      { name: 'وردي باستيل (Pastel Pink)', colorCode: '#F9A8D4', image: kidsBunnyPinkImg },
      { name: 'بنفسجي لافندر (Lavender Purple)', colorCode: '#C084FC', image: kidsBunnyPurpleImg }
    ],
    gallery: [
      kidsBunnyPinkImg,
      kidsBunnyPurpleImg
    ],
    inStock: true,
    isNew: true,
    isBestSeller: true,
    material: 'جلد ناعم آمن للأطفال خفيف الوزن ومقاوم للبقع والماء وسهل التنظيف'
  },
  {
    id: 'bag-gucci-mini-ophidia',
    code: 'ROSA-GC-01',
    title: 'حقيبة كتف غوتشي ميني بنقشة المونوغرام الفاخرة وسلسال ذهبي (Gucci)',
    description: 'حقيبة كتف ويد ميني راقية من ماركة غوتشي العالمية بنقشة GG الأيقونية الكلاسيكية وحواف جلدية بنية فاخرة. تتميز بشعار GG الذهبي وسلسال كتف ذهبي أنيق مع مساحة ممتازة لحمل الهاتف، النقود، وأدوات التجميل.',
    price: 3500,
    originalPrice: 4600,
    category: 'women-crossbody',
    image: gucciMiniImg,
    colors: [
      { name: 'مونوغرام كلاسيك (Classic Monogram)', colorCode: '#854D0E', image: gucciMiniImg }
    ],
    gallery: [
      gucciMiniImg
    ],
    inStock: true,
    isNew: true,
    isBestSeller: true,
    material: 'كانفاس عالي الجودة مع جلد متين وسلسال معدني ذهبي غير قابل لتغير اللون'
  },
  {
    id: 'bag-crossbody-emerald',
    code: 'ROSA-CR-02',
    title: 'حقيبة كروس كات بمختلف الألوان',
    description: 'حقيبة كتف وكروس أنيقة للغاية مصنوعة من أجود أنواع الجلد الناعم بمختلف الألوان الجذابة يمنح إطلالتك فخامة استثنائية. مزودة بسلسال كتف  مع تقسيم داخلي منظم.',
    price: 3800,
    originalPrice: 4800,
    category: 'women-crossbody',
    image:cats1,
    colors: [
      { name: 'أخضر زمردي (Emerald Green)', colorCode: '#065F46', image: cats1  }
    ],
    gallery: [
      cats1 
    ][cats2] [cats3] ,
    inStock: true,
    isNew: true,
    isBestSeller: false,
    material: 'جلد عجل فاخر مستورد + معدن ذهبي مقاوم للصدأ'
  },
  {
    id: 'bag-evening-glitter-crystal',
    code: 'ROSA-EV-01',
    title: 'حقيبة كلاتش سهرات كريستال ذهبية براقة للمناسبات والأعراس',
    description: 'حقيبة سهرة فخمة مرصعة بحبيبات الكريستال الذهبية والماسية اللامعة التي تخطف الأنظار في المناسبات والأعراس. يمكن حملها ككلاتش باليد أو كحقيبة كتف عبر السلسال الذهبي المرفق القابل للإزالة.',
    price: 4200,
    originalPrice: 5500,
    category: 'evening-bags',
    image: eveningClutchImg,
    colors: [
      { name: 'ذهبي كريستال (Golden Crystal)', colorCode: '#EAB308', image: eveningClutchImg }
    ],
    gallery: [
      eveningClutchImg
    ],
    inStock: true,
    isNew: true,
    isBestSeller: true,
    material: 'هيكل معدني قوي مرصع بكريستال عالي النقاء + بطانة ساتان ناعمة'
  },
  {
    id: 'bag-kids-dino-blue',
    code: 'ROSA-KD-02',
    title: 'حقيبة ظهر أطفال ديناصور 3D ملونة ومقاومة للماء (للأولاد والروضة)',
    description: 'حقيبة ظهر كرتونية مبهجة للأطفال بتصميم ديناصور مرح ومجسم باللونين الأزرق الملكي والأصفر. خفيفة جداً ومريحة للظهر وتتسع للوجبات الخفيفة والكتب الصغيرة ومطارة الماء مع أحزمة مبطنة تخفف الضغط على الكتفين.',
    price: 2200,
    originalPrice: 2900,
    category: 'kids-bags',
    image: kidsDinoBlueImg,
    colors: [
      { name: 'أزرق وأصفر (Blue & Yellow)', colorCode: '#2563EB', image: kidsDinoBlueImg }
    ],
    gallery: [
      kidsDinoBlueImg
    ],
    inStock: true,
    isNew: true,
    isBestSeller: false,
    material: 'قماش نيوبرين وبوليستر مقاوم للماء خفيف الوزن وسهل التنظيف'
  },
  {
    id: 'bag-nike-backpack-black',
    code: 'ROSA-NK-01',
    title: 'حقيبة ظهر نايكي الرياضية الأصلية مع مقلمة ملحقة (Nike Backpack)',
    description: 'حقيبة ظهر عملية وأنيقة من نايكي باللون الأسود الكلاسيكي وشعار Nike الأبيض المميز. ممتازة للجامعة، المدرسة، الجيم، والسفر، مزودة بجيوب داخلية وخارجية متعددة ومقلمة برتقالية ملحقة، مع أحزمة أكتاف مبطنة ومريحة.',
    price: 2000,
    originalPrice: 2800,
    category: 'backpacks',
    image: nikeBackpackImg,
    colors: [
      { name: 'أسود رياضي (Sport Black)', colorCode: '#111827', image: nikeBackpackImg }
    ],
    gallery: [
      nikeBackpackImg
    ],
    inStock: true,
    isNew: true,
    isBestSeller: true,
    material: 'قماش أوكسفورد بوليستر مقاوم للمياه والتمزق مع سحابات متينة'
  }
];
