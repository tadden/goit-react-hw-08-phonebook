import { useDispatch, useSelector } from 'react-redux';
import { authSelectors, authOperations } from 'redux/auth';
import defaultAvatar from './default-avatar.png';
import s from './UserMenu.module.css';
import Button from '@mui/material/Button';

export default function UserMenu() {
  const dispatch = useDispatch();
  const name = useSelector(authSelectors.getUserName);
  const avatar = defaultAvatar;

  return (
    <div className={s.container}>
      <img className={s.avatar} src={avatar} alt="user avatar" width="32" />
      <span className={s.text}>Welcome, {name}</span>
      <Button
        onClick={() => dispatch(authOperations.logOut())}
        variant="contained"
      >
        Log out
      </Button>
    </div>
  );
}
