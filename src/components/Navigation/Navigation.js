import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';
import { authSelectors } from 'redux/auth';
import { useSelector } from 'react-redux';

export default function Navigation() {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <nav>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? s.activeLink : s.link)}
      >
        Welcome
      </NavLink>

      {isLoggedIn && (
        <NavLink
          to="/contacts"
          className={({ isActive }) => (isActive ? s.activeLink : s.link)}
        >
          Contacts
        </NavLink>
      )}
    </nav>
  );
}
