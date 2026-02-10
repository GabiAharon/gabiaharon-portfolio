import '../styles/globals.css'
import Layout from '../components/Layout'
import { useState, createContext, useContext, useEffect } from 'react'

// יצירת קונטקסט שפה
export const LanguageContext = createContext({
  language: 'he',
  setLanguage: () => {},
  t: (key) => key,
});

// הוק לשימוש נוח בקונטקסט השפה
export const useLanguage = () => useContext(LanguageContext);

function MyApp({ Component, pageProps }) {
  // ברירת מחדל עברית
  const [language, setLanguage] = useState('he');

  // טעינת שפה מ-localStorage רק אחרי שהקומפוננטה נטענת
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedLanguage = localStorage.getItem('gabiPortfolioLanguage');
        if (savedLanguage === 'en' || savedLanguage === 'he') {
          setLanguage(savedLanguage);
          document.documentElement.dir = savedLanguage === 'he' ? 'rtl' : 'ltr';
          document.documentElement.lang = savedLanguage;
        } else {
          setLanguage('he');
          localStorage.setItem('gabiPortfolioLanguage', 'he');
          document.documentElement.dir = 'rtl';
          document.documentElement.lang = 'he';
        }
      } catch (error) {
        setLanguage('he');
      }
    }
  }, []);
  
  // פונקציה לשינוי השפה
  const handleSetLanguage = (newLang) => {
    console.log('🔄 Changing language to:', newLang);
    setLanguage(newLang);
    
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('gabiPortfolioLanguage', newLang);
        document.documentElement.dir = newLang === 'he' ? 'rtl' : 'ltr';
        document.documentElement.lang = newLang;
        console.log('✅ Language saved successfully:', newLang);
      } catch (error) {
        console.error('Error saving language:', error);
      }
    }
  };
  
  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage: handleSetLanguage,
      }}
    >
      <Layout language={language}>
        <Component {...pageProps} />
      </Layout>
    </LanguageContext.Provider>
  )
}

export default MyApp 