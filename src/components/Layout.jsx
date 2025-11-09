import { NavLink, Outlet } from 'react-router-dom';

export const Layout = () => {
  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/profile', label: 'Profile' },
    { path: '/visual-data', label: 'Visual Data' },
    { path: '/journal', label: 'Journal' },
    { path: '/reminder', label: 'Reminder' },
  ];

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
      </aside>

      <main className="flex-1 p-8 h-screen overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

//       <aside className="w-64 bg-white shadow-lg">
//         <div className="p-6">
//           <h1 className="text-2xl font-bold">
//             <span className="text-[#007DFC]">Heylth</span>
//           </h1>
//         </div>
//         <nav className="mt-6">
//           {navItems.map((item) => (
//             <NavLink
//               key={item.path}
//               to={item.path}
//               className={({ isActive }) =>
//                 `block px-6 py-3 text-gray-700 hover:bg-[#007DFC] hover:text-white transition-colors ${
//                   isActive ? 'bg-[#007DFC] text-white' : ''
//                 }`
//               }
//             >
//               {item.label}
//             </NavLink>
//           ))}
//         </nav>
//       </aside>

//       <main className="flex-1 p-8">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

