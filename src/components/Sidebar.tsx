import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="fixed top-16 left-0 h-screen w-64 bg-white text-[#2f8a9c] shadow-lg">
      <div className="p-4">
        <h2 className="text-lg font-semibold">Menu</h2>
        <nav className="mt-4">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/stores"
                className={({ isActive }) =>
                  `block p-2 hover:bg-[#e5e5e5] rounded transition-colors ${
                    isActive ? 'bg-[#e5e5e5]' : ''
                  }`
                }
              >
                Stores
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/skus"
                className={({ isActive }) =>
                  `block p-2 hover:bg-[#e5e5e5] rounded transition-colors ${
                    isActive ? 'bg-[#e5e5e5]' : ''
                  }`
                }
              >
                SKUs
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/planning"
                className={({ isActive }) =>
                  `block p-2 hover:bg-[#e5e5e5] rounded transition-colors ${
                    isActive ? 'bg-[#e5e5e5]' : ''
                  }`
                }
              >
                Planning
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
