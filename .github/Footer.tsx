import { Link } from 'react-router-dom';
import { QrCode, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'من نحن', href: '/about' },
    { name: 'سياسة الخصوصية', href: '/privacy' },
    { name: 'شروط الاستخدام', href: '/terms' },
    { name: 'تواصل معنا', href: '/contact' },
    { name: 'الأسئلة الشائعة', href: '/faq' },
    { name: 'المدونة', href: '/blog' },
  ];

  return (
    <footer className="border-t bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Logo */}
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="w-6 h-6 bg-qr-gradient rounded flex items-center justify-center">
              <QrCode className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold bg-qr-gradient bg-clip-text text-transparent">
              PixoQR
            </span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <div className="flex items-center space-x-1 space-x-reverse text-sm text-muted-foreground">
            <span>© {currentYear} PixoQR. جميع الحقوق محفوظة</span>
            <Heart className="h-3 w-3 text-red-500 fill-current" />
          </div>
        </div>

        {/* Description */}
        <div className="mt-6 pt-6 border-t text-center">
          <p className="text-sm text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            PixoQR هو مولد رموز QR مجاني وسريع يتيح لك تحويل الروابط والنصوص إلى رموز QR عالية الجودة في ثوانٍ معدودة. 
            يمكنك استخدام خدمتنا لإنشاء رموز QR للمواقع الإلكترونية، بطاقات العمل، الشبكات الاجتماعية، أو أي نص تريد مشاركته بسهولة. 
            الخدمة مجانية تماماً ولا تتطلب تسجيل، كما يمكنك تحميل الرموز بصيغة PNG عالية الدقة. 
            PixoQR يدعم جميع أنواع النصوص والروابط ويضمن لك الحصول على رمز QR واضح وقابل للقراءة على جميع الأجهزة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;