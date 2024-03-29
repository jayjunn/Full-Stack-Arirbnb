import RegisterModal from './components/modals/RegisterModal';
import Navbar from './components/navbar/Navbar';
import './globals.css';
import { Nunito } from 'next/font/google';
import ToasterProvider from './provider/ToasterProvider';
import LoginModal from './components/modals/LoginModal';
import getCurrentUser from './actions/getCurrentUser';
import RentModal from './components/modals/RentModal';
import SearchModal from './components/modals/SearchModal';
import ReactQueryProvider from './components/ReactQueryProvider';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: `Younggeun's Airbnb`,
  description: 'Full stack Airbnb clone',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ReactQueryProvider>
          <ToasterProvider />
          <LoginModal />
          <SearchModal />
          <RegisterModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
          <div className="pb-20 pt-28">{children}</div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
