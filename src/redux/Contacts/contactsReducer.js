import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { requestContacts, createContact, deleteContactApi } from 'services/api';

export const apiGetContacts = createAsyncThunk(
  'contacts/apiGetContacts',
  async (_, thunkApi) => {
    try {
      const contacts = await requestContacts();

      return contacts;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contactData, thunkApi) => {
    try {
      const newContact = await createContact(contactData);
      return newContact;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContactApi',
  async (contactId, thunkApi) => {
    try {
      await deleteContactApi(contactId);
      return contactId;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const setFilter = createAction('contacts/setFilter');

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    filter: '',
  },
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(requestContacts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(requestContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addContact.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteContactApi.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteContactApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(
          contact => contact.id !== action.payload
        );
      })
      .addCase(deleteContactApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const contactsReducer = contactsSlice.reducer;

// export const contactsReducer = contactsSlice.reducer;
// export default contactsSlice.reducer;

// const initialState = {
//   contacts: {
//     items: [],
//     isLoading: false,
//     error: null,
//   },
//   filter: '',
// };

// const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState: initialState,
//   reducers: {
//     addContact(state, action) {
//       if (!state.contacts.items) {
//         state.contacts.items = [];
//       }
//       state.contacts.items = [...state.contacts.items, action.payload];
//     },
//     removeContact(state, action) {
//       state.contacts.items = state.contacts.items.filter(
//         contact => contact.id !== action.payload
//       );
//     },
//     setFilter(state, action) {
//       state.filter = action.payload;
//     },
//   },

//   extraReducers: builder => {
//     builder
//       .addCase(apiGetContacts.pending, state => {
//         state.contacts.isLoading = true;
//         state.contacts.error = null;
//       })
//       .addCase(apiGetContacts.fulfilled, (state, action) => {
//         state.contacts.isLoading = false;
//         state.contacts.items = action.payload;
//       })
//       .addCase(apiGetContacts.rejected, (state, action) => {
//         state.contacts.isLoading = false;
//         state.contacts.error = action.payload;
//       });
//   },
// });

// export const { addContact, removeContact, setFilter } = contactsSlice.actions;

// export const contactsReducer = contactsSlice.reducer;

// --------------------------------

// export const contactsReducer = (state = initialState, action) => {
//     switch (action.type) {
//     case 'contacts/addContact': {
//       return { ...state, contacts: [...state.contacts, action.payload] };
//     }
//     case 'contacts/removeContact': {
//       return {
//         ...state,
//         contacts: state.contacts.filter(contact => contact.id !== action.payload),
//       };
//     }
//     case 'contacts/setFilter': {
//       return { ...state, filter: action.payload };
//     }
//     default:
//       return state;
//   }
// }
