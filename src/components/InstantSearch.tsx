import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Sparkles, ArrowLeft, Tag, ShoppingBag, Eye } from 'lucide-react';
import { Product, CategoryType } from '../types';
import { CATEGORIES } from '../data/products';

interface InstantSearchProps {
  products: Product[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSelectProduct: (product: Product) => void;
  onSelectCategory: (category: CategoryType) => void;
  currency: string;
  isMobile?: boolean;
}

const POPULAR_SEARCH_TAGS = [
  'Hurmes',
  'حقيبة يد كلاسيكية',
  'Classic Handbags',
  'جلد مستورد فاخر',
  'بيج نيود',
  '3200 د.ج'
];

export const InstantSearch: React.FC<InstantSearchProps> = ({
  products,
  searchQuery,
  setSearchQuery,
  onSelectProduct,
  onSelectCategory,
  currency,
  isMobile = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter products live
  const matchingProducts = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.trim().toLowerCase();
    return products.filter((p) =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.code && p.code.toLowerCase().includes(q)) ||
      (p.material && p.material.toLowerCase().includes(q)) ||
      CATEGORIES.find((c) => c.id === p.category)?.name.toLowerCase().includes(q)
    );
  }, [products, searchQuery]);

  // Matching categories
  const matchingCategories = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.trim().toLowerCase();
    return CATEGORIES.filter(
      (c) => c.id !== 'all' && (c.name.toLowerCase().includes(q) || q.includes(c.name.toLowerCase()))
    );
  }, [searchQuery]);

  const handleSelectTag = (tag: string) => {
    setSearchQuery(tag);
    setIsOpen(true);
    inputRef.current?.focus();
  };

  const handleSelectCategory = (catId: CategoryType) => {
    onSelectCategory(catId);
    setIsOpen(false);
    // Scroll smoothly to products
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    onSelectProduct(product);
    setIsOpen(false);
  };

  // Helper to highlight matching text
  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query.trim()})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === query.trim().toLowerCase() ? (
            <mark key={i} className="bg-rose-500/30 text-rose-300 font-semibold px-0.5 rounded">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div ref={containerRef} className={`relative w-full ${isMobile ? '' : 'max-w-lg'}`}>
      {/* Search Input Bar */}
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          placeholder="ابحثي عن حقيبة يد، سهرة، أطفال، حقيبة ظهر، كود..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className={`w-full bg-[#161616] text-slate-100 placeholder-zinc-500 border border-rose-900/30 focus:border-rose-500/80 rounded-full py-2.5 pr-11 pl-10 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-rose-500/50 shadow-inner transition-all ${
            isOpen ? 'border-rose-500/60 ring-1 ring-rose-500/30 bg-[#1a1a1a]' : 'hover:border-rose-900/60'
          }`}
        />
        
        {/* Search Icon */}
        <div className="absolute right-3.5 flex items-center pointer-events-none text-rose-400">
          <Search className="w-4 h-4" />
        </div>

        {/* Clear Button */}
        {searchQuery && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              inputRef.current?.focus();
            }}
            className="absolute left-3 p-1 rounded-full text-zinc-400 hover:text-rose-300 hover:bg-rose-950/50 transition-colors"
            title="مسح البحث"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Instant Suggestions Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-[#141414] border border-rose-900/40 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl animate-fade-in divide-y divide-rose-950/60 max-h-[80vh] sm:max-h-[480px] flex flex-col">
          
          {/* Case 1: Typing with matching results */}
          {searchQuery.trim() ? (
            <div className="overflow-y-auto flex-1 p-2 divide-y divide-rose-950/40">
              
              {/* Category Suggestions if matching */}
              {matchingCategories.length > 0 && (
                <div className="p-2">
                  <div className="text-[11px] font-bold text-rose-400/90 mb-1.5 flex items-center gap-1.5">
                    <Tag className="w-3 h-3 text-rose-400" />
                    <span>الانتقال المباشر للقسم:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {matchingCategories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleSelectCategory(cat.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/40 border border-rose-900/50 text-rose-200 text-xs hover:bg-rose-900/40 hover:border-rose-500/50 transition-all cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>قسم {cat.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Matching Products List */}
              <div className="p-2 space-y-1">
                <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-2 px-1">
                  <span className="font-semibold text-rose-300">
                    اقتراحات المنتجات ({matchingProducts.length})
                  </span>
                  <span className="text-[10px] text-zinc-500">
                    انقري لعرض التفاصيل
                  </span>
                </div>

                {matchingProducts.length > 0 ? (
                  <div className="space-y-1">
                    {matchingProducts.slice(0, 6).map((product) => {
                      const categoryName = CATEGORIES.find((c) => c.id === product.category)?.name;
                      return (
                        <div
                          key={product.id}
                          onClick={() => handleSelectProduct(product)}
                          className="group flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-rose-950/30 border border-transparent hover:border-rose-900/30 transition-all cursor-pointer"
                        >
                          {/* Thumbnail */}
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-11 h-11 rounded-lg overflow-hidden bg-[#1f1f1f] border border-rose-900/30 shrink-0">
                              <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            
                            {/* Details */}
                            <div className="min-w-0">
                              <h5 className="text-xs sm:text-sm font-medium text-slate-200 group-hover:text-rose-200 truncate leading-snug">
                                {highlightMatch(product.title, searchQuery)}
                              </h5>
                              <div className="flex items-center gap-2 text-[11px] text-zinc-400 mt-0.5">
                                <span className="text-rose-400/80 font-mono text-[10px] bg-rose-950/40 px-1 rounded border border-rose-900/20">
                                  {product.code || 'ROSA'}
                                </span>
                                <span>•</span>
                                <span className="text-zinc-400">{categoryName}</span>
                              </div>
                            </div>
                          </div>

                          {/* Price & Action */}
                          <div className="flex items-center gap-2 shrink-0 text-left">
                            <div className="text-right">
                              <span className="text-xs sm:text-sm font-bold text-rose-300">
                                {product.price} {currency}
                              </span>
                              {product.originalPrice && product.originalPrice > product.price && (
                                <div className="text-[10px] text-zinc-500 line-through">
                                  {product.originalPrice} {currency}
                                </div>
                              )}
                            </div>
                            <div className="w-7 h-7 rounded-lg bg-rose-950/50 group-hover:bg-rose-800 text-rose-300 group-hover:text-white flex items-center justify-center transition-colors border border-rose-900/30">
                              <Eye className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-8 text-center px-4">
                    <div className="w-10 h-10 rounded-full bg-rose-950/40 text-rose-400 flex items-center justify-center mx-auto mb-2 border border-rose-900/30">
                      <Search className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-semibold text-slate-300 mb-1">
                      لا توجد أكسسوارات مطابقة لـ "{searchQuery}"
                    </p>
                    <p className="text-[11px] text-zinc-500 max-w-xs mx-auto mb-3">
                      جرّبي البحث بكلمات عامة مثل (قلادة، حلق، سوار، لؤلؤ، ذهب).
                    </p>
                  </div>
                )}

              </div>
            </div>
          ) : (
            /* Case 2: Empty input -> Popular Search Keywords & Category Quick Links */
            <div className="p-4 space-y-4">
              
              {/* Popular Searches */}
              <div>
                <div className="text-[11px] font-bold text-rose-300/80 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>عمليات البحث الشائعة والأكثر طلباً:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_SEARCH_TAGS.map((tag, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectTag(tag)}
                      className="px-2.5 py-1 rounded-full bg-[#1c1c1c] hover:bg-rose-950/50 text-slate-300 hover:text-rose-200 text-xs border border-rose-900/20 hover:border-rose-700/40 transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Search className="w-3 h-3 text-rose-400/70" />
                      <span>{tag}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Categories Navigation */}
              <div className="pt-2 border-t border-rose-950/60">
                <div className="text-[11px] font-bold text-rose-300/80 mb-2 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-rose-400" />
                  <span>تصفح حسب الأقسام السريعة:</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleSelectCategory(cat.id)}
                      className="p-2 rounded-xl bg-[#181818] hover:bg-rose-950/40 text-slate-300 hover:text-rose-200 text-xs border border-rose-900/20 hover:border-rose-500/40 transition-all text-center flex items-center justify-center gap-1.5"
                    >
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Footer Bar of Dropdown */}
          <div className="p-2.5 bg-[#0f0f0f] flex items-center justify-between text-[11px] text-zinc-400 px-3">
            <span className="flex items-center gap-1 text-zinc-400">
              <ShoppingBag className="w-3.5 h-3.5 text-rose-400" />
              <span>متجر Rosa Accessories الفاخر</span>
            </span>

            {searchQuery.trim() && matchingProducts.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs font-bold text-rose-300 hover:text-rose-100 flex items-center gap-1 bg-rose-950/60 hover:bg-rose-900/60 px-2.5 py-1 rounded-lg border border-rose-800/40 transition-all cursor-pointer"
              >
                <span>عرض جميع النتائج ({matchingProducts.length})</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>
      )}
    </div>
  );
};
