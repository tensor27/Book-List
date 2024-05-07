import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	title: '',
	author: '',
	showFavourites: false,
}

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setTitleFilter: (state, action) => {
			state.title = action.payload
		},
		setAuthorFilter: (state, action) => {
			state.author = action.payload
		},
		resetFilter: () => {
			return initialState
		},
		setFavouriteFilter: state => {
			state.showFavourites = !state.showFavourites
		},
	},
})

export const {
	setTitleFilter,
	setAuthorFilter,
	resetFilter,
	setFavouriteFilter,
} = filterSlice.actions

export const selectTitleFilter = state => state.filter.title
export const selectAuthorFilter = state => state.filter.author
export const selectFavouriteFilter = state => state.filter.showFavourites

export default filterSlice.reducer
