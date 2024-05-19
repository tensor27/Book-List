import axios from 'axios'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import createBookWithId from '../../utils/createBookWithId'
import { setError } from './errorSlice'

const initialState = {
	books: [],
	isLoadingViaAPI: false,
}

export const fetchBook = createAsyncThunk(
	'books/fetchBook',
	async (url, thunkAPI) => {
		try {
			const response = await axios.get(url)
			return response.data
		} catch (error) {
			thunkAPI.dispatch(setError({ error: error.message, errorType: 'error' }))
			console.error(error)
			return thunkAPI.rejectWithValue({
				error: error.message,
				code: error.code,
			})
		}
	}
)

const bookSlice = createSlice({
	name: 'books',
	initialState,
	reducers: {
		addBook: (state, action) => {
			state.books.push(action.payload)
		},
		deleteBook: (state, action) => {
			console.log(state)
			return {
				...state,
				books: state.books.filter(book => book.id !== action.payload),
			}
		},
		toggleFavourite: (state, action) => {
			// state.books.forEach(book => {
			// 	if (book.id === action.payload) {
			// 		book.isFavourite = !book.isFavourite
			// 	}
			// })
			return {
				...state,
				books: state.books.map(book => {
					return book.id === action.payload
						? { ...book, isFavourite: !book.isFavourite }
						: book
				}),
			}
		},
		clearAllBooks: () => {
			return initialState
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchBook.fulfilled, (state, action) => {
			state.isLoadingViaAPI = false
			if (action.payload.title && action.payload.author) {
				state.books.push(createBookWithId(action.payload, 'API'))
			}
		})
		builder.addCase(fetchBook.pending, state => {
			state.isLoadingViaAPI = true
		})
		builder.addCase(fetchBook.rejected, state => {
			state.isLoadingViaAPI = false
		})
	},
})

export const { addBook, deleteBook, toggleFavourite, clearAllBooks } =
	bookSlice.actions

export const selectBooks = state => state.books.books
export const selectIsLoadingViaAPI = state => state.books.isLoadingViaAPI

export default bookSlice.reducer
