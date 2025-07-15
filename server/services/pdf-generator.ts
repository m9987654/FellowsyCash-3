import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs/promises';
import path from 'path';
import { Service, User } from '@shared/schema';

export async function generatePDF(service: Service, user: User): Promise<string> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4 size
  
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
  const { width, height } = page.getSize();
  const fontSize = 12;
  const titleFontSize = 18;
  
  // Header
  page.drawText('فلوس كاش - عقد الخدمة المالية', {
    x: width / 2 - 100,
    y: height - 50,
    size: titleFontSize,
    font: boldFont,
    color: rgb(0, 0.4, 0.8),
  });
  
  page.drawText('Flous Cash Financial Service Contract', {
    x: width / 2 - 120,
    y: height - 80,
    size: 14,
    font: boldFont,
    color: rgb(0, 0.4, 0.8),
  });
  
  // Contract details
  const details = [
    `التاريخ: ${new Date().toLocaleDateString('ar-EG')}`,
    `رقم العقد: FC-${service.id}-${Date.now()}`,
    '',
    'بيانات العميل:',
    `الاسم الكامل: ${user.fullName}`,
    `الرقم القومي: ${user.nationalId}`,
    `رقم الهاتف: ${user.phone}`,
    `الوظيفة: ${user.job}`,
    `العنوان: ${user.address}`,
    '',
    'تفاصيل الخدمة:',
    `نوع الخدمة: ${getServiceTypeInArabic(service.type)}`,
    `المبلغ: ${service.amount} جنيه مصري`,
    `الغرض: ${service.purpose || 'غير محدد'}`,
    `تاريخ البداية: ${service.createdAt?.toLocaleDateString('ar-EG')}`,
    service.targetDate ? `التاريخ المستهدف: ${service.targetDate.toLocaleDateString('ar-EG')}` : '',
    '',
    'شروط وأحكام:',
    '1. هذا العقد ملزم للطرفين ومعتمد قانونياً',
    '2. جميع المبالغ محولة إلى رقم فودافون كاش: 01026751430',
    '3. يحق للعميل استلام نسخة من هذا العقد',
    '4. في حالة النزاع، يتم الرجوع للعقد الأصلي',
    '',
    'توقيع رقمي - تم التوثيق إلكترونياً',
    `منصة فلوس كاش - ${new Date().toLocaleDateString('ar-EG')}`,
  ];
  
  let yPosition = height - 120;
  details.forEach((line) => {
    if (line.trim()) {
      page.drawText(line, {
        x: 50,
        y: yPosition,
        size: fontSize,
        font: line.includes(':') && !line.startsWith('التاريخ') ? boldFont : font,
        color: rgb(0, 0, 0),
      });
    }
    yPosition -= 20;
  });
  
  // Footer stamp
  page.drawText('✓ تم التوثيق', {
    x: width - 100,
    y: 50,
    size: 14,
    font: boldFont,
    color: rgb(0, 0.6, 0),
  });
  
  const pdfBytes = await pdfDoc.save();
  
  // Save to contracts directory
  const contractsDir = path.join(process.cwd(), 'contracts');
  await fs.mkdir(contractsDir, { recursive: true });
  
  const fileName = `contract-${service.id}-${Date.now()}.pdf`;
  const filePath = path.join(contractsDir, fileName);
  
  await fs.writeFile(filePath, pdfBytes);
  
  return filePath;
}

function getServiceTypeInArabic(type: string): string {
  switch (type) {
    case 'funding': return 'تمويل سريع';
    case 'saving': return 'تحويش ذكي';
    case 'investment': return 'استثمار مربح';
    default: return type;
  }
}
