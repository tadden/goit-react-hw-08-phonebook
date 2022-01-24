import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './ContactForm.module.css';
import Button from '@mui/material/Button';
import { getItems } from 'redux/contacts/contacts-selector';
import * as operations from 'redux/contacts/contacts-operations';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const items = useSelector(getItems);
  const dispatch = useDispatch();

  const handleNameChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      // no default
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const duplicateValidator = name =>
      items.find(contact => contact.name === name);

    duplicateValidator(name)
      ? alert(`${name} is already in contacts`)
      : dispatch(operations.addContact({ name, number }));

    setName('');
    setNumber('');
  };

  return (
    <div>
      <form className={s.form} onSubmit={handleSubmit}>
        <label>Name</label>

        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
          className={s.input}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
        />
        <label>Number</label>
        <input
          type="tel"
          name="number"
          value={number}
          onChange={handleNameChange}
          className={s.input}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
        />
        <Button type="submit" variant="contained">
          Add contact
        </Button>
      </form>
    </div>
  );
}
