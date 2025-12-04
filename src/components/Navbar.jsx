import { Link, useNavigate } from "react-router-dom";

export default function Navbar(){
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow p-3">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="font-bold text-xl">Contact Manager</Link>
        <div className="space-x-3">
          {token ? (
            <>
              <Link to="/contacts" className="px-3 py-1 rounded hover:bg-gray-100">Contacts</Link>
              <button onClick={handleLogout} className="px-3 py-1 bg-red-500 text-white rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1">Login</Link>
              <Link to="/register" className="px-3 py-1">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
