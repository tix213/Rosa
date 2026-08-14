import React from 'react';
import { ShoppingBag, Settings, Plus, Sparkles, MessageCircle } from 'lucide-react';
import { StoreConfig, Product, CategoryType } from '../types';
import { BRAND_LOGO_IMAGE } from '../data/products';
import { formatPhoneNumber } from '../utils/whatsapp';
import { InstantSearch } from './InstantSearch';

interface HeaderProps {
  config: StoreConfig;
  cartCount: number;
  products: Product[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSelectProduct: (product: Product) => void;
  onSelectCategory: (category: CategoryType) => void;
  onOpenCart: () => void;
  onOpenSettings: () => void;
  onOpenAddProduct: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  config,
  cartCount,
  products,
  searchQuery,
  setSearchQuery,
  onSelectProduct,
  onSelectCategory,
  onOpenCart,
  onOpenSettings,
  onOpenAddProduct,
}) => {
  const cleanPhone = formatPhoneNumber(config.whatsappNumber);

  return (
    <header className="sticky top-0 z-40 bg-[#0e0e0e]/95 backdrop-blur-md border-b border-rose-900/30 shadow-xl transition-all">
      {/* Top Announcement Bar */}
      {config.announcementText && (
        <div className="bg-gradient-to-r from-rose-950 via-rose-900 to-amber-950 text-rose-200 py-1.5 px-4 text-xs font-medium text-center flex items-center justify-center gap-2 border-b border-rose-900/40">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>{config.announcementText}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3">
          
          {/* Right Section: Brand Logo & Title */}
          <div className="flex items-center gap-3">
            <div 
              className="relative group cursor-pointer" 
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('all');
              }}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-rose-700/60 shadow-lg shadow-rose-950/50 p-0.5 bg-[#1a1215] group-hover:scale-105 transition-transform duration-300">
                <img
                  src={BRAND_LOGO_IMAGE}
                  alt={config.storeName}
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#0e0e0e] rounded-full shadow-xs"></span>
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-rose-200 via-rose-100 to-amber-200 bg-clip-text text-transparent tracking-tight">
                {config.storeName}
              </h1>
              <p className="text-xs text-rose-400/90 font-medium">
                متجر الحقائب النسائية وحقائب الأطفال بالجزائر 🇩🇿
              </p>
            </div>
          </div>

          {/* Center Section: Instant Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-lg mx-6">
            <InstantSearch
              products={products}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSelectProduct={onSelectProduct}
              onSelectCategory={onSelectCategory}
              currency={config.currency}
            />
          </div>

          {/* Left Section: WhatsApp Direct Chat & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Direct WhatsApp button */}
            <a
              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('مرحباً متجر Rosa للحقائب بالجزائر 🇩🇿، أود الاستفسار والطلب عبر الواتساب 👜💕')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-md hover:shadow-emerald-900/40 hover:scale-102"
              title="تواصل مباشر عبر الواتساب"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>واتساب المتجر</span>
            </a>

            {/* Add product button (Shop Owner) */}
            <button
              onClick={onOpenAddProduct}
              className="p-2 sm:px-3 sm:py-2 rounded-full bg-rose-950/40 hover:bg-rose-900/50 text-rose-200 text-xs sm:text-sm font-medium flex items-center gap-1 transition-all border border-rose-800/40 hover:border-rose-600/60"
              title="إضافة منتج جديد"
            >
              <Plus className="w-4 h-4 text-rose-400" />
              <span className="hidden sm:inline">إضافة منتج</span>
            </button>

            {/* Settings Button */}
            <button
              onClick={onOpenSettings}
              className="p-2.5 rounded-full bg-[#181818] hover:bg-rose-950/50 text-slate-300 hover:text-rose-200 transition-colors border border-rose-900/30"
              title="إعدادات رقم الواتساب والمتجر"
            >
              <Settings className="w-4.5 h-4.5" />
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-gradient-to-r from-rose-800 to-rose-900 text-white hover:from-rose-700 hover:to-rose-800 transition-all shadow-lg shadow-rose-950/60 flex items-center justify-center border border-rose-700/50 hover:scale-105 active:scale-95"
              title="السلة"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-slate-950 text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0e0e0e] shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Instant Search Bar */}
        <div className="md:hidden pb-3">
          <InstantSearch
            products={products}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSelectProduct={onSelectProduct}
            onSelectCategory={onSelectCategory}
            currency={config.currency}
            isMobile={true}
          />
        </div>

      </div>
    </header>
  );
};

