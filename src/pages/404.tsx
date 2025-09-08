import * as React from "react";
import { Link, HeadFC, PageProps } from "gatsby";
import Seo from "../components/Seo";
import Logo from "../components/Logo";
import { useTranslation } from "../locales";

const NotFoundPage: React.FC<PageProps> = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-8 px-6">
        <Logo size="xl" className="justify-center" />
        
        <div className="space-y-4">
          <h2 className="text-3xl font-light text-gray-800">
            {t('notFound.title')}
          </h2>
          <p className="text-gray-600 text-lg font-light max-w-md mx-auto leading-relaxed">
            {t('notFound.message')}
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            to="/"
            className="primary-button"
          >
            {t('notFound.backButton')}
          </Link>
          
          <div className="text-sm text-gray-400">
            {t('notFound.suggestion')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

export const Head: HeadFC = ({ location }) => {
  const { t } = useTranslation();
  
  return (
    <Seo
      title={t('seo.notFoundTitle')}
      description={t('seo.notFoundDescription')}
      pathname={location.pathname}
    />
  );
};
