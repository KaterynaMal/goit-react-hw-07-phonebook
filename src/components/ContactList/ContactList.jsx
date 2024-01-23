import React from 'react';
import css from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(store => store.contacts.contacts);
  const filter = useSelector(store => store.contacts.filter);

  const handleDeleteContact = id => {
    const action = {
      type: 'contacts/removeContact',
      payload: id,
    };
    dispatch(action);
  };

  const filteredContacts = Array.isArray(contacts)
    ? contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      )
    : [];

  return (
    <div>
      <ul>
        {Array.isArray(filter ? filteredContacts : contacts) ? (
          (filter ? filteredContacts : contacts).map(contact => (
            <li className={css.contact_item} key={contact.id}>
              {contact.name}: {contact.number}
              <button
                type="button"
                className={css.delete_btn}
                onClick={() => handleDeleteContact(contact.id)}
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <li>No matching contacts found</li>
        )}
      </ul>
    </div>
  );
};

export { ContactList };
