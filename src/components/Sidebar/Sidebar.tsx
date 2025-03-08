import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SidebarContent from './SidebarContent';

const Sidebar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}) => {
  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#2f8a9c] text-white p-2 rounded-md"
        onClick={() => setIsOpen(true)}
      >
        <MenuIcon />
      </button>

      <aside className="hidden lg:block fixed top-16 left-0 h-screen w-64 bg-white text-[#2f8a9c] shadow-lg">
        <SidebarContent />
      </aside>

      {isOpen && (
        <div className="fixed inset-0 bg-black/70 z-40" onClick={() => setIsOpen(false)}>
          <div
            className="fixed top-16 left-0 h-full w-64 bg-white text-[#2f8a9c] shadow-lg transition-transform transform translate-x-0"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="absolute top-4 right-4" onClick={() => setIsOpen(false)}>
              <CloseIcon />
            </button>

            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
