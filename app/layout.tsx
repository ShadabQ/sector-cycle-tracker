import type { Metadata } from 'next';
import './globals.css';           // ← This line was failing

export const metadata: Metadata = {
  title: 'Sector Cycle Tracker',
  description: 'NSE Sector Rotation Dashboard by ShadabQ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}