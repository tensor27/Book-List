import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	error: null,
	date: null,
	errorType: null,
}

const errorSlice = createSlice({
	name: 'error',
	initialState,
	reducers: {
		setError: (state, action) => {
			state.error = action.payload.error
			state.date = new Date() + ''
			state.errorType = action.payload.errorType || 'info'
		},
		clearError: () => {
			return initialState
		},
	},
})

export const { setError, clearError } = errorSlice.actions

export const selectErrorMessage = state => state.error

export default errorSlice.reducer
