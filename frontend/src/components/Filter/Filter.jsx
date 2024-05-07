import { MdOutlineBookmarks } from 'react-icons/md'
import { RxReset } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import Styles from './Filter.module.css'

import {
	resetFilter,
	selectAuthorFilter,
	selectFavouriteFilter,
	selectTitleFilter,
	setAuthorFilter,
	setFavouriteFilter,
	setTitleFilter,
} from '../../redux/slices/filterSlice'

function Filter() {
	const dispatch = useDispatch()
	const titleFilterText = useSelector(selectTitleFilter)
	const authorFilterText = useSelector(selectAuthorFilter)
	const favouriteFilter = useSelector(selectFavouriteFilter)

	const handleFilterTitle = e => {
		dispatch(setTitleFilter(e.target.value))
	}

	const handleFilterAuthor = e => {
		dispatch(setAuthorFilter(e.target.value))
	}

	const handleResetFilter = () => {
		dispatch(resetFilter())
	}

	const handleFilterFavourite = () => {
		dispatch(setFavouriteFilter())
	}

	return (
		<div className={`app-block ${Styles.filter}`}>
			<div className={`${Styles['filter-group']}`}>
				<input
					type='text'
					placeholder='Filter by title...'
					onChange={handleFilterTitle}
					value={titleFilterText}
				/>
				<input
					type='text'
					placeholder='Filter by author...'
					onChange={handleFilterAuthor}
					value={authorFilterText}
				/>
				<RxReset
					className={`ico ${Styles['reset-ico']}`}
					title='Reset filter'
					onClick={handleResetFilter}
				/>
				<MdOutlineBookmarks
					className={`ico ${Styles['show-favourite-ico']} ${
						favouriteFilter ? Styles['active'] : null
					}`}
					title='Show only favourite books'
					onClick={handleFilterFavourite}
				/>
			</div>
		</div>
	)
}

export default Filter
