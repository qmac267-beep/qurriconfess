import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'QurriConfess - Viết cho đỡ tức, đăng cho đỡ bực',
  description: 'Nền tảng đọc và đăng bài viết nội bộ cho nhóm bạn thân',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
