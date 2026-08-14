import React from 'react';
import { StoreConfig } from '../types';
import { MessageCircle, Heart, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { formatPhoneNumber } from '../utils/whatsapp';

interface FooterProps {
  config: StoreConfig;
  onOpenSettings?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config }) => {
  const cleanPhone = formatPhoneNumber(config.whatsappNumber);

  return (
    <footer className="bg-gradient-to-b from-pink-100 to-rose-100 text-slate-800 pt-12 pb-8 mt-16 border-t border-pink-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-pink-200">
          
          {/* Brand Col */}
          <div>
            <h3 className="text-2xl font-extrabold text-pink-900 mb-3 flex items-center gap-2">
              <span>{config.storeName}</span>
              <Sparkles className="w-5 h-5 text-pink-500" />
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-4">
              وجهتكم الأولى في الجزائر لأفخم وأرقى تشكيلات الحقائب النسائية بمختلف الألوان والأشكال، وحقائب الأطفال المدرسية والكرتونية. جودة استثنائية وشحن سريع لكافة الولايات 58.
            </p>
            <div className="flex items-center gap-2 text-xs text-pink-800 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>تلقي الطلبات والاستفسارات متوفر الآن عبر الواتساب (+213561001185)</span>
            </div>
          </div>

          {/* Quick Links & Service Guarantees */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-pink-900 mb-2">مميزات التسوق معنا</h4>
            <div className="flex items-center gap-2.5 text-xs text-slate-700">
              <ShieldCheck className="w-4 h-4 text-pink-600 shrink-0" />
              <span>حقائب جلدية مستوردة متوفرة بألوان متعددة ومطابقة للصور</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-700">
              <Truck className="w-4 h-4 text-pink-600 shrink-0" />
              <span>{config.locationText || 'توصيل سريع لكافة الـ 58 ولاية جزائرية'}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-700">
              <Heart className="w-4 h-4 text-pink-600 shrink-0 fill-current" />
              <span>الدفع عند الاستلام مع إمكانية المعاينة قبل الدفع</span>
            </div>
          </div>

          {/* Contact Direct */}
          <div>
            <h4 className="text-sm font-bold text-pink-900 mb-3">تواصل معنا عبر الواتساب</h4>
            <a
              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('مرحباً بوتيك Rosa للحقائب بالجزائر 🇩🇿🌸')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-200 mb-3"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>محادثة الواتساب (0561001185)</span>
            </a>

            <p className="text-xs text-slate-500">
              خدمة الزبائن متواجدة يومياً للرد على كافة استفساراتكم وتأكيد طلبياتكم.
            </p>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2 text-center sm:text-right">
          <p>© {new Date().getFullYear()} جميع الحقوق محفوظة لبوتيك <span className="font-bold text-pink-700">{config.storeName}</span></p>
          <p className="flex items-center gap-1 justify-center">
            صُمم بكل <Heart className="w-3.5 h-3.5 text-pink-500 fill-current" /> لإرضاء زبوناتنا الكرام في الجزائر 🇩🇿
          </p>
        </div>

      </div>
    </footer>
  );
};
