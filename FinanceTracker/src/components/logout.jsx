import { useNavigate } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";
import "./Logout.css"; // Import external CSS file

function Logout() {
  const navigate = useNavigate();
  const { signOut } = useClerk(); // Get signOut function from Clerk

  const handleLogout = async () => {
    try {
      await signOut(); // Clerk handles session removal
      navigate("/"); // Redirect to homepage
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
}

export default Logout;
