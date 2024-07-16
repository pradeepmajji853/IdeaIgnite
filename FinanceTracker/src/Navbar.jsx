import "./Navbar.css";
export default function Navbar() {

  return (
    <div className="Navbar">
        <h1>CampusCash</h1>
      <ul>
        <li>
          <a>Get started</a>
        </li>
        <li>
          <a>Bank Connect</a>
        </li>
        <li>
          <a>Features</a>
        </li>
        <li>
          <a>SignUp</a>
        </li>
        <li className="divider"></li>
        <li>
          <a>Login</a>
        </li>
      </ul>
    </div>
  );
}
