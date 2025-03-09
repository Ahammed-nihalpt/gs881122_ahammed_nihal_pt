import { Link } from 'react-router-dom';
import { Menu as MenuIcon } from '@mui/icons-material';
import GSynergyLogo from '../../public/assets/gsynergy-logo.svg';

const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <nav className="fixed top-0 w-full bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section: Sidebar Toggle & Logo */}
          <div className="flex items-center space-x-4">
            {/* Sidebar Toggle (Visible on Small Screens) */}
            <button onClick={toggleSidebar} className="lg:hidden text-[#2f8a9c]">
              <MenuIcon className="h-6 w-6" />
            </button>
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src={GSynergyLogo} alt="GSynergy Logo" className="h-10 w-auto" />
            </Link>
          </div>

          {/* Centered Title (Responsive) */}
          <div className="text-lg sm:text-2xl font-semibold text-[#6ca8b4] flex-1 text-center lg:block hidden">
            Data Viewer App
          </div>

          {/* Placeholder for spacing on large screens */}
          <div className="lg:w-10 w-6"></div>
        </div>

        {/* Centered Title for Small Screens */}
        <div className="text-lg sm:text-xl font-semibold text-[#6ca8b4] text-center lg:hidden mt-2">
          Data Viewer App
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
