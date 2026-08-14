import React, { useState, useEffect, useRef } from 'react';
import { CategoryType, Product } from '../types';
import { CATEGORIES } from '../data/products';
import { 
  X, 
  Plus, 
  Image as ImageIcon, 
  Tag, 
  DollarSign, 
  CheckCircle2, 
  Upload, 
  Trash2, 
  Sparkles, 
  Percent, 
  Edit3, 
  Layers
} from 'lucide-react';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveProduct: (product: Product) => void;
  onDeleteProduct?: (productId: string) => void;
  initialProduct?: Product | null;
}

const SAMPLE_IMAGES = [
  { name: 'حقيبة يد كلاسيكية بيج', url: '/src/assets/images/hermes_classic_bag_1786678118984.jpg' },
  { name: 'طقم هيرميس أزرق ملكي', url: '/src/assets/images/hermes_blue_set_1786680461964.jpg' },
  { name: 'حقيبة غوتشي مونوغرام', url: '/src/assets/images/gucci_mini_bag_1786680473233.jpg' },
  { name: 'حقيبة ظهر نايكي سوداء', url: '/src/assets/images/nike_black_backpack_1786680488848.jpg' },
  { name: 'حقيبة كلاتش سهرات', url: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80' },
  { name: 'حقيبة ظهر أطفال', url: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80' }
];

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onSaveProduct,
  onDeleteProduct,
  initialProduct,
}) => {
  const isEditMode = !!initialProduct;

  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [originalPrice, setOriginalPrice] = useState<number | ''>('');
  const [category, setCategory] = useState<CategoryType>('women-handbags');
  const [imageUrl, setImageUrl] = useState('');
  const [galleryUrls, setGalleryUrls] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [material, setMaterial] = useState('');
  const [inStock, setInStock] = useState(true);
  const [isNew, setIsNew] = useState(true);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const mainFileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  // Initialize or reset when modal opens or initialProduct changes
  useEffect(() => {
    if (isOpen) {
      if (initialProduct) {
        setTitle(initialProduct.title || '');
        setCode(initialProduct.code || '');
        setPrice(initialProduct.price || '');
        setOriginalPrice(initialProduct.originalPrice || '');
        setCategory(initialProduct.category || 'necklaces');
        setImageUrl(initialProduct.image || '');
        setGalleryUrls(initialProduct.gallery || []);
        setDescription(initialProduct.description || '');
        setMaterial(initialProduct.material || 'معدن مقاوم للتغير والصدأ');
        setInStock(initialProduct.inStock ?? true);
        setIsNew(initialProduct.isNew ?? false);
        setIsBestSeller(initialProduct.isBestSeller ?? false);
      } else {
        setTitle('');
        setCode(`ROSA-${Math.floor(100 + Math.random() * 900)}`);
        setPrice('');
        setOriginalPrice('');
        setCategory('necklaces');
        setImageUrl('');
        setGalleryUrls([]);
        setDescription('');
        setMaterial('معدن مطلي عالي الجودة ومقاوم للصدأ');
        setInStock(true);
        setIsNew(true);
        setIsBestSeller(false);
      }
      setSavedSuccess(false);
    }
  }, [isOpen, initialProduct]);

  if (!isOpen) return null;

  // Handle uploading main image from local device/gallery
  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle uploading extra gallery images from local device/gallery
  const handleGalleryImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            if (event.target?.result) {
              setGalleryUrls((prev) => [...prev, event.target!.result as string]);
            }
          };
          reader.readAsDataURL(file);
        }
      }
    }
  };

  const handleRemoveGalleryImage = (indexToRemove: number) => {
    setGalleryUrls((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSetGalleryAsMain = (index: number) => {
    const selected = galleryUrls[index];
    if (selected) {
      const oldMain = imageUrl;
      setImageUrl(selected);
      setGalleryUrls((prev) => {
        const updated = prev.filter((_, idx) => idx !== index);
        return oldMain ? [oldMain, ...updated] : updated;
      });
    }
  };

  // Calculate discount
  const numPrice = typeof price === 'number' ? price : 0;
  const numOrigPrice = typeof originalPrice === 'number' ? originalPrice : 0;
  const discountPercentage = numOrigPrice > numPrice && numPrice > 0
    ? Math.round(((numOrigPrice - numPrice) / numOrigPrice) * 100)
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price) return;

    const finalProduct: Product = {
      id: initialProduct?.id || `custom-prod-${Date.now()}`,
      code: code.trim() || `ROSA-${Math.floor(100 + Math.random() * 900)}`,
      title: title.trim(),
      description: description.trim() || 'قطعة أكسسوار أنيقة ممتازة من Rosa Accessories.',
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      category,
      image: imageUrl.trim() || 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
      gallery: galleryUrls.length > 0 ? galleryUrls : undefined,
      inStock,
      isNew,
      isBestSeller,
      material: material.trim(),
    };

    onSaveProduct(finalProduct);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-[#141414] rounded-3xl shadow-2xl border border-rose-900/40 overflow-hidden my-auto p-5 sm:p-6 max-h-[92vh] flex flex-col justify-between text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 text-zinc-400 hover:text-rose-300 hover:bg-rose-950/50 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-rose-800 to-rose-900 text-white rounded-2xl shadow-md border border-rose-700/50">
            {isEditMode ? <Edit3 className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">
              {isEditMode ? 'تعديل المنتج والأسعار' : 'إضافة قطعة أكسسوار جديدة'}
            </h3>
            <p className="text-xs text-rose-300">
              {isEditMode ? 'تعديل السعر الحالي، السعر القديم والصور من جهازك' : 'إضافة منتجات وتحديد الأسعار والخصومات وصور المعرض'}
            </p>
          </div>
        </div>

        {savedSuccess && (
          <div className="mb-3 p-3 bg-emerald-950/70 border border-emerald-700 text-emerald-300 rounded-xl text-xs font-bold flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{isEditMode ? 'تم حفظ وتحديث تعديلات المنتج والأسعار بنجاح!' : 'تمت إضافة القطعة بنجاح وعرضها بالمتجر!'}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto pr-1 text-xs">
          
          {/* Title & Code */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="col-span-2">
              <label className="block font-bold text-slate-200 mb-1">اسم القطعة:</label>
              <input
                type="text"
                required
                placeholder="مثال: قلادة الوردة الذهبية"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#1b1417] border border-rose-900/40 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-200 mb-1">كود المنتج:</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="ROSA-101"
                className="w-full bg-[#1b1417] border border-rose-900/40 rounded-xl px-2.5 py-2 text-xs font-mono text-slate-100 focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
            </div>
          </div>

          {/* Pricing Section (Current Price & Old Price for Discount) */}
          <div className="bg-[#1a1215] p-3.5 rounded-2xl border border-rose-900/40 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-rose-300 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-rose-400" />
                <span>إعدادات الأسعار والخصومات</span>
              </span>
              {discountPercentage > 0 && (
                <span className="bg-rose-600/90 text-white font-extrabold px-2.5 py-0.5 rounded-full text-[11px] flex items-center gap-1 border border-rose-400/40">
                  <Percent className="w-3 h-3" />
                  خصم بنسبة {discountPercentage}%
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="block font-bold text-slate-200 mb-1">
                  السعر الحالي (ر.س) *:
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="مثال: 95"
                  value={price}
                  onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : '')}
                  className="w-full bg-[#20151a] border border-rose-800/60 rounded-xl px-3 py-2 text-xs font-bold text-rose-300 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-200 mb-1 text-zinc-400">
                  السعر القديم (قبل الخصم):
                </label>
                <input
                  type="number"
                  placeholder="مثال: 130"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value ? Number(e.target.value) : '')}
                  className="w-full bg-[#20151a] border border-rose-900/40 rounded-xl px-3 py-2 text-xs text-slate-300 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block font-bold text-slate-200 mb-1 flex items-center gap-0.5">
                  <Tag className="w-3.5 h-3.5 text-rose-400" />
                  <span>التصنيف:</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as CategoryType)}
                  className="w-full bg-[#20151a] border border-rose-900/40 rounded-xl px-2 py-2 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-rose-500 cursor-pointer"
                >
                  {CATEGORIES.filter(c => c.id !== 'all').map((c) => (
                    <option key={c.id} value={c.id} className="bg-[#141414] text-slate-100">{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {originalPrice && price && Number(originalPrice) <= Number(price) && (
              <p className="text-[10px] text-amber-400">
                💡 ملاحظة: لظهور شارة الخصم والسعر المشطوب، يجب أن يكون "السعر القديم" أعلى من "السعر الحالي".
              </p>
            )}
          </div>

          {/* MAIN IMAGE: Device Gallery Upload or URL */}
          <div className="bg-[#191114] p-3.5 rounded-2xl border border-rose-900/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-200 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-rose-400" />
                <span>الصورة الرئيسية للقطعة:</span>
              </label>
              {imageUrl && (
                <span className="text-[10px] text-emerald-400 font-medium">✓ تم تحديد صورة</span>
              )}
            </div>

            {/* Upload Button from Device Gallery */}
            <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
              <input
                ref={mainFileInputRef}
                type="file"
                accept="image/*"
                onChange={handleMainImageUpload}
                className="hidden"
              />
              
              <button
                type="button"
                onClick={() => mainFileInputRef.current?.click()}
                className="flex-1 py-2.5 px-3 bg-gradient-to-r from-rose-900/80 to-rose-950/90 hover:from-rose-800 hover:to-rose-900 text-rose-200 border border-rose-700/50 rounded-xl flex items-center justify-center gap-2 font-bold transition-all shadow-sm cursor-pointer"
              >
                <Upload className="w-4 h-4 text-rose-400" />
                <span>اختيار صورة من استوديو الجهاز (Gallery)</span>
              </button>

              <div className="text-[11px] text-zinc-400 text-center sm:text-right">أو ضع رابط:</div>
            </div>

            <input
              type="text"
              placeholder="https://... رابط صورة مباشر"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-[#1b1417] border border-rose-900/40 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
            />

            {/* Image Preview if available */}
            {imageUrl && (
              <div className="flex items-center gap-3 p-2 bg-[#140e11] rounded-xl border border-rose-900/30">
                <div className="w-14 h-14 rounded-lg overflow-hidden border border-rose-800/40 bg-black shrink-0">
                  <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-bold text-rose-200">معاينة الصورة الرئيسية</p>
                  <p className="text-[10px] text-zinc-400">ستظهر هذه الصورة في واجهة المتجر والبطاقات</p>
                </div>
                <button
                  type="button"
                  onClick={() => setImageUrl('')}
                  className="p-1.5 text-zinc-400 hover:text-rose-400 transition-colors"
                  title="حذف الصورة"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Quick Samples */}
            <div>
              <p className="text-[10px] text-zinc-400 mb-1">أو اختاري صورة نموذجية سريعة:</p>
              <div className="flex flex-wrap gap-1">
                {SAMPLE_IMAGES.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setImageUrl(sample.url)}
                    className={`text-[10px] px-2 py-0.5 rounded-full border transition-all cursor-pointer ${
                      imageUrl === sample.url
                        ? 'bg-rose-800 text-white border-rose-500 font-bold'
                        : 'bg-[#1e1519] hover:bg-[#281b21] text-zinc-300 border-rose-900/30'
                    }`}
                  >
                    {sample.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* EXTRA GALLERY IMAGES (معرض صور إضافية) */}
          <div className="bg-[#191114] p-3.5 rounded-2xl border border-rose-900/30 space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-200 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-rose-400" />
                <span>معرض صور إضافية للمنتج (Gallery):</span>
              </label>
              <span className="text-[10px] text-rose-300">
                {galleryUrls.length} صور إضافية
              </span>
            </div>

            <input
              ref={galleryFileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryImagesUpload}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => galleryFileInputRef.current?.click()}
              className="w-full py-2 px-3 bg-[#20151a] hover:bg-[#2a1b22] text-rose-300 border border-dashed border-rose-800/50 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold transition-all cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>+ إضافة صور إضافية من الأستوديو (يمكن اختيار عدة صور)</span>
            </button>

            {/* Gallery Thumbnails List */}
            {galleryUrls.length > 0 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 pt-1">
                {galleryUrls.map((img, idx) => (
                  <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border border-rose-900/40 bg-black">
                    <img src={img} alt={`gallery-${idx}`} className="w-full h-full object-cover" />
                    
                    <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 p-1">
                      <button
                        type="button"
                        onClick={() => handleSetGalleryAsMain(idx)}
                        className="text-[9px] bg-rose-800 text-white px-1.5 py-0.5 rounded shadow cursor-pointer"
                        title="تعيين كرئيسية"
                      >
                        رئيسية
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryImage(idx)}
                        className="p-1 bg-red-900/80 hover:bg-red-800 text-white rounded-full transition-colors cursor-pointer"
                        title="حذف"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Description & Material */}
          <div>
            <label className="block font-bold text-slate-200 mb-1">وصف المنتج:</label>
            <textarea
              rows={2}
              placeholder="اكتبي وصف جذاب للقطعة ومميزاتها..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#1b1417] border border-rose-900/40 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-rose-500 resize-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-200 mb-1">المعادن وتفاصيل القطعة:</label>
            <input
              type="text"
              placeholder="مثال: مطلي بالذهب عيار 18 وزركون نقي مقاوم للصدأ"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full bg-[#1b1417] border border-rose-900/40 rounded-xl px-3 py-1.5 text-xs text-slate-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
          </div>

          {/* Badges & Stock */}
          <div className="flex flex-wrap items-center gap-4 pt-1 bg-[#1a1215] p-2.5 rounded-xl border border-rose-900/30">
            <label className="flex items-center gap-1.5 text-xs text-slate-200 cursor-pointer">
              <input
                type="checkbox"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
                className="accent-emerald-600 rounded cursor-pointer"
              />
              <span>متوفر بالمتجر</span>
            </label>

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

          {/* Submit & Delete Buttons */}
          <div className="pt-2 flex items-center gap-2">
            {isEditMode && onDeleteProduct && initialProduct && (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`هل أنت متأكد من رغبتك في حذف "${initialProduct.title}"؟`)) {
                    onDeleteProduct(initialProduct.id);
                    onClose();
                  }
                }}
                className="py-3 px-4 bg-red-950/60 hover:bg-red-900/80 text-red-300 font-bold rounded-2xl flex items-center justify-center gap-1.5 transition-all border border-red-800/40 cursor-pointer"
                title="حذف هذا المنتج"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">حذف</span>
              </button>
            )}

            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-gradient-to-r from-rose-800 to-rose-900 hover:from-rose-700 hover:to-rose-800 text-white font-bold text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-950/60 border border-rose-700/50 cursor-pointer"
            >
              {isEditMode ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              <span>{isEditMode ? 'حفظ التعديلات وتحديث الأسعار' : 'إضافة القطعة للمتجر'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

