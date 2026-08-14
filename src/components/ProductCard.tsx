import React, { useState } from 'react';
import { Product, StoreConfig } from '../types';
import { ShoppingBag, Sparkles, MessageCircle, Eye, ShieldCheck, Check } from 'lucide-react';
import { buildSingleProductWhatsAppUrl } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
  config: StoreConfig;
  onOpenModal: (product: Product, selectedColor?: string) => void;
  onAddToCart: (product: Product, quantity: number, selectedColor?: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  config,
  onOpenModal,
  onAddToCart,
}) => {
  // Active selected color / image for this card
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [addedNotice, setAddedNotice] = useState<boolean>(false);

  const hasColors = product.colors && product.colors.length > 0;
  const currentImage = hasColors && product.colors?.[selectedColorIndex]
    ? product.colors[selectedColorIndex].image
    : product.image;
  
  const currentColorName = hasColors && product.colors?.[selectedColorIndex]
    ? product.colors[selectedColorIndex].name
    : undefined;

  const whatsappDirectUrl = buildSingleProductWhatsAppUrl(
    product,
    1,
    config,
    undefined,
    undefined,
    undefined,
    undefined,
    currentColorName
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, 1, currentColorName);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 1800);
  };

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      onClick={() => onOpenModal(product, currentColorName)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-3xl overflow-hidden border border-pink-200/80 shadow-sm hover:shadow-xl hover:shadow-pink-200/60 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
    >
      <div>
        {/* Image Container with Badges */}
        <div className="relative aspect-1/1 overflow-hidden bg-pink-50/50">
          <img
            src={currentImage}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-pink-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Badges Top Right */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
            {product.isBestSeller && (
              <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                الأكثر طلباً
              </span>
            )}
            {product.isNew && (
              <span className="bg-pink-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-md">
                جديد البوتيك ✨
              </span>
            )}
          </div>

          {/* Discount Badge Top Left */}
          {discountPercent > 0 && (
            <div className="absolute top-3 left-3 bg-rose-600 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-md">
              خصم {discountPercent}%
            </div>
          )}

          {/* Quick View Button on Hover */}
          <div className="absolute inset-x-4 bottom-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hidden sm:block">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal(product, currentColorName);
              }}
              className="w-full py-2 px-3 rounded-xl bg-white/95 text-pink-900 hover:bg-white text-xs font-bold shadow-lg flex items-center justify-center gap-1.5 backdrop-blur-xs transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-pink-600" />
              <span>معاينة تفاصيل الحقيبة والألوان</span>
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5">
          {/* Bag Code & Stock */}
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-[11px] font-mono font-semibold text-pink-700 bg-pink-50 px-2 py-0.5 rounded-md border border-pink-200">
              {product.code || 'ROSA-01'}
            </span>
            <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              متوفرة بالمحل 🇩🇿
            </span>
          </div>

          {/* Product Title */}
          <h3 className="font-bold text-slate-800 text-sm sm:text-base mb-2 leading-snug line-clamp-2 group-hover:text-pink-600 transition-colors">
            {product.title}
          </h3>

          {/* Color Swatches Selector directly on Card */}
          {hasColors && product.colors && product.colors.length > 1 && (
            <div className="mb-3 pt-1 border-t border-pink-100">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-semibold text-pink-800">
                  الألوان ({product.colors.length}):
                </span>
                <span className="text-[11px] text-pink-600 font-medium truncate max-w-[140px]">
                  {product.colors[selectedColorIndex]?.name}
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap" onClick={(e) => e.stopPropagation()}>
                {product.colors.map((color, idx) => {
                  const isSelected = selectedColorIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedColorIndex(idx)}
                      title={color.name}
                      style={{ backgroundColor: color.colorCode }}
                      className={`w-5 h-5 rounded-full border-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-pink-600 ring-2 ring-pink-300 scale-110 shadow-xs'
                          : 'border-white opacity-80 hover:opacity-100 hover:scale-105'
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Price Section */}
          <div className="flex items-baseline gap-2 mb-3 mt-1">
            <span className="text-xl font-extrabold text-pink-700">
              {product.price} <span className="text-xs text-pink-800 font-bold">{config.currency}</span>
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-zinc-400 line-through">
                {product.originalPrice} {config.currency}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="p-4 pt-0 sm:p-5 sm:pt-0 space-y-2" onClick={(e) => e.stopPropagation()}>
        <a
          href={whatsappDirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-200 hover:scale-101"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>طلب فوري بالواتساب</span>
        </a>

        <button
          onClick={handleAddToCart}
          className={`w-full py-2 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all border cursor-pointer ${
            addedNotice
              ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
              : 'bg-pink-50 hover:bg-pink-100 text-pink-800 border-pink-200 hover:border-pink-300'
          }`}
        >
          {addedNotice ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>تمت الإضافة للسلة بنجاح!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5 text-pink-600" />
              <span>إضافة للسلة</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
