import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { defaultContent } from '../data/defaultContent';

const ContentContext = createContext(null);
const STORAGE_KEY = 'mcfew_content_v2';

function deepMerge(target, source) {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (source[key] !== null && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(target[key] ?? {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

function loadContent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return JSON.parse(JSON.stringify(defaultContent));
    return deepMerge(JSON.parse(JSON.stringify(defaultContent)), JSON.parse(raw));
  } catch {
    return JSON.parse(JSON.stringify(defaultContent));
  }
}

export function ContentProvider({ children }) {
  const [content, setContent] = useState(loadContent);

  const updateSection = useCallback((section, data) => {
    setContent(prev => {
      const next = { ...prev, [section]: data };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const resetContent = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setContent(JSON.parse(JSON.stringify(defaultContent)));
  }, []);

  return (
    <ContentContext.Provider value={{ content, updateSection, resetContent }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used inside ContentProvider');
  return ctx;
}
