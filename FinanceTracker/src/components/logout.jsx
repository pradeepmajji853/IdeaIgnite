import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');

    // Optionally clear sessionStorage
    sessionStorage.clear();

    // Call backend to invalidate session (if applicable)
    fetch('/api/logout', {
      method: 'POST',
      credentials: 'include', // Send cookies if using session-based auth
    }).then(() => {
      // Redirect to login page
      navigate('/');
    }).catch(error => {
      console.error('Logout failed:', error);
    });
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;
