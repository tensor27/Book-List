import axios from 'axios'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import createBookWithId from '../../utils/createBookWithId'

const initialState = []

export const fetchBook = createAsyncThunk('books/fetchBook', async () => {
	const response = await axios.get('http://localhost:5000/random-book')
	return response.data
})

const bookSlice = createSlice({
	name: 'books',
	initialState,
	reducers: {
		addBook: (state, action) => {
			return [...state, action.payload]
		},
		deleteBook: (state, action) => {
			return state.filter(book => book.id !== action.payload)
		},
		toggleFavourite: (state, action) => {
			return state.map(book => {
				return book.id === action.payload
					? { ...book, isFavourite: !book.isFavourite }
					: book
			})
		},
		clearAllBooks: () => {
			return initialState
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchBook.fulfilled, (state, action) => {
			if (action.payload.title && action.payload.author) {
				return [...state, createBookWithId(action.payload, 'API')]
			}
		})
	},
})

export const { addBook, deleteBook, toggleFavourite, clearAllBooks } =
	bookSlice.actions

export const selectBooks = state => state.books

export default bookSlice.reducer
