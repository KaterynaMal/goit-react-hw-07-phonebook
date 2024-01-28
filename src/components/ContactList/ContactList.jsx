import React from 'react';
import css from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { removeContact } from '../../redux/Contacts/contactsReducer';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(store => store.contacts.contacts.items);
  const filter = useSelector(store => store.contacts.filter);

  const handleDeleteContact = id => {
    dispatch(removeContact(id));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <ul>
        {filteredContacts.length > 0 ? (
          filteredContacts.map(contact => (
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
          <li key="no-matching-contacts">No matching contacts found</li>
        )}
      </ul>
    </div>
  );
};

export { ContactList };
