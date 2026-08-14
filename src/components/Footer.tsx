import React from 'react';
import { StoreConfig } from '../types';
import { MessageCircle, Heart, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { formatPhoneNumber } from '../utils/whatsapp';

interface FooterProps {
  config: StoreConfig;
  onOpenSettings: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onOpenSettings }) => {
  const cleanPhone = formatPhoneNumber(config.whatsappNumber);

  return (
    <footer className="bg-gradient-to-b from-rose-950 to-slate-950 text-rose-100 pt-12 pb-8 mt-16 border-t border-rose-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-rose-900/40">
          
          {/* Brand Col */}
          <div>
            <h3 className="text-2xl font-extrabold text-white mb-3 flex items-center gap-2">
              <span>{config.storeName}</span>
              <Sparkles className="w-5 h-5 text-amber-300" />
            </h3>
            <p className="text-xs sm:text-sm text-rose-200/80 leading-relaxed font-light mb-4">
              وجهتك الأولى للأكسسوارات النسائية العصرية والمجوهرات الراقية. نتميز بدقة الاختيار، جودة المواد الملونة، وتسهيل الطلبات عبر الواتساب مباشرة.
            </p>
            <div className="flex items-center gap-2 text-xs text-rose-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>تلقي الطلبات والاستفسارات متوفر الآن عبر الواتساب</span>
            </div>
          </div>

          {/* Quick Links & Service Guarantees */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white mb-2">مميزات الشراء من متجرنا</h4>
            <div className="flex items-center gap-2.5 text-xs text-rose-200/90">
              <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" />
              <span>قطع ومجوهرات مطلية بأعلى معايير الجودة</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-rose-200/90">
              <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{config.locationText || 'توصيل لكافة المناطق وتأكيد فوري'}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-rose-200/90">
              <Heart className="w-4 h-4 text-rose-400 shrink-0" />
              <span>تغليف إهداء مجاني فاخر لكافة الطلبات</span>
            </div>
          </div>

          {/* Contact Direct */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3">تواصل معنا الآن</h4>
            <a
              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('مرحباً متجر Rosa Accessories 👋')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm transition-all shadow-md mb-3"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>محادثة الواتساب المباشرة</span>
            </a>

            <div className="pt-2">
              <button
                onClick={onOpenSettings}
                className="text-xs text-rose-300 hover:text-white underline transition-colors"
              >
                تغيير رقم الواتساب أو اسم المتجر
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-rose-300/70 gap-2 text-center sm:text-right">
          <p>© {new Date().getFullYear()} جميع الحقوق محفوظة لمتجر <span className="font-bold text-rose-200">{config.storeName}</span></p>
          <p className="flex items-center gap-1">
            صُمم بكل <Heart className="w-3.5 h-3.5 text-rose-400 fill-current" /> لخدمة عملائنا الكرام
          </p>
        </div>

      </div>
    </footer>
  );
};
