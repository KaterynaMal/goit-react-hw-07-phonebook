import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from './Filter.module.css';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(store => store.contacts.filter);

  const handleFilter = e => {
    const action = {
      type: 'contacts/setFilter',
      payload: e.target.value,
    };
    dispatch(action);
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
