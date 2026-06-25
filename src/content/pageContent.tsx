import { useEffect, useMemo, useState } from 'react';
import { getPageContent, hasCmsApi } from '../api/client';
import type { PageContent } from '../types/api';
import { fallbackPageContent, PageContentContext } from './pageContentContext';

export function PageContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<PageContent>(fallbackPageContent);

  useEffect(() => {
    if (!hasCmsApi()) {
      return;
    }

    getPageContent()
      .then((response) => {
        setContent({
          ...fallbackPageContent,
          ...response.data,
        });
      })
      .catch(() => {
        // Fallback copy keeps the page available if the CMS is offline.
      });
  }, []);

  const value = useMemo(() => content, [content]);

  return <PageContentContext.Provider value={value}>{children}</PageContentContext.Provider>;
}
