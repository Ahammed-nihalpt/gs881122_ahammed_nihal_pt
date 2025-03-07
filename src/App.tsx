import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StoresPage from './pages/StoresPage';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="pt-16">
        <Routes>
          <Route path="/stores" element={<StoresPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
