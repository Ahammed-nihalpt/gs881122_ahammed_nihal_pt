import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StoresPage from './pages/StoresPage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SKUsPage from './pages/SKUsPage';
import PlanningPage from './pages/PlanningPage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <div className="pl-64 pt-16">
        <Routes>
          <Route path="/stores" element={<StoresPage />} />
          <Route path="/skus" element={<SKUsPage />} />
          <Route path="/planning" element={<PlanningPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
