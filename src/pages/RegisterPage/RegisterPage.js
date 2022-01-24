import s from './RegisterPage.module.css';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authOperations } from 'redux/auth';
import ContentContainer from 'components/ContentContainer';
const { register } = authOperations;

export default function RegisterPage() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        return setName(value);
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <ContentContainer>
      <h1>Registration page</h1>

      <form className={s.form} onSubmit={handleSubmit} autoComplete="on">
        <label className={s.label}>
          Name
          <input
            type="text"
            name="name"
            value={name}
            className={s.input}
            onChange={handleChange}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={email}
            className={s.input}
            onChange={handleChange}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={password}
            className={s.input}
            onChange={handleChange}
          />
        </label>
        <Button type="submit" variant="contained">
          Register
        </Button>
      </form>
    </ContentContainer>
  );
}
