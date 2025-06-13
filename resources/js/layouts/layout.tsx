import React from 'react';
import Header from '../components/Header';
import Footer from '../components/footer';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
        <main className="min-h-screen bg-[linear-gradient(to_right,rgba(0,0,0,1.8),rgba(0,0,0,0)),url('https://aem-all.accor.com/content/dam/all/hubs/americas/latam/generic-images/all-magazine/mejores-playas-lima-2024-2.jpg')] bg-cover bg-center">
            {children}
        </main>


      <Footer />
    </div>
  );
};

export default Layout;
