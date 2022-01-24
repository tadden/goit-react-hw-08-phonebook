import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';
import * as operations from 'redux/contacts/contacts-operations';
import { getFilteredContacts } from 'redux/contacts/contacts-selector';
import s from './ContactList.module.css';

export default function ContactList() {
  const items = useSelector(getFilteredContacts);

  const dispatch = useDispatch();

  useEffect(() => dispatch(operations.fetchContacts()), [dispatch]);

  return (
    <>
      {items.length > 0 && (
        <ul className={s.list}>
          {items.map(({ name, number, id }) => (
            <li className={s.item} key={id}>
              <p>
                {name} : {number}
              </p>
              <Button
                onClick={() => {
                  dispatch(operations.deleteContact(id));
                }}
                variant="contained"
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
