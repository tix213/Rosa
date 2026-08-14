import { CartItem, Product, StoreConfig } from '../types';

/**
 * Cleans a phone number for WhatsApp wa.me links (removes +, spaces, dashes, leading zeros)
 */
export function formatPhoneNumber(phone: string): string {
  let cleaned = phone.replace(/[^\d]/g, '');
  if (cleaned.startsWith('00')) {
    cleaned = cleaned.substring(2);
  }
  return cleaned;
}

/**
 * Builds direct WhatsApp URL for a single product order
 */
export function buildSingleProductWhatsAppUrl(
  product: Product,
  quantity: number = 1,
  config: StoreConfig,
  customerName?: string,
  customerWilaya?: string,
  customerPhone?: string,
  customerAddress?: string,
  selectedColor?: string
): string {
  const cleanPhone = formatPhoneNumber(config.whatsappNumber);
  const total = product.price * quantity;

  let text = `مرحباً بوتيك *${config.storeName}* 🇩🇿🌸\n\n`;
  text += `أود طلب هذه الحقيبة من متجركم:\n`;
  text += `━━━━━━━━━━━━━━━━━━━━\n`;
  text += `👜 *الموديل:* ${product.title}\n`;
  if (product.code) {
    text += `🏷️ *كود الحقيبة:* ${product.code}\n`;
  }
  if (selectedColor) {
    text += `🎨 *اللون المختار:* ${selectedColor}\n`;
  }
  text += `💰 *السعر:* ${product.price} ${config.currency}\n`;
  text += `🔢 *الكمية:* ${quantity}\n`;
  text += `💵 *المجموع:* ${total} ${config.currency}\n`;
  text += `━━━━━━━━━━━━━━━━━━━━\n`;

  if (customerName && customerName.trim()) {
    text += `👤 *الاسم واللقب:* ${customerName.trim()}\n`;
  }
  if (customerPhone && customerPhone.trim()) {
    text += `📞 *رقم الهاتف:* ${customerPhone.trim()}\n`;
  }
  if (customerWilaya && customerWilaya.trim()) {
    text += `📍 *الولاية (58 ولاية):* ${customerWilaya.trim()}\n`;
  }
  if (customerAddress && customerAddress.trim()) {
    text += `🏠 *العنوان / البلدية:* ${customerAddress.trim()}\n`;
  }

  text += `\n🚚 أرجو تأكيد الطلب وتحديد موعد التوصيل والدفع عند الاستلام. شكراً لكم! 💕🇩🇿`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

/**
 * Builds direct WhatsApp URL for entire shopping cart checkout
 */
export function buildCartWhatsAppUrl(
  items: CartItem[],
  config: StoreConfig,
  customerName?: string,
  customerWilaya?: string,
  customerPhone?: string,
  customerAddress?: string,
  notes?: string
): string {
  const cleanPhone = formatPhoneNumber(config.whatsappNumber);
  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);

  let text = `مرحباً بوتيك *${config.storeName}* 🇩🇿🌸\n\n`;
  text += `أود تأكيد طلب الحقائب التالية عبر السلة:\n`;
  text += `━━━━━━━━━━━━━━━━━━━━\n`;

  items.forEach((item, index) => {
    const itemTotal = item.product.price * item.quantity;
    text += `${index + 1}. *${item.product.title}*\n`;
    if (item.product.code) {
      text += `   كود: ${item.product.code}\n`;
    }
    if (item.selectedColor) {
      text += `   🎨 اللون: ${item.selectedColor}\n`;
    }
    text += `   الكمية: ${item.quantity} | السعر: ${itemTotal} ${config.currency}\n\n`;
  });

  text += `━━━━━━━━━━━━━━━━━━━━\n`;
  text += `📦 *إجمالي عدد الحقائب:* ${totalQty}\n`;
  text += `💳 *المبلغ الإجمالي:* ${totalPrice} ${config.currency}\n`;
  text += `━━━━━━━━━━━━━━━━━━━━\n`;

  if (customerName && customerName.trim()) {
    text += `👤 *الاسم واللقب:* ${customerName.trim()}\n`;
  }
  if (customerPhone && customerPhone.trim()) {
    text += `📞 *رقم الهاتف للتوصيل:* ${customerPhone.trim()}\n`;
  }
  if (customerWilaya && customerWilaya.trim()) {
    text += `📍 *الولاية:* ${customerWilaya.trim()}\n`;
  }
  if (customerAddress && customerAddress.trim()) {
    text += `🏠 *العنوان والبلدية:* ${customerAddress.trim()}\n`;
  }
  if (notes && notes.trim()) {
    text += `📝 *ملاحظات إضافية:* ${notes.trim()}\n`;
  }

  text += `\n🚚 أرجو تزويدي بتفاصيل الشحن والتوصيل إلى ولايتي. شكراً جزيلاً! 💕🇩🇿`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}
