import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');
  const age = localStorage.getItem('age');
  const sex = localStorage.getItem('sex');

  const handleChangePassword = async () => {
    setError('');
    setMessage('');

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await updatePassword(newPassword);
      setMessage('Password changed successfully!');
      setTimeout(() => {
        setShowChangePassword(false);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setMessage('');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  if (showChangePassword) {
    return (
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Change Password</h1>

        <div className="bg-white p-6 rounded-lg shadow">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {message}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Old Password</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#007DFC]"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#007DFC]"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#007DFC]"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setShowChangePassword(false)}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleChangePassword}
              disabled={loading}
              className="flex-1 bg-gradient-to-r font-bold from-[#007DFC] to-[#00C4FF] text-white px-5 py-2 rounded-lg shadow hover:opacity-90 transition"
            >
              {loading ? 'Changing...' : 'Change Password'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Profile</h1>

<div className="flex justify-center items-center">
  <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">

      {/*tambahan gradasi*/}
      <div className="w-full h-48 bg-gradient-to-b from-[#3D9AF7] via-[#ffff] to-[#FFFF]"/>


    <div className="flex flex-col items-center mb-8">
      <div className="w-24 h-24 bg-gradient-to-tr from-[#007DFC] to-[#B3FFEA] rounded-full flex items-center justify-center text-white text-3xl font-bold">
        {username?.charAt(0).toUpperCase() || 'U'}
      </div>
      <p className="mt-3 text-gray-700 font-bold mb-1 bg-gradient-to-r from-[#002B56] to-[#004E9D] bg-clip-text text-transparent">{username}</p>
      <p className="text-gray-500 text-sm">{email}</p>
    </div>

    <div className="flex flex-col text-gray-700 space-y-4 items-start pl-10">
      <div>
        <label className="block text-sm text-gray-500 mb-1">Umur</label>
        <div className="font-medium">{age || 'Not set'} Tahun</div>
      </div>
      <div>
        <label className="block text-sm text-gray-500 mb-1">Jenis Kelamin</label>
        <div className="font-medium">{sex || 'Not set'}</div>
      </div>
    </div>

      <hr className="border-t border-gray-200 my-4"/>


    <div className="flex justify-end gap-4 mt-10">
      <button
        onClick={() => setShowChangePassword(true)}
        className="bg-gradient-to-r font-bold mr-2 mb-10 from-[#007DFC] to-[#00C4FF] text-white px-5 py-2 rounded-lg shadow hover:opacity-90 transition"
      >
        Change Password
      </button>
      <button
        onClick={handleLogout}
        className="bg-gradient-to-r font-bold mr-5 mb-10 from-[#ff4b4b] to-[#ff7373] text-white px-5 py-2 rounded-lg shadow hover:opacity-90 transition"
      >
        Logout

      </button>
    </div>
  </div>
</div>
    </div>
  );
};
//   return (
//     <div className="max-w-2xl">
//       <h1 className="text-3xl font-bold text-gray-800 mb-8">Profile</h1>

// <div className="flex justify-center items-center">
//   <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">

//       {/*tambahan gradasi*/}
//       <div className="w-full h-48 bg-gradient-to-b from-[#3D9AF7] via-[#f8fbff] to-[#FFFF]"/>


//     <div className="flex flex-col items-center mb-8">
//       <div className="w-24 h-24 bg-gradient-to-tr from-[#007DFC] to-[#B3FFEA] rounded-full flex items-center justify-center text-white text-3xl font-bold">
//         {username?.charAt(0).toUpperCase() || 'U'}
//       </div>
//       <p className="mt-3 text-gray-700 font-bold mb-1 bg-gradient-to-r from-[#002B56] to-[#004E9D] bg-clip-text text-transparent">{username}</p>
//       <p className="text-gray-500 text-sm">{email}</p>
//     </div>

//     <div className="flex flex-col text-gray-700 space-y-4 items-start pl-10">
//       <div>
//         <label className="block text-sm text-gray-500 mb-1">Umur</label>
//         <div className="font-medium">{age || 'Not set'} Tahun</div>
//       </div>
//       <div>
//         <label className="block text-sm text-gray-500 mb-1">Jenis Kelamin</label>
//         <div className="font-medium">{sex || 'Not set'}</div>
//       </div>
//     </div>

//       <hr className="border-t border-gray-200 my-4"/>


//     <div className="flex justify-end gap-4 mt-10">
//       <button
//         onClick={() => setShowChangePassword(true)}
//         className="bg-gradient-to-r font-bold mr-2 mb-10 from-[#007DFC] to-[#00C4FF] text-white px-5 py-2 rounded-lg shadow hover:opacity-90 transition"
//       >
//         Change Password
//       </button>
//       <button
//         onClick={handleLogout}
//         className="bg-gradient-to-r font-bold mr-5 mb-10 from-[#ff4b4b] to-[#ff7373] text-white px-5 py-2 rounded-lg shadow hover:opacity-90 transition"
//       >
//         Logout

//       </button>
//     </div>
//   </div>
// </div>
//     </div>
//   );
// };




//   if (showChangePassword) {
//     return (
//       <div className="max-w-2xl">
//         <h1 className="text-3xl font-bold text-gray-800 mb-8">Change Password</h1>

//         <div className="bg-white p-6 rounded-lg shadow">
//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//               {error}
//             </div>
//           )}

//           {message && (
//             <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
//               {message}
//             </div>
//           )}

//           <div className="space-y-4">
//             <div>
//               <label className="block text-gray-700 mb-2">Old Password</label>
//               <input
//                 type="password"
//                 value={oldPassword}
//                 onChange={(e) => setOldPassword(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#007DFC]"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 mb-2">New Password</label>
//               <input
//                 type="password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#007DFC]"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 mb-2">Confirm New Password</label>
//               <input
//                 type="password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#007DFC]"
//               />
//             </div>
//           </div>

//           <div className="flex gap-4 mt-6">
//             <button
//               onClick={() => setShowChangePassword(false)}
//               className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleChangePassword}
//               disabled={loading}
//               className="flex-1 bg-[#007DFC] text-white py-2 rounded-lg hover:bg-[#0066cc] transition-colors disabled:opacity-50"
//             >
//               {loading ? 'Changing...' : 'Change Password'}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-2xl">
//       <h1 className="text-3xl font-bold text-gray-800 mb-8">Profile</h1>

//       <div className="bg-white p-6 rounded-lg shadow">
//         <div className="flex flex-col items-center mb-6">
//           <div className="w-24 h-24 bg-[#007DFC] rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
//             {/* {profile?.username?.charAt(0).toUpperCase() || 'U'} */}
//           </div>
//         </div>

//         <div className="space-y-4">

//           <div>
//             <label className="block text-gray-600 text-sm mb-1">Username</label>
//             <div className="text-gray-800 font-medium">{username || 'Not set'}</div>
//           </div>

//           <div>
//             <label className="block text-gray-600 text-sm mb-1">Email</label>
//             <div className="text-gray-800 font-medium">{email || 'Not set'}</div>
//           </div>

//           <div>
//             <label className="block text-gray-600 text-sm mb-1">Umur</label>
//             <div className="text-gray-800 font-medium">{age || 'Not set'} Tahun</div>
//           </div>

//           <div>
//             <label className="block text-gray-600 text-sm mb-1">Sex</label>
//             <div className="text-gray-800 font-medium">{sex || 'Not set'}</div>
//           </div>
//         </div>

//         <div className="flex gap-4 mt-8">
//           <button
//             onClick={() => setShowChangePassword(true)}
//             className="flex-1 bg-[#007DFC] text-white py-2 rounded-lg hover:bg-[#0066cc] transition-colors"
//           >
//             Change Password
//           </button>
//           <button
//             onClick={handleLogout}
//             className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
