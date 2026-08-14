import React from 'react';
import { Category, CategoryType, Product } from '../types';
import { CATEGORIES } from '../data/products';
import { Sparkles, ShoppingBag, Sparkle, Compass, Heart, Tag, CreditCard } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  products: Product[];
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-4 h-4" />,
  ShoppingBag: <ShoppingBag className="w-4 h-4" />,
  Sparkle: <Sparkle className="w-4 h-4" />,
  Compass: <Compass className="w-4 h-4" />,
  Heart: <Heart className="w-4 h-4" />,
  Tag: <Tag className="w-4 h-4" />,
  CreditCard: <CreditCard className="w-4 h-4" />,
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  products,
}) => {
  const getCategoryCount = (catId: CategoryType) => {
    if (catId === 'all') return products.length;
    return products.filter((p) => p.category === catId).length;
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
          <span>أقسام الحقائب</span>
          <span className="text-xs font-medium text-rose-300 bg-rose-950/50 px-2.5 py-0.5 rounded-full border border-rose-800/40">
            {products.length} حقيبة متاحة
          </span>
        </h3>
      </div>

      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none snap-x">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = getCategoryCount(cat.id);

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`snap-start shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-rose-800 to-rose-950 text-white border-rose-500 shadow-lg shadow-rose-950/60 scale-102 ring-1 ring-rose-500/50'
                  : 'bg-[#151515] hover:bg-[#1c1c1c] text-slate-300 hover:text-rose-200 border-rose-900/30 hover:border-rose-700/50'
              }`}
            >
              <span className={isSelected ? 'text-amber-400' : 'text-rose-400'}>
                {ICON_MAP[cat.iconName] || <Sparkles className="w-4 h-4" />}
              </span>
              <span>{cat.name}</span>
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-rose-950/70 text-rose-300 border border-rose-900/40'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
