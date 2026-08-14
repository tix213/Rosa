import React from 'react';
import { CategoryType, Product } from '../types';
import { CATEGORIES } from '../data/products';
import { Sparkles, ShoppingBag, Sparkle, Compass, Heart, Tag, CreditCard, Layers } from 'lucide-react';

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
  Layers: <Layers className="w-4 h-4" />,
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
        <h3 className="text-base sm:text-lg font-bold text-pink-950 flex items-center gap-2">
          <span>أقسام وتشكيلات الحقائب</span>
          <span className="text-xs font-semibold text-pink-700 bg-pink-100 px-3 py-0.5 rounded-full border border-pink-200">
            {products.length} حقائب متاحة
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
              className={`snap-start shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 border cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white border-pink-600 shadow-md shadow-pink-200 scale-102 ring-2 ring-pink-300'
                  : 'bg-white hover:bg-pink-50 text-pink-900 border-pink-200 hover:border-pink-300 shadow-2xs'
              }`}
            >
              <span className={isSelected ? 'text-pink-100' : 'text-pink-600'}>
                {ICON_MAP[cat.iconName] || <Sparkles className="w-4 h-4" />}
              </span>
              <span>{cat.name}</span>
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-pink-100 text-pink-700 border border-pink-200'
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
