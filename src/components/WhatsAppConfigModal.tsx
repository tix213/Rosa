import React, { useState } from 'react';
import { StoreConfig } from '../types';
import { X, MessageCircle, Save, CheckCircle2, Store, DollarSign, Bell } from 'lucide-react';

interface WhatsAppConfigModalProps {
  isOpen: boolean;
  config: StoreConfig;
  onClose: () => void;
  onSaveConfig: (newConfig: StoreConfig) => void;
  onResetDefaults?: () => void;
}

export const WhatsAppConfigModal: React.FC<WhatsAppConfigModalProps> = ({
  isOpen,
  config,
  onClose,
  onSaveConfig,
  onResetDefaults,
}) => {
  if (!isOpen) return null;

  const [whatsappNumber, setWhatsappNumber] = useState(config.whatsappNumber);
  const [storeName, setStoreName] = useState(config.storeName);
  const [currency, setCurrency] = useState(config.currency);
  const [announcementText, setAnnouncementText] = useState(config.announcementText || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig({
      ...config,
      whatsappNumber: whatsappNumber.trim(),
      storeName: storeName.trim(),
      currency: currency.trim(),
      announcementText: announcementText.trim(),
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fade-in">
      <div 
        className="relative w-full max-w-md bg-[#141414] rounded-3xl shadow-2xl border border-rose-900/40 overflow-hidden my-auto p-6 text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 text-zinc-400 hover:text-rose-300 hover:bg-rose-950/50 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="p-3 bg-emerald-600 text-white rounded-2xl shadow-lg shadow-emerald-950/60 border border-emerald-400/30">
            <MessageCircle className="w-6 h-6 fill-current" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">إعدادات الواتساب والمتجر</h3>
            <p className="text-xs text-zinc-400">عدلي رقم الواتساب وبيانات المحل لتلقي الطلبات عليه</p>
          </div>
        </div>

        {savedSuccess && (
          <div className="mb-4 p-3 bg-emerald-950/60 border border-emerald-800 text-emerald-300 rounded-xl text-xs font-bold flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>تم حفظ إعدادات الواتساب بنجاح!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* WhatsApp Phone Number */}
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1.5 flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>رقم الواتساب الخاص بالمحل (مع المفتاح الدولي):</span>
            </label>
            <input
              type="text"
              required
              placeholder="مثال: 213550123456"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              className="w-full bg-[#1b1417] border border-rose-900/40 rounded-xl px-3.5 py-2.5 text-sm font-mono text-left dir-ltr text-slate-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <p className="text-[11px] text-zinc-400 mt-1">
              اكتبي الرقم بدون علامة + أو أصفار إضافية (مثلاً في الجزائر: 2135XXXXXXXX أو 2136XXXXXXXX أو 2137XXXXXXXX)
            </p>
          </div>

          {/* Store Name */}
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1.5 flex items-center gap-1.5">
              <Store className="w-4 h-4 text-rose-400" />
              <span>اسم المتجر / المحل:</span>
            </label>
            <input
              type="text"
              required
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full bg-[#1b1417] border border-rose-900/40 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          {/* Currency */}
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1.5 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-amber-400" />
              <span>رمز العملة:</span>
            </label>
            <input
              type="text"
              required
              placeholder="د.ج أو DA"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full bg-[#1b1417] border border-rose-900/40 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          {/* Top Announcement Bar */}
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1.5 flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-rose-400" />
              <span>شريط الإعلانات العلوي (اختياري):</span>
            </label>
            <input
              type="text"
              placeholder="مثال: خصم 10% بمناسبة الافتتاح | اطلبي الآن بالواتساب"
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              className="w-full bg-[#1b1417] border border-rose-900/40 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div className="pt-3 space-y-2">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950/60 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>حفظ الإعدادات</span>
            </button>

            {onResetDefaults && (
              <button
                type="button"
                onClick={() => {
                  if (confirm('هل تريد استعادة جميع المنتجات والأسعار الافتراضية للجزائر (د.ج) ومسح الكاش؟')) {
                    onResetDefaults();
                    onClose();
                  }
                }}
                className="w-full py-2 px-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs rounded-xl border border-zinc-800 transition-all cursor-pointer text-center"
              >
                🔄 إعادة تعيين المتجر للمنتجات والأسعار الافتراضية
              </button>
            )}
          </div>
        </form>

      </div>
    </div>
  );
};
