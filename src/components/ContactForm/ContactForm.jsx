import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/Contacts/contactsReducer';

import css from './ContactForm.module.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();
  const contacts = useSelector(store => store.contacts.items) || [];

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handlePhoneChange = e => {
    setNumber(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (name.trim() === '' || number.trim() === '') {
      alert('Please, enter name and phone number');
      return;
    }

    const isNameExist = Array.isArray(contacts)
      ? contacts.some(
          contact => contact.name.toLowerCase() === name.trim().toLowerCase()
        )
      : false;
      

    if (isNameExist) {
      alert(`${name} is already in contacts`);
      return;
    }

    const newContact = {
      name: name.trim(),
      number: number.trim(),

     
    };

     console.log(newContact);

    dispatch(addContact(newContact));
    setName('');
    setNumber('');
  };

  return (
    <div>
      <form className={css.form} onSubmit={handleSubmit}>
        <label className={css.label}>Name</label>
        <input
          className={css.input}
          type="text"
          name="name"
          required
          value={name}
          onChange={handleNameChange}
        />

        <label className={css.label}>Number</label>
        <input
          className={css.input}
          type="tel"
          name="number"
          required
          value={number}
          onChange={handlePhoneChange}
        />

        <button className={css.btn} type="submit" >
          Add contact
        </button>
      </form>
    </div>
  );
};

export { ContactForm };

// const action = {
//   type: 'contacts/addContact',
//   payload: newContact,
// };
// dispatch(action);

// setName('');
// setNumber('');
