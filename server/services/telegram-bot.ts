import axios from 'axios';
import { Service, User } from '@shared/schema';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8118081962:AAELBJyLNDzvGVYux_4EGJVuhDv3I2ms3Uk';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '-1001234567890'; // Replace with actual chat ID

export async function sendTelegramNotification(service: Service, user: User): Promise<void> {
  try {
    const serviceTypeArabic = getServiceTypeInArabic(service.type);
    
    const message = `
🧍‍♂️ طلب جديد على منصة فلوس كاش

📛 الاسم: ${user.fullName}
🆔 الرقم القومي: ${user.nationalId}
📱 الموبايل: ${user.phone}
💼 الوظيفة: ${user.job}
🏠 العنوان: ${user.address}
📄 الخدمة: ${serviceTypeArabic}
💰 المبلغ: ${service.amount} جنيه
✅ تم التحويل على 01026751430
🕒 التاريخ: ${new Date().toLocaleString('ar-EG')}

${service.purpose ? `📝 الغرض: ${service.purpose}` : ''}
`;

    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML'
    });
    
    console.log('Telegram notification sent successfully');
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
    // Don't throw error to avoid breaking the service creation
  }
}

function getServiceTypeInArabic(type: string): string {
  switch (type) {
    case 'funding': return 'تمويل سريع';
    case 'saving': return 'تحويش ذكي';
    case 'investment': return 'استثمار مربح';
    default: return type;
  }
}
