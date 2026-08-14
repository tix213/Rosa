import React from 'react';
import { MessageCircle, ShieldCheck, Sparkles, Truck, HeartHandshake } from 'lucide-react';
import { HERO_BANNER_IMAGE } from '../data/products';
import { StoreConfig } from '../types';
import { formatPhoneNumber } from '../utils/whatsapp';

interface HeroBannerProps {
  config: StoreConfig;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ config }) => {
  const cleanPhone = formatPhoneNumber(config.whatsappNumber);

  return (
    <div className="relative overflow-hidden rounded-3xl mb-8 border border-rose-900/40 shadow-2xl bg-gradient-to-r from-[#180e12] via-[#140b0e] to-[#12080a] text-white">
      {/* Background Image with overlay gradient */}
      <div className="absolute inset-0 z-0 opacity-25 mix-blend-overlay">
        <img
          src={HERO_BANNER_IMAGE}
          alt="Rosa Accessories Banner"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-10 sm:py-14 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/70 backdrop-blur-md border border-rose-700/50 text-rose-200 text-xs sm:text-sm font-bold mb-4 shadow-inner">
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <span>مرحباً بكم في الجزائر 🇩🇿 • توصيل سريع لـ 58 ولاية والدفع عند الاستلام</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
          تأنقي بأجمل إكسسوارات ومجوهرات <span className="bg-gradient-to-r from-rose-200 via-amber-200 to-rose-300 bg-clip-text text-transparent">Rosa Accessories</span>
        </h2>

        <p className="text-sm sm:text-base text-rose-200/90 max-w-2xl mx-auto font-light leading-relaxed mb-8">
          أهلاً وسهلاً بكِ في عالم الأناقة والفخامة. اخترنا لكِ بعناية أجمل وأحدث موديلات الإكسسوارات الراقية. تصفحي واطلبي بسهولة تامة عبر الواتساب مع تأكيد فوري لطلبك!
        </p>

        {/* Call to action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('مرحباً متجر Rosa Accessories بالجزائر 🇩🇿، أود استعراض الكتالوج والطلب 💕')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base transition-all shadow-lg shadow-emerald-950/50 hover:scale-105"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>اطلبي الآن عبر الواتساب</span>
          </a>

          <a
            href="#products-section"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1e1418]/80 hover:bg-[#2a1b22] text-rose-200 font-semibold text-sm sm:text-base transition-all border border-rose-800/40 backdrop-blur-sm"
          >
            <span>استكشفي التشكيلة</span>
          </a>
        </div>

        {/* Store Trust Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-3xl mx-auto mt-10 pt-8 border-t border-rose-900/30 text-xs sm:text-sm text-rose-200/80">
          <div className="flex items-center justify-center gap-2 bg-[#191014]/60 py-2 px-3 rounded-xl border border-rose-900/30">
            <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>توصيل لكافة 58 ولاية جزائرية</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-[#191014]/60 py-2 px-3 rounded-xl border border-rose-900/30">
            <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" />
            <span>جودة عالية وأسعار ممتازة</span>
          </div>
          <div className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2 bg-[#191014]/60 py-2 px-3 rounded-xl border border-rose-900/30">
            <HeartHandshake className="w-4 h-4 text-rose-300 shrink-0" />
            <span>الدفع عند الاستلام مع علبة إهداء</span>
          </div>
        </div>

      </div>
    </div>
  );
};
