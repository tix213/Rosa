import React from 'react';
import { Product, StoreConfig } from '../types';
import { MessageCircle, ShoppingBag, Eye, Sparkles } from 'lucide-react';
import { buildSingleProductWhatsAppUrl } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
  config: StoreConfig;
  onOpenDetail: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  config,
  onOpenDetail,
  onAddToCart,
}) => {
  const directWhatsAppUrl = buildSingleProductWhatsAppUrl(product, 1, config);

  const discountPercentage = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-[#141414] rounded-2xl border border-rose-900/30 hover:border-rose-600/50 shadow-lg hover:shadow-2xl hover:shadow-rose-950/40 transition-all duration-300 flex flex-col overflow-hidden transform hover:-translate-y-1">
      {/* Product Image Section */}
      <div 
        className="relative aspect-4/3 sm:aspect-1/1 overflow-hidden bg-[#1a1215] cursor-pointer"
        onClick={() => onOpenDetail(product)}
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80';
          }}
        />

        {/* Badges */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="px-2.5 py-1 rounded-full bg-amber-500/90 backdrop-blur-md text-slate-950 text-[11px] font-bold shadow-xs flex items-center gap-1 border border-amber-300/40">
              <Sparkles className="w-3 h-3" />
              الأكثر مبيعاً
            </span>
          )}
          {product.isNew && (
            <span className="px-2.5 py-1 rounded-full bg-rose-700/90 backdrop-blur-md text-white text-[11px] font-bold shadow-xs border border-rose-500/40">
              وصل حديثاً ✨
            </span>
          )}
        </div>

        {discountPercentage > 0 && (
          <div className="absolute top-2.5 left-2.5 z-10 bg-rose-600 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-full shadow-xs border border-rose-400/40">
            خصم {discountPercentage}%
          </div>
        )}

        {/* Hover Quick View Overlay */}
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 backdrop-blur-[2px]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetail(product);
            }}
            className="px-4 py-2 rounded-full bg-[#181818]/90 hover:bg-[#222222] text-rose-200 text-xs font-bold shadow-lg flex items-center gap-1.5 transition-all transform scale-90 group-hover:scale-100 border border-rose-700/50"
          >
            <Eye className="w-4 h-4 text-rose-400" />
            <span>عرض التفاصيل</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Product Code */}
          <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1">
            <span className="font-mono bg-[#1c1c1c] text-rose-300/80 px-1.5 py-0.5 rounded border border-rose-900/30">
              {product.code || 'ROSA-BAG'}
            </span>
            <span className={product.inStock ? 'text-emerald-400 font-medium' : 'text-rose-400'}>
              {product.inStock ? '• متوفر بالمحل' : 'غير متوفر'}
            </span>
          </div>

          {/* Title */}
          <h4 
            onClick={() => onOpenDetail(product)}
            className="text-sm sm:text-base font-bold text-slate-100 line-clamp-2 hover:text-rose-300 transition-colors cursor-pointer mb-2 leading-snug"
          >
            {product.title}
          </h4>
        </div>

        {/* Pricing & WhatsApp Actions */}
        <div className="mt-3 pt-3 border-t border-rose-950/60">
          <div className="flex items-baseline justify-between gap-2 mb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-lg sm:text-xl font-extrabold text-rose-300">
                {product.price} <span className="text-xs font-medium text-rose-400">{config.currency}</span>
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-zinc-500 line-through">
                  {product.originalPrice} {config.currency}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-5 gap-2">
            {/* Direct WhatsApp Order Button */}
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-4 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-md hover:shadow-emerald-950/50"
              title="طلب مباشر عبر الواتساب"
            >
              <MessageCircle className="w-4 h-4 fill-current shrink-0" />
              <span>اطلبي بالواتساب</span>
            </a>

            {/* Add to Cart Button */}
            <button
              onClick={() => onAddToCart(product)}
              className="col-span-1 p-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-200 border border-rose-800/40 transition-all flex items-center justify-center hover:scale-105 active:scale-95 cursor-pointer"
              title="أضفي للسلة"
            >
              <ShoppingBag className="w-4.5 h-4.5 text-rose-400" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

