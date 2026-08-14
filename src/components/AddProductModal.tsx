import React, { useState } from 'react';
import { CategoryType, Product } from '../types';
import { CATEGORIES } from '../data/products';
import { X, Plus, Image as ImageIcon, Tag, DollarSign, CheckCircle2 } from 'lucide-react';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Product) => void;
}

const SAMPLE_IMAGES = [
  { name: 'قلادة ذهبية زركون', url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80' },
  { name: 'أقراط لؤلؤ', url: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80' },
  { name: 'سوار فراشة روز جولد', url: 'https://images.unsplash.com/photo-1611591475170-438492d7736f?auto=format&fit=crop&w=800&q=80' },
  { name: 'خواتم كريستال', url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80' },
  { name: 'طقم سهرة ملكي', url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80' },
  { name: 'حقيبة كلاتش ذهبية', url: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80' }
];

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onAddProduct,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [code, setCode] = useState(`ROSA-${Math.floor(100 + Math.random() * 900)}`);
  const [price, setPrice] = useState<number | ''>('');
  const [originalPrice, setOriginalPrice] = useState<number | ''>('');
  const [category, setCategory] = useState<CategoryType>('necklaces');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [material, setMaterial] = useState('معدن مقاوم للتغير والصدأ');
  const [isNew, setIsNew] = useState(true);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price) return;

    const newProduct: Product = {
      id: `custom-prod-${Date.now()}`,
      code: code.trim(),
      title: title.trim(),
      description: description.trim() || 'قطعة أكسسوار أنيقة ممتازة من Rosa Accessories.',
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      category,
      image: imageUrl.trim() || 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
      inStock: true,
      isNew,
      isBestSeller,
      material: material.trim(),
    };

    onAddProduct(newProduct);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-[#141414] rounded-3xl shadow-2xl border border-rose-900/40 overflow-hidden my-auto p-6 max-h-[90vh] flex flex-col justify-between text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 text-zinc-400 hover:text-rose-300 hover:bg-rose-950/50 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-rose-800 to-rose-900 text-white rounded-2xl shadow-md border border-rose-700/50">
            <Plus className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">إضافة قطعة أكسسوار جديدة</h3>
            <p className="text-xs text-rose-300">أضيفي قطع جديدة لكتالوج متجر Rosa Accessories</p>
          </div>
        </div>

        {addedSuccess && (
          <div className="mb-3 p-3 bg-emerald-950/60 border border-emerald-800 text-emerald-300 rounded-xl text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>تم إضافة المنتج بنجاح وعرضه بالمتجر!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 overflow-y-auto pr-1">
          {/* Title & Code */}
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <label className="block text-xs font-bold text-slate-200 mb-1">اسم القطعة:</label>
              <input
                type="text"
                required
                placeholder="مثال: قلادة الشجرة الذهب"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#1b1417] border border-rose-900/40 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1">الكود:</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-[#1b1417] border border-rose-900/40 rounded-xl px-2.5 py-2 text-xs font-mono text-slate-100 focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
            </div>
          </div>

          {/* Prices & Category */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1 flex items-center gap-0.5">
                <DollarSign className="w-3.5 h-3.5 text-rose-400" />
                <span>السعر (ر.س):</span>
              </label>
              <input
                type="number"
                required
                min="1"
                placeholder="85"
                value={price}
                onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : '')}
                className="w-full bg-[#1b1417] border border-rose-900/40 rounded-xl px-3 py-2 text-xs font-bold text-rose-300 focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1">السعر السابق:</label>
              <input
                type="number"
                placeholder="110"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value ? Number(e.target.value) : '')}
                className="w-full bg-[#1b1417] border border-rose-900/40 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1 flex items-center gap-0.5">
                <Tag className="w-3.5 h-3.5 text-rose-400" />
                <span>التصنيف:</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryType)}
                className="w-full bg-[#1b1417] border border-rose-900/40 rounded-xl px-2 py-2 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-rose-500 cursor-pointer"
              >
                {CATEGORIES.filter(c => c.id !== 'all').map((c) => (
                  <option key={c.id} value={c.id} className="bg-[#141414] text-slate-100">{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Image URL & Quick sample chooser */}
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1 flex items-center gap-1">
              <ImageIcon className="w-3.5 h-3.5 text-rose-400" />
              <span>رابط صورة القطعة:</span>
            </label>
            <input
              type="url"
              placeholder="https://..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-[#1b1417] border border-rose-900/40 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-rose-500 mb-2"
            />
            <p className="text-[11px] text-zinc-400 mb-1">أو اختاري صورة نموذجية جاهزة:</p>
            <div className="flex flex-wrap gap-1.5">
              {SAMPLE_IMAGES.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setImageUrl(sample.url)}
                  className={`text-[10px] px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                    imageUrl === sample.url
                      ? 'bg-rose-800 text-white border-rose-600 font-bold'
                      : 'bg-[#1e1519] hover:bg-[#281b21] text-zinc-300 border-rose-900/30'
                  }`}
                >
                  {sample.name}
                </button>
              ))}
            </div>
          </div>

          {/* Description & Material */}
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1">وصف المنتج:</label>
            <textarea
              rows={2}
              placeholder="كتبي وصف مختصر وجذاب للقطعة..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#1b1417] border border-rose-900/40 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-rose-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1">المعادن والتفاصيل:</label>
            <input
              type="text"
              placeholder="مطلي بالذهب عيار 18 وزركون نقي"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full bg-[#1b1417] border border-rose-900/40 rounded-xl px-3 py-1.5 text-xs text-slate-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
          </div>

          {/* Checkbox badges */}
          <div className="flex items-center gap-4 pt-1">
            <label className="flex items-center gap-1.5 text-xs text-slate-200 cursor-pointer">
              <input
                type="checkbox"
                checked={isNew}
                onChange={(e) => setIsNew(e.target.checked)}
                className="accent-rose-700 rounded cursor-pointer"
              />
              <span>شارة وصل حديثاً ✨</span>
            </label>

            <label className="flex items-center gap-1.5 text-xs text-slate-200 cursor-pointer">
              <input
                type="checkbox"
                checked={isBestSeller}
                onChange={(e) => setIsBestSeller(e.target.checked)}
                className="accent-amber-500 rounded cursor-pointer"
              />
              <span>شارة الأكثر مبيعاً 👑</span>
            </label>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-rose-800 to-rose-900 hover:from-rose-700 hover:to-rose-800 text-white font-bold text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-950/60 border border-rose-700/50 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة القطعة للمتجر</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
