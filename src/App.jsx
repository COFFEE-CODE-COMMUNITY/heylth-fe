import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Layout } from "./components/Layout";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Profile } from "./pages/Profile";
import { VisualData } from "./pages/VisualData";
import { Journal } from "./pages/Journal";
import { Reminder } from "./pages/Reminder";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="profile" element={<Profile />} />
          <Route path="visual-data" element={<VisualData />} />
          <Route path="journal" element={<Journal />} />
          <Route path="reminder" element={<Reminder />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
