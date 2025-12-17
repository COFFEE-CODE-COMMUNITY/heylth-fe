import { NavLink, Outlet, useNavigate } from 'react-router-dom';

export const Layout = () => {
  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/input-data', label: 'Input Data' },
    { path: '/journal', label: 'Journal' },
    { path: '/reminder', label: 'Reminder' },
    { path: '/profile', label: 'Profile' },
    { path: '/LandingPage', label: 'Landing Page'},
  ];

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      localStorage.removeItem("age")
      localStorage.removeItem("sex")
      localStorage.removeItem("email")
      localStorage.removeItem("username")
      localStorage.removeItem("token")
      navigate('/login');
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#fffafa] pl-64">
      <aside className="w-64 h-screen fixed left-0 top-0 bg-white shadow-lg overflow-y-auto">
        <div className="p-6">
          <h1 className="text-2xl font-bold">
            <span className="text-[#007DFC]">Heylth</span>
          </h1>
        </div>
        <nav className="mt-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block px-6 py-3 text-gray-700 hover:bg-[#007DFC] hover:text-white transition-colors ${
                  isActive ? 'bg-[#007DFC] text-white' : ''
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        
      <div className="p-6">
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r font-bold mt-105 mr-5 mb-10 from-[#ff4b4b] to-[#ff7373] text-white px-10 py-3 rounded-lg shadow hover:opacity-90 transition"
      >
            Logout
          </button>
      </div>
      </aside>

      <main className="flex-1 p-8 h-screen overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

