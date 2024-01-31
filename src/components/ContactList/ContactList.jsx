import React, { useEffect } from 'react';
import css from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { apiGetContacts, deleteContact } from 'services/api';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(store => store.contacts.items);
  const filter = useSelector(store => store.filter);

  useEffect(() => {
    dispatch(apiGetContacts());
  }, [dispatch]);

  const handleDeleteContact = async id => {
    try {
      await dispatch(deleteContact(id));
    } catch (error) {
      console.error('Failed to remove contact:', error);
    }
  };

  const filteredContacts = Array.isArray(contacts)
    ? contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      )
    : [];

  return (
    <div>
      <ul>
        {Array.isArray(filter ? filteredContacts : contacts) &&
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
          ))}
        {Array.isArray(filter ? filteredContacts : contacts) &&
          (filter ? filteredContacts : contacts).length === 0 && (
            <li>No matching contacts found</li>
          )}
      </ul>
    </div>
  );
};

export { ContactList };

// import React from 'react';
// import css from './ContactList.module.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { removeContact } from '../../redux/Contacts/contactsReducer';

// const ContactList = () => {
//   const dispatch = useDispatch();
//   const contacts = useSelector(store => store.contacts.contacts.items);
//   const filter = useSelector(store => store.contacts.filter);

//   const handleDeleteContact = id => {
//     dispatch(removeContact(id));
//   };

//     const filteredContacts = Array.isArray(contacts)
//     ? contacts.filter(contact =>
//       contact.name.toLowerCase().includes(filter.toLowerCase())
//     )
//     : [];

//   return (
//     <div>
//       <ul>
//          {Array.isArray(filter ? filteredContacts : contacts) &&
//           (filter ? filteredContacts : contacts).map(contact => (
//             {
//               filteredContacts.length > 0 ? (
//                 filteredContacts.map(contact => (
//                   <li className={css.contact_item} key={contact.id}>
//                     {contact.name}: {contact.number}
//                     <button
//                       type="button"
//                       className={css.delete_btn}
//                       onClick={() => handleDeleteContact(contact.id)}
//                     >
//                       Delete
//                     </button>
//                   </li>
//                 ))}
//         {Array.isArray(filter ? filteredContacts : contacts) &&
//           (filter ? filteredContacts : contacts).length === 0 && (
//           <li key="no-matching-contacts">No matching contacts found</li>
//         )}
//       </ul>
//     </div>
//   );
// };

// export { ContactList };

//   useEffect(() => {
//     if (contacts && contacts.length > 0) {
// const contactId = contacts[0].id;
//     dispatch(deleteContact(contactId));
//     }

//   }, [dispatch, contacts]);
