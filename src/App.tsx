import { useState, useEffect, useMemo } from 'react';
import { Product, CartItem, StoreConfig, CategoryType } from './types';
import { INITIAL_PRODUCTS, DEFAULT_STORE_CONFIG } from './data/products';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { MessageCircle, SlidersHorizontal, Sparkles } from 'lucide-react';
import { formatPhoneNumber } from './utils/whatsapp';

export default function App() {
  // Store Config state with localStorage backup
  const [config] = useState<StoreConfig>(() => {
    return DEFAULT_STORE_CONFIG;
  });

  // Products state
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);

  // Cart state with localStorage backup
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('rosa_pink_cart_items');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [];
  });

  // UI state
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'popular'>('default');
  
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [detailSelectedColor, setDetailSelectedColor] = useState<string | undefined>(undefined);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('rosa_pink_cart_items', JSON.stringify(cartItems));
  }, [cartItems]);

  // Open modal with specific color
  const handleOpenModal = (product: Product, selectedColor?: string) => {
    setDetailProduct(product);
    setDetailSelectedColor(selectedColor);
  };

  // Cart handlers (matching product ID + selectedColor)
  const handleAddToCart = (product: Product, quantity: number = 1, selectedColor?: string) => {
    // If no color selected and product has colors, default to first color
    const effectiveColor = selectedColor || (product.colors && product.colors.length > 0 ? product.colors[0].name : undefined);

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === effectiveColor
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity, selectedColor: effectiveColor }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number, selectedColor?: string) => {
    if (quantity <= 0) {
      handleRemoveItem(productId, selectedColor);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedColor === selectedColor
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string, selectedColor?: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedColor === selectedColor)
      )
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Filter & Sort products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.code && p.code.toLowerCase().includes(q)) ||
          (p.material && p.material.toLowerCase().includes(q)) ||
          p.colors?.some(c => c.name.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'popular') {
      list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }

    return list;
  }, [products, selectedCategory, searchQuery, sortBy]);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cleanPhone = formatPhoneNumber(config.whatsappNumber);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#fdf2f4] via-[#fcf0f2] to-[#fae8eb] text-slate-800 selection:bg-pink-300 selection:text-pink-950 relative overflow-hidden">
      
      {/* Subtle Feminine Ambient Glows */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-pink-300/30 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-rose-200/40 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Header */}
      <Header
        config={config}
        cartCount={totalCartCount}
        products={products}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelectProduct={(prod) => handleOpenModal(prod)}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        
        {/* Hero Banner */}
        <HeroBanner config={config} />

        {/* Category Filters */}
        <div id="products-section">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            products={products}
          />
        </div>

        {/* Toolbar: Sorting & Count */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 bg-white p-4 rounded-2xl border border-pink-200 shadow-sm">
          <div className="text-xs sm:text-sm text-slate-600 font-medium flex items-center gap-2 flex-wrap">
            <span>عرض نتائج:</span>
            <span className="font-bold text-pink-700 bg-pink-100 px-2.5 py-0.5 rounded-full border border-pink-200">
              {filteredProducts.length} حقائب
            </span>
            {searchQuery && (
              <span className="text-slate-500">
                للبحث عن: "<span className="text-pink-700 font-bold">{searchQuery}</span>"
              </span>
            )}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-pink-600 hover:text-pink-800 underline cursor-pointer"
              >
                إلغاء البحث
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-pink-600 shrink-0" />
            <span className="text-xs text-slate-600 shrink-0">ترتيب حسب:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-pink-50/70 border border-pink-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 cursor-pointer"
            >
              <option value="default">الافتراضي (الموصى به)</option>
              <option value="popular">الأكثر طلباً</option>
              <option value="price-asc">الأقل سعراً</option>
              <option value="price-desc">الأعلى سعراً</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-pink-200 shadow-sm max-w-md mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mx-auto mb-4 border border-pink-200">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1">لا توجد حقائب مطابقة للبحث</h3>
            <p className="text-xs text-slate-500 mb-6">
              جرّبي كتابة كلمات بحث أخرى مثل "وردي"، "بيج"، "أرنوب"، "هيرميس"، أو استعراض قسم آخر.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 text-white text-xs font-bold shadow-md hover:from-pink-700 hover:to-rose-700 transition-all cursor-pointer"
            >
              عرض جميع تشكيلات الحقائب
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                config={config}
                onOpenModal={handleOpenModal}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}

      </main>

      {/* Floating Speed Dial WhatsApp Button */}
      <a
        href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('مرحباً بوتيك Rosa للحقائب بالجزائر 🇩🇿، أود الاستفسار والطلب عبر الواتساب 👜🌸')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-40 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl shadow-emerald-700/40 flex items-center gap-2.5 transition-all duration-300 hover:scale-110 group border-2 border-white"
        title="تواصل مباشر بالواتساب"
      >
        <MessageCircle className="w-6 h-6 fill-current animate-pulse" />
        <span className="hidden sm:inline font-bold text-xs sm:text-sm">اطلبي عبر الواتساب</span>
      </a>

      {/* Product Detail Modal */}
      <ProductModal
        product={detailProduct}
        initialColor={detailSelectedColor}
        config={config}
        onClose={() => {
          setDetailProduct(null);
          setDetailSelectedColor(undefined);
        }}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        config={config}
        cartItems={cartItems}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Footer */}
      <Footer
        config={config}
      />

    </div>
  );
}
