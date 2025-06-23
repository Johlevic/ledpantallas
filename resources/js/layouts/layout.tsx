import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet-async";
import Header from '../components/header'; // corrige la mayúscula
import Footer from '../components/footer'; // corrige la mayúscula

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "https://aem-all.accor.com/content/dam/all/hubs/americas/latam/generic-images/all-magazine/mejores-playas-lima-2024-2.jpg";
    img.onload = () => {
      setBackgroundLoaded(true);
    };
  }, []);

  return (
    <>
      <Helmet>
        <link
          rel="preload"
          as="image"
          href="https://aem-all.accor.com/content/dam/all/hubs/americas/latam/generic-images/all-magazine/mejores-playas-lima-2024-2.jpg"
        />
      </Helmet>

      <div className="flex flex-col w-full min-h-screen">
        <Header />
        <main
          className={`min-h-screen ${
            backgroundLoaded
              ? "bg-[linear-gradient(to_right,rgba(0,0,0,1.8),rgba(0,0,0,0)),url('https://aem-all.accor.com/content/dam/all/hubs/americas/latam/generic-images/all-magazine/mejores-playas-lima-2024-2.jpg')]"
              : "bg-black"
          } bg-cover bg-center transition-all duration-700`}
        >
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
