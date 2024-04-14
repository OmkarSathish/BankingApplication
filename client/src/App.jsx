import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UpdateProfile from './pages/UpdateProfile';
import Transaction from './pages/Transaction';
import NoAccess from './pages/NoAccess';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
          <Route
            path="/profile-update"
            element={<UpdateProfile />}
          />
          <Route
            path="/transfer"
            element={<Transaction />}
          />
          <Route
            path="/access-declined"
            element={<NoAccess />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
