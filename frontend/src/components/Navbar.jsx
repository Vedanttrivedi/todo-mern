import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const NavBar = () => {
  return (
    <div className={styles.navBar}>
      <Link to="/" className={styles.navLink}>Home</Link>
      <Link to="/add/" className={styles.navLink}>Add Task</Link>
      <Link to="/about/" className={styles.navLink}>About</Link>
    </div>
  );
};

export default NavBar;
