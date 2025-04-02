import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfileDisplay from './ProfileDisplay';
import Dashboard from './Dashboard';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/profiles" element={<ProfileDisplay />} />
      <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
