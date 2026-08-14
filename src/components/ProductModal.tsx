import React, { useState, useEffect } from 'react';
import { Product, StoreConfig } from '../types';
import { X, MessageCircle, ShoppingBag, Plus, Minus, ShieldCheck, Sparkles, Share2, Check, MapPin, Phone, User, Palette } from 'lucide-react';
import { buildSingleProductWhatsAppUrl } from '../utils/whatsapp';
import { ALGERIA_WILAYAS } from '../data/algeriaWilayas';

interface ProductModalProps {
  product: Product | null;
  initialColor?: string;
  config: StoreConfig;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, selectedColor?: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  initialColor,
  config,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string>(
    initialColor || (product.colors && product.colors.length > 0 ? product.colors[0].name : '')
  );
  
  // Determine initial image based on color or default product image
  const initialImage = React.useMemo(() => {
    if (initialColor && product.colors) {
      const match = product.colors.find(c => c.name === initialColor);
      if (match) return match.image;
    }
    return product.image;
  }, [product, initialColor]);

  const [selectedImage, setSelectedImage] = useState<string>(initialImage);
  const [customerName, setCustomerName] = useState<string>('');
  const [customerWilaya, setCustomerWilaya] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerAddress, setCustomerAddress] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Sync image when color changes
  const handleSelectColor = (colorName: string, colorImg: string) => {
    setSelectedColor(colorName);
    setSelectedImage(colorImg);
  };

  // Compile all unique images from product gallery and color variants
  const allImages = React.useMemo(() => {
    const imgs: string[] = [];
    if (product.image) imgs.push(product.image);
    if (product.colors) {
      product.colors.forEach(c => {
        if (!imgs.includes(c.image)) imgs.push(c.image);
      });
    }
    if (product.gallery) {
      product.gallery.forEach(g => {
        if (!imgs.includes(g)) imgs.push(g);
      });
    }
    return imgs;
  }, [product]);

  const totalPrice = product.price * quantity;

  const whatsappUrl = buildSingleProductWhatsAppUrl(
    product,
    quantity,
    config,
    customerName,
    customerWilaya,
    customerPhone,
    customerAddress,
    selectedColor
  );

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-pink-200 overflow-hidden my-auto max-h-[92vh] flex flex-col md:flex-row text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 p-2.5 rounded-full bg-white/90 hover:bg-pink-100 text-slate-600 hover:text-pink-700 shadow-md transition-all border border-pink-200"
          title="إغلاق النافذة"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Images Gallery */}
        <div className="w-full md:w-1/2 bg-pink-50/40 p-4 sm:p-6 flex flex-col justify-between border-b md:border-b-0 md:border-l border-pink-100">
          <div>
            <div className="relative aspect-1/1 w-full rounded-2xl overflow-hidden bg-white shadow-sm mb-3 border border-pink-200">
              <img
                src={selectedImage}
                alt={product.title}
                className="w-full h-full object-cover transition-all duration-300"
                referrerPolicy="no-referrer"
              />
              {product.isBestSeller && (
                <span className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  الأكثر طلباً
                </span>
              )}
            </div>

            {/* Thumbnails Gallery */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedImage(img);
                      // If this image corresponds to a color, sync color
                      const matchingColor = product.colors?.find(c => c.image === img);
                      if (matchingColor) setSelectedColor(matchingColor.name);
                    }}
                    className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImage === img ? 'border-pink-600 scale-105 shadow-md shadow-pink-200 ring-1 ring-pink-400' : 'border-pink-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`view ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-pink-100 text-xs text-pink-700 flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>توصيل لكافة الولايات 58 والدفع عند الاستلام</span>
            </div>
            
            <button
              onClick={handleCopyLink}
              className="text-slate-500 hover:text-pink-700 flex items-center gap-1 transition-colors text-[11px]"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'تم النسخ' : 'مشاركة'}</span>
            </button>
          </div>
        </div>

        {/* Right Side: Product Details & Color Selector & Form */}
        <div className="w-full md:w-1/2 p-5 sm:p-7 flex flex-col justify-between overflow-y-auto bg-white">
          <div>
            {/* Code & Stock */}
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="px-2.5 py-0.5 rounded-md bg-pink-100 text-pink-800 font-mono font-bold border border-pink-200">
                كود الحقيبة: {product.code || 'ROSA-01'}
              </span>
              <span className="text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                متوفرة بالمحل 🇩🇿
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 leading-snug">
              {product.title}
            </h3>

            {/* Price */}
            <div className="flex items-baseline justify-between gap-3 my-2 bg-pink-50/80 p-3 rounded-2xl border border-pink-200">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-extrabold text-pink-700">
                  {product.price} <span className="text-sm text-pink-900 font-bold">{config.currency}</span>
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-zinc-400 line-through">
                    {product.originalPrice} {config.currency}
                  </span>
                )}
              </div>
            </div>

            {/* COLOR VARIANT SELECTOR */}
            {product.colors && product.colors.length > 0 && (
              <div className="my-3 bg-pink-50/50 p-3 rounded-2xl border border-pink-200">
                <div className="flex items-center justify-between text-xs font-bold text-pink-950 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Palette className="w-4 h-4 text-pink-600" />
                    <span>الألوان المتوفرة:</span>
                  </span>
                  <span className="text-pink-700 font-extrabold bg-white px-2.5 py-0.5 rounded-full border border-pink-200">
                    {selectedColor || 'اختر اللون'}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color, idx) => {
                    const isSelected = selectedColor === color.name;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectColor(color.name, color.image)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                          isSelected
                            ? 'bg-pink-600 text-white border-pink-600 shadow-md shadow-pink-200 ring-2 ring-pink-300 scale-102'
                            : 'bg-white hover:bg-pink-100/70 text-slate-800 border-pink-200'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0"
                          style={{ backgroundColor: color.colorCode }}
                        />
                        <span>{color.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              {product.description}
            </p>

            {product.material && (
              <div className="mb-3 text-[11px] text-slate-700 bg-pink-50/60 p-2.5 rounded-xl border border-pink-200">
                <span className="font-bold text-pink-900">الخامات والمواصفات: </span>
                <span>{product.material}</span>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center justify-between py-2 border-y border-pink-100 mb-3">
              <span className="text-xs sm:text-sm font-bold text-slate-800">الكمية المطلوبة:</span>
              <div className="flex items-center gap-3 bg-pink-50 rounded-full p-1 border border-pink-200">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 rounded-full bg-white text-pink-700 hover:bg-pink-100 flex items-center justify-center font-bold shadow-2xs transition-all border border-pink-200"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-7 text-center text-sm font-extrabold text-pink-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 h-7 rounded-full bg-pink-600 text-white hover:bg-pink-700 flex items-center justify-center font-bold shadow-2xs transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Algerian Delivery Information for WhatsApp */}
            <div className="space-y-2 mb-3 bg-pink-50/60 p-3 rounded-2xl border border-pink-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-pink-900">
                <MapPin className="w-3.5 h-3.5 text-pink-600" />
                <span>بيانات التوصيل للطلب المباشر بالجزائر (اختياري):</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="relative">
                  <User className="w-3.5 h-3.5 absolute right-2.5 top-2.5 text-pink-400" />
                  <input
                    type="text"
                    placeholder="الاسم واللقب"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-white border border-pink-200 rounded-xl pr-8 pl-2 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-pink-500"
                  />
                </div>

                <div className="relative">
                  <Phone className="w-3.5 h-3.5 absolute right-2.5 top-2.5 text-pink-400" />
                  <input
                    type="tel"
                    placeholder="رقم الهاتف (05 / 06 / 07)"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-white border border-pink-200 rounded-xl pr-8 pl-2 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-pink-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <select
                  value={customerWilaya}
                  onChange={(e) => setCustomerWilaya(e.target.value)}
                  className="w-full bg-white border border-pink-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-pink-500"
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
                  className="w-full bg-white border border-pink-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-pink-500"
                />
              </div>
            </div>
          </div>

          {/* Bottom Action Section */}
          <div className="pt-2 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 px-1">
              <span>الإجمالي:</span>
              <span className="text-lg font-extrabold text-pink-700">{totalPrice} {config.currency}</span>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-200 hover:scale-101"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>طلب مباشر بالواتساب (+213561001185)</span>
            </a>

            <button
              onClick={() => {
                onAddToCart(product, quantity, selectedColor);
                onClose();
              }}
              className="w-full py-2.5 px-4 rounded-2xl bg-pink-100 hover:bg-pink-200 text-pink-900 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all border border-pink-300 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-pink-700" />
              <span>إضافة للسلة باللون المختار ومتابعة التسوق</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
