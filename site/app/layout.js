import './globals.css';

export const metadata = {
  title: 'Zeldara',
  description: 'Four realms. One awakening. Wake the waystones, befriend the spirits, and face the Volcano Lord.',
};
export const viewport = { themeColor: '#000000', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
