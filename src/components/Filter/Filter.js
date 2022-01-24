import s from './Filter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getFilter } from 'redux/contacts/contacts-selector';
import * as actions from 'redux/contacts/contacts-slice';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Filter() {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        label="Find contacts by name"
        type="text"
        value={filter}
        onChange={e => dispatch(actions.filter(e.target.value))}
      />
    </Box>
  );
}
