import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
  
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');


    sessionStorage.clear();

    fetch('/api/logout', {
      method: 'POST',
      credentials: 'include', 
    }).then(() => {
    
      navigate('/');
    }).catch(error => {
      console.error('Logout failed:', error);
    });
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;
