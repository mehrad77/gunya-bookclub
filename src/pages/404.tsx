import * as React from "react";
import { Link, HeadFC, PageProps } from "gatsby";
import Seo from "../components/Seo";
import Logo from "../components/Logo";

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
      <div className="text-center space-y-8 px-6">
        <Logo size="xl" className="justify-center" />
        
        <div className="space-y-4">
          <h1 className="text-8xl font-extralight text-gradient">۴۰۴</h1>
          <h2 className="text-3xl font-light text-gray-800">
            صفحه مورد نظر یافت نشد
          </h2>
          <p className="text-gray-600 text-lg font-light max-w-md mx-auto leading-relaxed">
            متأسفانه صفحه‌ای که دنبال آن می‌گردید وجود ندارد.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            to="/"
            className="primary-button"
          >
            بازگشت به صفحه اصلی
          </Link>
          
          <div className="text-sm text-gray-400">
            یا به صفحه اصلی بازگردید و کتاب مورد علاقه‌تان را پیدا کنید
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

export const Head: HeadFC = ({ location }) => (
  <Seo
    title="صفحه یافت نشد - باشگاه کتابخوانی گونیا"
    description="متأسفانه صفحه‌ای که دنبال آن می‌گردید وجود ندارد. به صفحه اصلی بازگردید و کتاب مورد علاقه‌تان را پیدا کنید."
    pathname={location.pathname}
  />
);
