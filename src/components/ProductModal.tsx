import React, { useState } from 'react';
import { Product, StoreConfig } from '../types';
import { X, MessageCircle, ShoppingBag, Plus, Minus, ShieldCheck, Sparkles, Share2, Check, MapPin, Phone, User } from 'lucide-react';
import { buildSingleProductWhatsAppUrl } from '../utils/whatsapp';
import { ALGERIA_WILAYAS } from '../data/algeriaWilayas';

interface ProductModalProps {
  product: Product | null;
  config: StoreConfig;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  config,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [customerName, setCustomerName] = useState<string>('');
  const [customerWilaya, setCustomerWilaya] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerAddress, setCustomerAddress] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const images = product.gallery && product.gallery.length > 0
    ? [product.image, ...product.gallery.filter(i => i !== product.image)]
    : [product.image];

  const totalPrice = product.price * quantity;

  const whatsappUrl = buildSingleProductWhatsAppUrl(
    product,
    quantity,
    config,
    customerName,
    customerWilaya,
    customerPhone,
    customerAddress
  );

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-[#141414] rounded-3xl shadow-2xl border border-rose-900/40 overflow-hidden my-auto max-h-[92vh] flex flex-col md:flex-row text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 p-2.5 rounded-full bg-[#1e1e1e]/90 hover:bg-[#282828] text-slate-300 hover:text-rose-300 shadow-md transition-all border border-rose-900/30"
          title="إغلاق النافذة"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Images Gallery */}
        <div className="w-full md:w-1/2 bg-[#191114] p-4 sm:p-6 flex flex-col justify-between border-b md:border-b-0 md:border-l border-rose-900/30">
          <div>
            <div className="relative aspect-1/1 w-full rounded-2xl overflow-hidden bg-[#1f1619] shadow-inner mb-3 border border-rose-900/30">
              <img
                src={selectedImage}
                alt={product.title}
                className="w-full h-full object-cover transition-all duration-300"
                referrerPolicy="no-referrer"
              />
              {product.isBestSeller && (
                <span className="absolute top-3 right-3 bg-amber-500 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-full shadow-sm flex items-center gap-1 border border-amber-300/50">
                  <Sparkles className="w-3.5 h-3.5" />
                  الأكثر طلباً
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImage === img ? 'border-rose-500 scale-105 shadow-md shadow-rose-950/60' : 'border-rose-900/30 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`view ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-rose-900/30 text-xs text-rose-300 flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>شحن سريع لكافة الولايات 58 والدفع عند الاستلام</span>
            </div>
            
            <button
              onClick={handleCopyLink}
              className="text-zinc-400 hover:text-rose-300 flex items-center gap-1 transition-colors text-[11px]"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'تم النسخ' : 'مشاركة'}</span>
            </button>
          </div>
        </div>

        {/* Right Side: Product Details & WhatsApp Direct Order Form */}
        <div className="w-full md:w-1/2 p-5 sm:p-7 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Code & Stock */}
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="px-2.5 py-0.5 rounded-md bg-rose-950/50 text-rose-300 font-mono font-medium border border-rose-900/30">
                كود الحقيبة: {product.code || 'ROSA-01'}
              </span>
              <span className="text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-900/40 px-2 py-0.5 rounded-md">
                متوفرة بالمحل 🇩🇿
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-100 mb-2 leading-snug">
              {product.title}
            </h3>

            {/* Price */}
            <div className="flex items-baseline justify-between gap-3 my-2.5 bg-[#1c1317] p-3 rounded-2xl border border-rose-900/30">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-extrabold text-rose-300">
                  {product.price} <span className="text-sm text-rose-400 font-medium">{config.currency}</span>
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-zinc-500 line-through">
                    {product.originalPrice} {config.currency}
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed mb-3">
              {product.description}
            </p>

            {product.material && (
              <div className="mb-3 text-[11px] text-zinc-300 bg-[#1a1a1a] p-2.5 rounded-xl border border-rose-900/20">
                <span className="font-bold text-rose-300">الخامات والمواصفات: </span>
                <span>{product.material}</span>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center justify-between py-2.5 border-y border-rose-900/30 mb-3">
              <span className="text-xs sm:text-sm font-bold text-slate-200">الكمية المطلوبة:</span>
              <div className="flex items-center gap-3 bg-[#1b1417] rounded-full p-1 border border-rose-900/40">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 rounded-full bg-[#241a1f] text-rose-300 hover:bg-rose-900/60 flex items-center justify-center font-bold shadow-2xs transition-all border border-rose-800/30"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-7 text-center text-sm font-extrabold text-rose-200">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 h-7 rounded-full bg-rose-800 text-white hover:bg-rose-700 flex items-center justify-center font-bold shadow-2xs transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Algerian Delivery Information for WhatsApp */}
            <div className="space-y-2 mb-3 bg-[#191114] p-3 rounded-2xl border border-rose-900/30">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-300">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>بيانات التوصيل للطلب المباشر بالجزائر (اختياري):</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="relative">
                  <User className="w-3.5 h-3.5 absolute right-2.5 top-2.5 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="الاسم واللقب"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-[#20171b] border border-rose-900/40 rounded-xl pr-8 pl-2 py-1.5 text-xs text-slate-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                </div>

                <div className="relative">
                  <Phone className="w-3.5 h-3.5 absolute right-2.5 top-2.5 text-zinc-500" />
                  <input
                    type="tel"
                    placeholder="رقم الهاتف (05 / 06 / 07)"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-[#20171b] border border-rose-900/40 rounded-xl pr-8 pl-2 py-1.5 text-xs text-slate-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <select
                  value={customerWilaya}
                  onChange={(e) => setCustomerWilaya(e.target.value)}
                  className="w-full bg-[#20171b] border border-rose-900/40 rounded-xl px-2.5 py-1.5 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-rose-500"
                >
                  <option value="">-- اختر ولايتك (58 ولاية) --</option>
                  {ALGERIA_WILAYAS.map((w) => (
                    <option key={w.code} value={w.name}>
                      {w.name}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="البلدية أو العنوان بالتفصيل"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full bg-[#20171b] border border-rose-900/40 rounded-xl px-3 py-1.5 text-xs text-slate-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>
            </div>
          </div>

          {/* Bottom Action Section */}
          <div className="pt-2 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300 px-1">
              <span>الإجمالي:</span>
              <span className="text-lg font-extrabold text-rose-300">{totalPrice} {config.currency}</span>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950/50 hover:scale-101"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>طلب مباشر بالواتساب (+213561001185)</span>
            </a>

            <button
              onClick={() => {
                onAddToCart(product, quantity);
                onClose();
              }}
              className="w-full py-2.5 px-4 rounded-2xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all border border-rose-800/40 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-rose-400" />
              <span>إضافة للسلة ومتابعة التسوق</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
