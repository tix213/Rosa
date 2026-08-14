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

  // Products state - only the single Hurmes classic handbag
  const [products] = useState<Product[]>(() => {
    // Clear any previous cached lists
    if (typeof window !== 'undefined') {
      localStorage.removeItem('rosa_store_config');
      localStorage.removeItem('rosa_products_list');
      localStorage.removeItem('rosa_store_config_v2');
      localStorage.removeItem('rosa_products_list_v2');
      localStorage.removeItem('rosa_bags_store_config_v3');
      localStorage.removeItem('rosa_bags_products_v3');
    }
    return INITIAL_PRODUCTS;
  });

  // Cart state with localStorage backup
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('rosa_cart_items');
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
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('rosa_bags_store_config_v3', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem('rosa_bags_products_v3', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('rosa_cart_items', JSON.stringify(cartItems));
  }, [cartItems]);

  // Cart handlers
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
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
          (p.material && p.material.toLowerCase().includes(q))
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
    <div className="min-h-screen flex flex-col bg-[#0c0c0c] text-slate-200 selection:bg-rose-900/50 selection:text-rose-200 relative overflow-hidden">
      
      {/* Subtle Luxury Ambient Glows */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-rose-950/15 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-amber-950/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Header */}
      <Header
        config={config}
        cartCount={totalCartCount}
        products={products}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelectProduct={(prod) => setDetailProduct(prod)}
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 bg-[#141414] p-4 rounded-2xl border border-rose-900/30 shadow-lg">
          <div className="text-xs sm:text-sm text-zinc-400 font-medium flex items-center gap-2 flex-wrap">
            <span>عرض نتائج:</span>
            <span className="font-bold text-rose-300 bg-rose-950/60 px-2.5 py-0.5 rounded-full border border-rose-900/40">
              {filteredProducts.length} منتج
            </span>
            {searchQuery && (
              <span className="text-zinc-500">
                للبحث عن: "<span className="text-rose-300 font-bold">{searchQuery}</span>"
              </span>
            )}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-rose-400 hover:text-rose-200 underline cursor-pointer"
              >
                إلغاء البحث
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-rose-400 shrink-0" />
            <span className="text-xs text-zinc-400 shrink-0">ترتيب حسب:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#1a1a1a] border border-rose-900/40 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500/50 cursor-pointer"
            >
              <option value="default">الافتراضي (الموصى به)</option>
              <option value="popular">الأكثر مبيعاً</option>
              <option value="price-asc">الأقل سعراً</option>
              <option value="price-desc">الأعلى سعراً</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-[#141414] rounded-3xl p-12 text-center border border-rose-900/30 shadow-xl max-w-md mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-rose-950/50 text-rose-400 flex items-center justify-center mx-auto mb-4 border border-rose-900/40">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-100 mb-1">لا توجد حقائب مطابقة للبحث</h3>
            <p className="text-xs text-zinc-400 mb-6">
              جرّبي كتابة كلمات بحث أخرى مثل "جلد"، "أطفال"، "كلاتش"، "ظهر"، أو استعراض تصنيف آخر.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-800 to-rose-900 text-white text-xs font-bold shadow-md hover:from-rose-700 hover:to-rose-800 transition-all border border-rose-700/50 cursor-pointer"
            >
              عرض جميع تشكيلات الحقائب
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                config={config}
                onOpenDetail={(prod) => setDetailProduct(prod)}
                onAddToCart={(prod) => handleAddToCart(prod, 1)}
              />
            ))}
          </div>
        )}

      </main>

      {/* Floating Speed Dial WhatsApp Button */}
      <a
        href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('مرحباً متجر Rosa للحقائب بالجزائر 🇩🇿، أود الاستفسار والطلب عبر الواتساب 👜💕')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-40 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl shadow-emerald-950/80 flex items-center gap-2.5 transition-all duration-300 hover:scale-110 group border-2 border-emerald-400/30"
        title="تواصل مباشر بالواتساب"
      >
        <MessageCircle className="w-6 h-6 fill-current animate-pulse" />
        <span className="hidden sm:inline font-bold text-xs sm:text-sm">اطلبي عبر الواتساب</span>
      </a>

      {/* Product Detail Modal */}
      <ProductModal
        product={detailProduct}
        config={config}
        onClose={() => setDetailProduct(null)}
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
