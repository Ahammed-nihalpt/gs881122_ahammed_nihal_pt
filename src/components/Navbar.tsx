import { Link } from 'react-router-dom';
import GSynergyLogo from '../../public/assets/gsynergy-logo.svg'; // Import SVG as an image source

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo & Brand Name */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors"
            >
              <img src={GSynergyLogo} alt="GSynergy Logo" className="h-8 w-auto" />
            </Link>
          </div>

          {/* Right side - Navigation Items */}
          <div className="flex items-center space-x-4">
            <button className="text-[#2f8a9c] hover:bg-[#e5e5e5] px-3 py-2 rounded-md transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
