import './globals.css';

export const metadata = {
  title: 'The Quests of Zeldara and Zeldor',
  description: 'Four realms, one broken land. Free the spirits and unravel the fragmented past to liberate Runeheim.',
};
export const viewport = { themeColor: '#000000', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
