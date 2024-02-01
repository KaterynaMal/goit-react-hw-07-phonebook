import { createSlice } from '@reduxjs/toolkit';
import { apiGetContacts, addContact, deleteContact } from 'services/api';

const initialState = {
  contacts: {
items: [],
  isLoading: false,
  error: null,
  },
  filter: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(apiGetContacts.pending, state => {
        state.isLoading = true;
      })
      .addCase(apiGetContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(apiGetContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addContact.pending, state => {
        state.isLoading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteContact.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = state.items.filter(
          contact => contact.id !== action.payload
        );
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilter } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;

// export const apiGetContacts = createAsyncThunk(
//   'contacts/apiGetContacts',
//   async (_, thunkApi) => {
//     try {
//       const contacts = await requestContacts();

//       return contacts;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );

// export const addContact = createAsyncThunk(
//   'contacts/addContact',
//   async (contactData, thunkApi) => {
//     try {
//       const newContact = await createContact(contactData);
//       return newContact;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );

// export const deleteContact = createAsyncThunk(
//   'contacts/deleteContact',
//   async (contactId, thunkApi) => {
//     try {
//       await deleteContactApi(contactId);
//       return contactId;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );

// export const setFilter = createAction('contacts/setFilter');
