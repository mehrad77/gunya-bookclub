import * as React from "react";
import { Link, HeadFC, PageProps } from "gatsby";

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">۴۰۴</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          صفحه مورد نظر یافت نشد
        </h2>
        <p className="text-gray-600 mb-8">
          متأسفانه صفحه‌ای که دنبال آن می‌گردید وجود ندارد.
        </p>
        <Link 
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>صفحه یافت نشد - باشگاه کتابخوانی گونیا</title>;
