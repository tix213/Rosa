import React from 'react';
import { MessageCircle, ShieldCheck, Sparkles, Truck, HeartHandshake, ShoppingBag, Heart } from 'lucide-react';
import { HERO_BANNER_IMAGE } from '../data/products';
import { StoreConfig } from '../types';
import { formatPhoneNumber } from '../utils/whatsapp';

interface HeroBannerProps {
  config: StoreConfig;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ config }) => {
  const cleanPhone = formatPhoneNumber(config.whatsappNumber);

  return (
    <div className="relative overflow-hidden rounded-3xl mb-8 border border-pink-200/90 shadow-xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white">
      {/* Background Image with overlay gradient */}
      <div className="absolute inset-0 z-0 opacity-30 mix-blend-overlay">
        <img
          src={HERO_BANNER_IMAGE}
          alt="Rosa Bags Algeria"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Decorative Blur Circles */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-10 sm:py-14 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs sm:text-sm font-bold mb-4 shadow-sm">
          <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
          <span>مرحباً بكم في بوتيك Rosa بالجزائر 🇩🇿 • شحن لكافة الـ 58 ولاية والدفع عند الاستلام</span>
          <Heart className="w-3.5 h-3.5 text-pink-200 fill-current" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
          أفخم الحقائب النسائية وحقائب الأطفال مع <span className="underline decoration-pink-300 decoration-wavy">{config.storeName}</span>
        </h2>

        <p className="text-sm sm:text-base text-pink-100 max-w-2xl mx-auto font-normal leading-relaxed mb-8">
          بوتيك روزا بالجزائر يوفر لكِ أحدث صيحات الحقائب النسائية الفاخرة بمختلف الألوان الجذابة وخامات الجلد المستورد، بالإضافة لألطف حقائب الأطفال المدرسية والكرتونية. اطلبي لونكِ المفضل عبر الواتساب مع معاينة واستلام مريح حتى باب بيتكِ.
        </p>

        {/* Call to action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('مرحباً بوتيك Rosa للحقائب بالجزائر 🇩🇿، أود الاستفسار والطلب عبر الواتساب 👜🌸')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base transition-all shadow-lg shadow-emerald-900/30 hover:scale-105"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>طلب فوري عبر الواتساب (+213561001185)</span>
          </a>

          <a
            href="#products-section"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/20 hover:bg-white/30 text-white font-semibold text-sm sm:text-base transition-all border border-white/40 backdrop-blur-sm shadow-sm hover:scale-102"
          >
            <ShoppingBag className="w-4 h-4 text-pink-200" />
            <span>تصفح الحقائب والألوان المتوفرة</span>
          </a>
        </div>

        {/* Store Trust Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-3xl mx-auto mt-10 pt-8 border-t border-white/20 text-xs sm:text-sm text-pink-100">
          <div className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-xs py-2.5 px-3 rounded-2xl border border-white/20">
            <Truck className="w-4 h-4 text-amber-200 shrink-0" />
            <span>توصيل سريع لـ 58 ولاية جزائرية</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-xs py-2.5 px-3 rounded-2xl border border-white/20">
            <ShieldCheck className="w-4 h-4 text-emerald-200 shrink-0" />
            <span>جودة عالية وألوان متعددة لكل موديل</span>
          </div>
          <div className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2 bg-white/10 backdrop-blur-xs py-2.5 px-3 rounded-2xl border border-white/20">
            <HeartHandshake className="w-4 h-4 text-pink-200 shrink-0" />
            <span>معاينة الحقيبة والدفع عند الاستلام</span>
          </div>
        </div>

      </div>
    </div>
  );
};
