import { Link } from 'react-router-dom';
import { Menu as MenuIcon } from '@mui/icons-material';
import GSynergyLogo from '../../public/assets/gsynergy-logo.svg';

const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <nav className="fixed top-0 w-full bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 relative">
          <div className="flex items-center space-x-2">
            <button onClick={toggleSidebar} className="lg:hidden text-[#2f8a9c]">
              <MenuIcon className="h-6 w-6" />
            </button>
            <Link to="/" className="flex items-center">
              <img src={GSynergyLogo} alt="GSynergy Logo" className="h-10 w-auto ml-4" />
            </Link>
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold text-[#6ca8b4]">
            Data Viewer App
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
