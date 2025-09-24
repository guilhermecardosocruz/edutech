export const dynamic = 'force-dynamic';
export const revalidate = 0;               // sem SSG
export const fetchCache = 'default-no-store';

import '../styles/globals.css'; // ajuste o caminho se seu globals.css estiver em src/styles
import React from 'react';

export const metadata = {
  title: 'Edutech',
  description: 'Plataforma para gestores e professores',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
