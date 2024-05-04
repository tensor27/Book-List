import { RxReset } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import Styles from './Filter.module.css'

import {
	resetFilter,
	selectTitleFilter,
	setTitleFilter,
} from '../../redux/slices/filterSlice'

function Filter() {
	const dispatch = useDispatch()
	const titleFilterText = useSelector(selectTitleFilter)
	
	const handleFilterTitle = e => {
		dispatch(setTitleFilter(e.target.value))
	}

	const handleResetFilter = () => {
		dispatch(resetFilter())
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
				<RxReset
					className={`ico ${Styles['reset-ico']}`}
					title='Reset filter'
					onClick={handleResetFilter}
				/>
			</div>
		</div>
	)
}

export default Filter
