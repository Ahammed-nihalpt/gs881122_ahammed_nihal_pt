import { NavLink } from 'react-router-dom';
import StoreIcon from '@mui/icons-material/Store';
import CategoryIcon from '@mui/icons-material/Category';
import BarChartIcon from '@mui/icons-material/BarChart';
import InsertChartIcon from '@mui/icons-material/InsertChart';

const SidebarContent = () => (
  <div className="p-4">
    <h2 className="text-lg font-semibold">Menu</h2>
    <nav className="mt-4">
      <ul className="space-y-2">
        <li>
          <NavLink
            to="/stores"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 hover:bg-[#e5e5e5] rounded transition-colors ${
                isActive ? 'bg-[#e5e5e5]' : ''
              }`
            }
          >
            <StoreIcon />
            Stores
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/skus"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 hover:bg-[#e5e5e5] rounded transition-colors ${
                isActive ? 'bg-[#e5e5e5]' : ''
              }`
            }
          >
            <CategoryIcon />
            SKUs
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/planning"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 hover:bg-[#e5e5e5] rounded transition-colors ${
                isActive ? 'bg-[#e5e5e5]' : ''
              }`
            }
          >
            <BarChartIcon />
            Planning
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/chart"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 hover:bg-[#e5e5e5] rounded transition-colors ${
                isActive ? 'bg-[#e5e5e5]' : ''
              }`
            }
          >
            <InsertChartIcon />
            Chart
          </NavLink>
        </li>
      </ul>
    </nav>
  </div>
);

export default SidebarContent;
