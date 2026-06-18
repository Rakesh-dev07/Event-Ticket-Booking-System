import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
      <Link
        to="/"
        className="text-xl font-bold"
      >
        Event Booking
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span>
              Welcome, {user.name}
            </span>

            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;