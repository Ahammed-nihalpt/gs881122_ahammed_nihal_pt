import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import StoresPage from './pages/StoresPage';
import Navbar from './components/Navbar';
import SKUsPage from './pages/SKUsPage';
import PlanningPage from './pages/PlanningPage';
import ChartPage from './pages/ChartPage';
import Sidebar from './components/Sidebar/Sidebar';
import Home from './pages/Home';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <Router>
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="lg:pl-64 lg:pt-16 pt-23 transition-all">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stores" element={<StoresPage />} />
          <Route path="/skus" element={<SKUsPage />} />
          <Route path="/planning" element={<PlanningPage />} />
          <Route path="/chart" element={<ChartPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
