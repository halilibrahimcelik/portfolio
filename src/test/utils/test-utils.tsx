import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { ApolloClientProvider } from '@/providers/ApolloContextProvider';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApolloClientProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">
        {children}
      </ThemeProvider>
    </ApolloClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };