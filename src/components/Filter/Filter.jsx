import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/Contacts/contactsReducer';
import css from './Filter.module.css';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(store => store.contacts.filter);

  // useEffect(() => {
  //   dispatch()
  // })

  const handleFilter = e => {
    dispatch(setFilter(e.target.value));
    // setFilter();
  };

  return (
    <div>
      <p>Find contacts by name</p>
      <input
        className={css.filter_input}
        type="text"
        value={filter}
        onChange={handleFilter}
      />
    </div>
  );
};

export { Filter };