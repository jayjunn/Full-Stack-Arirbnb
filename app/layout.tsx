import RegisterModal from './components/modals/RegisterModal';
import Navbar from './components/navbar/Navbar';
import './globals.css';
import { Nunito } from 'next/font/google';
import ToasterProvider from './provider/ToasterProvider';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: `Younggeun's Airbnb`,
  description: 'Full stack Airbnb clone',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ToasterProvider />
        <RegisterModal />
        <Navbar />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
