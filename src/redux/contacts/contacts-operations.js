import * as contactsAPI from 'services/contacts-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchContacts = createAsyncThunk(
  'contacts/FetchContacts',
  async (_, { rejectWithValue }) => {
    try {
      const contacts = await contactsAPI.fetchContacts();
      return contacts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addContact = createAsyncThunk(
  'contacts/AddContact',
  async ({ name, number }, { rejectWithValue }) => {
    try {
      const contact = await contactsAPI.addContact(name, number);
      return contact;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteContact = createAsyncThunk(
  'contacts/DeleteContact',
  async (id, { rejectWithValue }) => {
    try {
      await contactsAPI.deleteContact(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
