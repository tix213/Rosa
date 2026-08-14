import { Category, Product, StoreConfig } from '../types';

import heroBannerImg from '../assets/images/rosa_bags_hero_banner_1786701754670.jpg';
import brandLogoImg from '../assets/images/rosa_brand_logo_1786622288804.jpg';
import hermesBlueSetImg from '../assets/images/hermes_blue_set_1786680461964.jpg';
import gucciMiniImg from '../assets/images/gucci_mini_bag_1786680473233.jpg';
import emeraldBagImg from '../assets/images/women_crossbody_emerald_1786701731170.jpg';
import eveningClutchImg from '../assets/images/evening_glitter_clutch_1786701714601.jpg';
import hermesClassicImg from '../assets/images/hermes_classic_bag_1786678118984.jpg';
import kidsBunnyPinkImg from '../assets/images/kids_backpack_pink_1786701703330.jpg';
import kidsDinoBlueImg from '../assets/images/kids_dino_backpack_1786701742115.jpg';
import nikeBackpackImg from '../assets/images/nike_black_backpack_1786680488848.jpg';

export const HERO_BANNER_IMAGE = heroBannerImg;
export const BRAND_LOGO_IMAGE = brandLogoImg;

export const DEFAULT_STORE_CONFIG: StoreConfig = {
  whatsappNumber: '213561001185', // رقم الواتساب المباشر للطلب (+213561001185)
  storeName: 'Rosa Bags - محل روزا للحقائب',
  currency: 'د.ج', // الدينار الجزائري DA
  instagramHandle: '@rosa_bags_dz',
  locationText: 'الجزائر 🇩🇿 - توصيل سريع لكافة ولايات الجزائر (58 ولاية) والدفع عند الاستلام',
  announcementText: '👜 مرحباً بكم في متجر Rosa للحقائب بالجزائر! نوفر لكم أروع تشكيلات الحقائب النسائية وحقائب الأطفال مع شحن سريع لجميع الـ 58 ولاية والطلب الفوري عبر الواتساب 🇩🇿'
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
    id: 'bag-hermes-blue-set',
    code: 'ROSA-HR-01',
    title: 'طقم حقيبة هيرميس الفاخرة بالأزرق الملكي (حقيبة + حزام جلد + علبة أصلية)',
    description: 'طقم متكامل وفائق الفخامة من العلامة الراقية هيرميس باللون الأزرق الملكي الجذاب. يحتوي على حقيبة يد كلاسيكية فاخرة بقفل ذهبي ومفاتيح، حزام خصر جلدي أنيق بإبزيم H الذهبي، تعليقة الحصان الجلدية المميزة، وحزام كتف طويل، تأتي داخل علبة هيرميس البرتقالية الفخمة.',
    price: 5000,
    originalPrice: 6500,
    category: 'women-handbags',
    image: hermesBlueSetImg,
    gallery: [
      hermesBlueSetImg
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
    category: 'women-crossbody',
    image: gucciMiniImg,
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
    title: 'حقيبة كروس بودي جلد فاخر باللون الأخضر الزمردي الملكي مع قفل ذهبي',
    description: 'حقيبة كتف وكروس أنيقة للغاية مصنوعة من أجود أنواع الجلد الناعم بلون أخضر زمردي جذاب يمنح إطلالتك فخامة استثنائية. مزودة بسلسال كتف معدني ذهبي لامع وقفل أوتوماتيكي محكم مع تقسيم داخلي منظم.',
    price: 3800,
    originalPrice: 4800,
    category: 'women-crossbody',
    image: emeraldBagImg,
    gallery: [
      emeraldBagImg
    ],
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
    gallery: [
      eveningClutchImg
    ],
    inStock: true,
    isNew: true,
    isBestSeller: true,
    material: 'هيكل معدني قوي مرصع بكريستال عالي النقاء + بطانة ساتان ناعمة'
  },
  {
    id: 'bag-hurmes-classic',
    code: 'ROSA-HURMES-01',
    title: 'حقيبة يد كلاسيكية فاخرة ماركة Hurmes بلون بيج نيود (مستوردة)',
    description: 'حقيبة يد كلاسيكية فاخرة وأنيقة مستوردة بأعلى معايير الجودة من العلامة الشهيرة Hurmes. تتميز بتصميم بيج نيود راقي، خامة جلدية متينة مقاومة للخدش، مساحة داخلية رحبة ومنظمة مع سحاب معدني أنيق ومقابض يد مزدوجة مريحة بالإضافة إلى حزام كتف قابل للتعديل.',
    price: 3200,
    originalPrice: 4200,
    category: 'women-handbags',
    image: hermesClassicImg,
    gallery: [
      hermesClassicImg
    ],
    inStock: true,
    isNew: true,
    isBestSeller: true,
    material: 'جلد فاخر مستورد عالي الجودة مع إكسسوارات معدنية ذهبية أصلية'
  },
  {
    id: 'bag-kids-bunny-pink',
    code: 'ROSA-KD-01',
    title: 'حقيبة ظهر أطفال للبنات بتصميم أرنوب وردي لطيف (Kids Mini Backpack)',
    description: 'حقيبة ظهر كيوت ومميزة للبنات الصغيرات بتصميم أذني أرنب ثلاثية الأبعاد وألوان باستيل وردية ولافندر رائعة. مصنوعة من جلد ناعم ومقاوم للماء مع أحزمة أكتاف قابلة للتعديل وسحاب سلس، مثالية للروضة، النزهات، وحمل الألعاب.',
    price: 2400,
    originalPrice: 3200,
    category: 'kids-bags',
    image: kidsBunnyPinkImg,
    gallery: [
      kidsBunnyPinkImg
    ],
    inStock: true,
    isNew: true,
    isBestSeller: true,
    material: 'جلد ناعم آمن للأطفال خفيف الوزن ومقاوم للبقع والماء'
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
    gallery: [
      nikeBackpackImg
    ],
    inStock: true,
    isNew: true,
    isBestSeller: true,
    material: 'قماش أوكسفورد بوليستر مقاوم للمياه والتمزق مع سحابات متينة'
  }
];
