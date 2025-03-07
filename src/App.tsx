import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StoresPage from './pages/StoresPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/stores" element={<StoresPage />} />
      </Routes>
    </Router>
  );
};

export default App;
