import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'services/api';

import css from './ContactForm.module.css';

const ContactForm = () => {
  const dispatch = useDispatch();
  // const contactsName = useSelector(store => store.contacts.items).map(
    // contact => contact.name);
  const contactsName = useSelector(store => store.contacts ? store.contacts.items.map(contact => contact.name) : []);
  
  const handleSubmit = e => {
    e.preventDefault();
    const newName = e.currentTarget.elements.name.value;

    if (!contactsName.some(name => name.toLowerCase() === newName.toLowerCase())) {
      const newNumb = e.currentTarget.elements.number.value;
      const newContact = {
        name: newName,
        phone: newNumb,
      };
      dispatch(addContact(newContact));
      e.currentTarget.reset();
    } else {
      alert(`${newName} is already in contacts.`);
    }
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
          // value={name}
          // onChange={handleNameChange}
        />

        <label className={css.label}>Number</label>
        <input
          className={css.input}
          type="tel"
          name="number"
          required
          // value={number}
          // onChange={handlePhoneChange}
        />

        <button className={css.btn} type="submit">
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

// ===========
// useEffect(() => {
//     const newContact = {
//     name: name.trim(),
//     number: number.trim(),
//   };
//   dispatch(addContact(newContact));
// }, [dispatch]);

// // const name = useSelector(store => store.contacts.name);
// // const number = useSelector(store => store.contacts.number);

// const handleNameChange = e => {
//   setName(e.target.value);
// };

// const handlePhoneChange = e => {
//   setNumber(e.target.value);
// };

// const handleSubmit = async e => {
//   e.preventDefault();

//   if (name.trim() === '' || number.trim() === '') {
//     alert('Please, enter name and phone number');
//     return;
//   }

//   const isNameExist = Array.isArray(contacts)
//     ? contacts.some(
//         contact => contact.name.toLowerCase() === name.trim().toLowerCase()
//       )
//     : false;

//   if (isNameExist) {
//     alert(`${name} is already in contacts`);
//     return;
//   }

//  console.log(newContact);

// try {
//   await dispatch(addContact(newContact));
//   setName('');
//   setNumber('');
// } catch (error) {
//   console.error('Failed to add contact:', error);
// }
