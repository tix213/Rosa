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
  customerCity?: string
): string {
  const cleanPhone = formatPhoneNumber(config.whatsappNumber);
  const total = product.price * quantity;

  let text = `مرحباً متجر *${config.storeName}* 👋✨\n\n`;
  text += `أود طلب المنتج التالية تفاصيله:\n`;
  text += `---------------------------\n`;
  text += `🛍️ *اسم المنتج:* ${product.title}\n`;
  if (product.code) {
    text += `🏷️ *كود المنتج:* ${product.code}\n`;
  }
  text += `💰 *السعر الفردي:* ${product.price} ${config.currency}\n`;
  text += `🔢 *الكمية:* ${quantity}\n`;
  text += `💵 *الإجمالي:* ${total} ${config.currency}\n`;
  text += `---------------------------\n`;

  if (customerName && customerName.trim()) {
    text += `👤 *اسم العميل:* ${customerName.trim()}\n`;
  }
  if (customerCity && customerCity.trim()) {
    text += `📍 *المدينة / العنوان:* ${customerCity.trim()}\n`;
  }

  text += `\nيسعدني تأكيد الطلب وتزويدي بطريقة الدفع والتوصيل. شكراً لكم! 💕`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

/**
 * Builds direct WhatsApp URL for entire shopping cart checkout
 */
export function buildCartWhatsAppUrl(
  items: CartItem[],
  config: StoreConfig,
  customerName?: string,
  customerCity?: string,
  notes?: string
): string {
  const cleanPhone = formatPhoneNumber(config.whatsappNumber);
  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);

  let text = `مرحباً متجر *${config.storeName}* 👋✨\n\n`;
  text += `أود تأكيد طلب الشراء التالي من المتجر:\n`;
  text += `===========================\n`;

  items.forEach((item, index) => {
    const itemTotal = item.product.price * item.quantity;
    text += `${index + 1}. *${item.product.title}*\n`;
    if (item.product.code) {
      text += `   كود: ${item.product.code}\n`;
    }
    text += `   الكمية: ${item.quantity} | السعر: ${itemTotal} ${config.currency}\n\n`;
  });

  text += `===========================\n`;
  text += `📦 *عدد القطع:* ${totalQty}\n`;
  text += `💳 *إجمالي الطلب:* ${totalPrice} ${config.currency}\n`;
  text += `===========================\n`;

  if (customerName && customerName.trim()) {
    text += `👤 *الاسم:* ${customerName.trim()}\n`;
  }
  if (customerCity && customerCity.trim()) {
    text += `📍 *المدينة / العنوان:* ${customerCity.trim()}\n`;
  }
  if (notes && notes.trim()) {
    text += `📝 *ملاحظات:* ${notes.trim()}\n`;
  }

  text += `\nأرجو تزويدي بتأكيد التوفر وتفاصيل الشحن والدفع. شكراً جزيلًا 💕`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}
