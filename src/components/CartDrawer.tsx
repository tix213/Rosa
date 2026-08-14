import React, { useState } from 'react';
import { CartItem, StoreConfig } from '../types';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { buildCartWhatsAppUrl } from '../utils/whatsapp';

interface CartDrawerProps {
  isOpen: boolean;
  config: StoreConfig;
  cartItems: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
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
  const [customerCity, setCustomerCity] = useState('');
  const [notes, setNotes] = useState('');

  const totalPrice = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const whatsappCheckoutUrl = buildCartWhatsAppUrl(
    cartItems,
    config,
    customerName,
    customerCity,
    notes
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-xs animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-10 rtl:pl-0 rtl:pr-10">
        <div className="w-screen max-w-md bg-[#141414] shadow-2xl flex flex-col justify-between border-r border-rose-900/40 text-slate-200">
          
          {/* Drawer Header */}
          <div className="p-5 bg-[#181114] border-b border-rose-900/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-gradient-to-r from-rose-800 to-rose-900 text-white rounded-xl shadow-md border border-rose-700/50">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-100">سلة التسوق</h3>
                <p className="text-xs text-rose-300">
                  {totalCount > 0 ? `${totalCount} قطعة في السلة` : 'السلة فارغة'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-rose-300 hover:bg-rose-950/50 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body - Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-500">
                <div className="w-16 h-16 rounded-full bg-rose-950/40 border border-rose-900/30 flex items-center justify-center mb-4 text-rose-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-sm font-bold text-slate-200 mb-1">سلتك فارغة الآن 💕</p>
                <p className="text-xs text-zinc-400 max-w-xs mb-6">
                  استكشفي تشكيلة Rosa Accessories واختاري ما يعجبك لإضافته للسلة.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-800 to-rose-900 text-white text-xs font-bold shadow-md hover:from-rose-700 hover:to-rose-800 transition-all flex items-center gap-1.5 border border-rose-700/50 cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>تصفحي الأكسسوارات</span>
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-3 bg-[#191114] p-3 rounded-2xl border border-rose-900/30 items-center justify-between"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-16 h-16 rounded-xl object-cover border border-rose-900/30 shrink-0"
                        referrerPolicy="no-referrer"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-100 truncate mb-1">
                          {item.product.title}
                        </h4>
                        <div className="text-xs font-extrabold text-rose-300 mb-2">
                          {item.product.price} {config.currency}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 bg-[#22171b] border border-rose-900/40 rounded-lg p-0.5">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                              className="w-5 h-5 flex items-center justify-center text-rose-300 hover:bg-rose-900/60 rounded font-bold"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-slate-200">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="w-5 h-5 flex items-center justify-center text-rose-300 hover:bg-rose-900/60 rounded font-bold"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Total Item Price & Delete */}
                      <div className="flex flex-col items-end justify-between self-stretch">
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-zinc-500 hover:text-rose-400 p-1 transition-colors"
                          title="حذف القطعة"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <span className="text-xs font-extrabold text-rose-200">
                          {item.product.price * item.quantity} {config.currency}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Clear Cart link */}
                <div className="text-left pt-2">
                  <button
                    onClick={onClearCart}
                    className="text-[11px] text-zinc-500 hover:text-rose-400 underline cursor-pointer"
                  >
                    تفريغ السلة بالكامل
                  </button>
                </div>

                {/* Customer Information Form */}
                <div className="mt-4 pt-4 border-t border-rose-900/30 space-y-2 bg-[#191114] p-3.5 rounded-2xl border border-rose-900/30">
                  <p className="text-xs font-bold text-rose-300 mb-2">
                    معلومات التوصيل لطلب الواتساب (كافة الولايات 58):
                  </p>
                  <input
                    type="text"
                    placeholder="الاسم واللقب"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-[#20171b] border border-rose-900/40 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                  <input
                    type="text"
                    placeholder="الولاية والبلدية والعنوان بالتفصيل"
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    className="w-full bg-[#20171b] border border-rose-900/40 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                  <input
                    type="text"
                    placeholder="رقم هاتف ثانٍ أو ملاحظات للتوصيل (اختياري)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-[#20171b] border border-rose-900/40 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                </div>
              </>
            )}
          </div>

          {/* Drawer Footer - Total & WhatsApp Checkout Button */}
          {cartItems.length > 0 && (
            <div className="p-5 bg-[#171013] border-t border-rose-900/40 shadow-2xl space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-300">المجموع الكلي:</span>
                <span className="text-xl font-extrabold text-rose-300">
                  {totalPrice} {config.currency}
                </span>
              </div>

              <a
                href={whatsappCheckoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950/60"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>إرسال السلة بالكامل عبر الواتساب</span>
              </a>

              <p className="text-[11px] text-zinc-500 text-center">
                سيتم تحويلك مباشرة للواتساب لإتمام الطلب والتواصل مع خدمة العملاء
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
