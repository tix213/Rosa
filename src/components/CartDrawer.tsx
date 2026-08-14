import React, { useState } from 'react';
import { CartItem, StoreConfig } from '../types';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, ArrowRight, MapPin, Phone, User, Palette } from 'lucide-react';
import { buildCartWhatsAppUrl } from '../utils/whatsapp';
import { ALGERIA_WILAYAS } from '../data/algeriaWilayas';

interface CartDrawerProps {
  isOpen: boolean;
  config: StoreConfig;
  cartItems: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number, selectedColor?: string) => void;
  onRemoveItem: (productId: string, selectedColor?: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  config,
  cartItems,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('');
  const [customerWilaya, setCustomerWilaya] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [notes, setNotes] = useState('');

  const totalPrice = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const whatsappCheckoutUrl = buildCartWhatsAppUrl(
    cartItems,
    config,
    customerName,
    customerWilaya,
    customerPhone,
    customerAddress,
    notes
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-10 rtl:pl-0 rtl:pr-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-r border-pink-200 text-slate-800">
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-pink-50 to-rose-50 border-b border-pink-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl shadow-md">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">سلة مشتريات Rosa</h3>
                <p className="text-xs text-pink-700 font-medium">
                  {totalCount > 0 ? `${totalCount} حقيبة في السلة` : 'السلة فارغة'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-pink-700 hover:bg-pink-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body - Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-400">
                <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mb-4 text-pink-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-sm font-bold text-slate-800 mb-1">سلتك فارغة الآن 👜</p>
                <p className="text-xs text-slate-500 max-w-xs mb-6">
                  استكشفي تشكيلة حقائب Rosa المميزة واختاري لونك المفضل لإضافته للسلة.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 text-white text-xs font-bold shadow-md hover:from-pink-700 hover:to-rose-700 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>تصفح الحقائب والألوان</span>
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {cartItems.map((item, index) => {
                    // Check if item has custom image matching selected color
                    const matchingColorObj = item.selectedColor && item.product.colors?.find(c => c.name === item.selectedColor);
                    const displayImg = matchingColorObj ? matchingColorObj.image : item.product.image;

                    return (
                      <div
                        key={`${item.product.id}-${item.selectedColor || index}`}
                        className="flex gap-3 bg-pink-50/40 p-3 rounded-2xl border border-pink-200 items-center justify-between"
                      >
                        <img
                          src={displayImg}
                          alt={item.product.title}
                          className="w-16 h-16 rounded-xl object-cover border border-pink-200 shrink-0 bg-white"
                          referrerPolicy="no-referrer"
                        />

                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 truncate mb-1">
                            {item.product.title}
                          </h4>
                          
                          {/* Selected Color Tag */}
                          {item.selectedColor && (
                            <div className="inline-flex items-center gap-1 text-[11px] font-bold text-pink-700 bg-pink-100 px-2 py-0.5 rounded-md mb-1 border border-pink-200">
                              <Palette className="w-3 h-3 text-pink-600" />
                              <span>اللون: {item.selectedColor}</span>
                            </div>
                          )}

                          <div className="text-xs font-extrabold text-pink-700 mb-2">
                            {item.product.price} {config.currency}
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 bg-white border border-pink-200 rounded-lg p-0.5">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1, item.selectedColor)}
                                className="w-5 h-5 flex items-center justify-center text-pink-700 hover:bg-pink-100 rounded font-bold"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-6 text-center text-xs font-bold text-slate-800">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1, item.selectedColor)}
                                className="w-5 h-5 flex items-center justify-center text-pink-700 hover:bg-pink-100 rounded font-bold"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Total Item Price & Delete */}
                        <div className="flex flex-col items-end justify-between self-stretch">
                          <button
                            onClick={() => onRemoveItem(item.product.id, item.selectedColor)}
                            className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                            title="حذف الحقيبة"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <span className="text-xs font-extrabold text-pink-700">
                            {item.product.price * item.quantity} {config.currency}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Clear Cart link */}
                <div className="text-left pt-1">
                  <button
                    onClick={onClearCart}
                    className="text-[11px] text-slate-400 hover:text-rose-600 underline cursor-pointer"
                  >
                    تفريغ السلة بالكامل
                  </button>
                </div>

                {/* Algerian Customer Information Form */}
                <div className="mt-4 pt-3 border-t border-pink-200 space-y-2.5 bg-pink-50/60 p-3.5 rounded-2xl border border-pink-200">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-pink-900">
                    <MapPin className="w-3.5 h-3.5 text-pink-600" />
                    <span>معلومات التوصيل (شحن لكافة الـ 58 ولاية):</span>
                  </div>

                  <div className="relative">
                    <User className="w-3.5 h-3.5 absolute right-2.5 top-2.5 text-pink-400" />
                    <input
                      type="text"
                      placeholder="الاسم واللقب"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-white border border-pink-200 rounded-xl pr-8 pl-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-pink-500"
                    />
                  </div>

                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 absolute right-2.5 top-2.5 text-pink-400" />
                    <input
                      type="tel"
                      placeholder="رقم الهاتف (05 / 06 / 07)"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-white border border-pink-200 rounded-xl pr-8 pl-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-pink-500"
                    />
                  </div>

                  <select
                    value={customerWilaya}
                    onChange={(e) => setCustomerWilaya(e.target.value)}
                    className="w-full bg-white border border-pink-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-pink-500"
                  >
                    <option value="">-- اختر ولايتك (58 ولاية جزائرية) --</option>
                    {ALGERIA_WILAYAS.map((w) => (
                      <option key={w.code} value={w.name}>
                        {w.name}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    placeholder="البلدية والعنوان السكني بالتفصيل"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full bg-white border border-pink-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-pink-500"
                  />

                  <input
                    type="text"
                    placeholder="أي ملاحظات خاصة بالتوصيل (اختياري)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-white border border-pink-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-pink-500"
                  />
                </div>
              </>
            )}
          </div>

          {/* Drawer Footer - Total & WhatsApp Checkout Button */}
          {cartItems.length > 0 && (
            <div className="p-5 bg-white border-t border-pink-200 shadow-xl space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 font-bold">المجموع الكلي:</span>
                <span className="text-xl font-extrabold text-pink-700">
                  {totalPrice} {config.currency}
                </span>
              </div>

              <a
                href={whatsappCheckoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-200"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>إرسال السلة عبر الواتساب (+213561001185)</span>
              </a>

              <p className="text-[11px] text-slate-500 text-center">
                🇩🇿 توصيل لكافة الولايات 58 والدفع يد بيد عند الاستلام
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
