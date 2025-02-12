import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import useDynamicTitle from '../useDynamicTitle/useDynamicTitle';

const MainLayout = () => {
  useDynamicTitle();
  return (
    <div>
      <nav className="w-full border-b-2 border-primary">
        <Navbar></Navbar>
      </nav>
      <main className="min-h-screen w-full lg:container mx-auto">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
