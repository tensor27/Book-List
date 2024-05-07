import { FaDeleteLeft } from 'react-icons/fa6'
import { MdBookmarkAdd, MdBookmarkAdded } from 'react-icons/md'

import { useDispatch, useSelector } from 'react-redux'
import {
	deleteBook,
	selectBooks,
	toggleFavourite,
} from '../../redux/slices/bookSlice'

import {
	selectAuthorFilter,
	selectFavouriteFilter,
	selectTitleFilter,
} from '../../redux/slices/filterSlice'

import Styles from './BookList.module.css'

function BookList() {
	const dispatch = useDispatch()
	const books = useSelector(selectBooks)
	const filterTitle = useSelector(selectTitleFilter)
	const filterAuthor = useSelector(selectAuthorFilter)
	const filterFavourite = useSelector(selectFavouriteFilter)

	const filteredBooks = books.filter(book => {
		const matchesTitle = book.title
			.toLowerCase()
			.includes(filterTitle.toLowerCase())

		const matchesAuhor = book.author
			.toLowerCase()
			.includes(filterAuthor.toLowerCase())

		const matchesFavourite = filterFavourite ? book.isFavourite : true
		return matchesAuhor && matchesTitle && matchesFavourite
	})

	const handleDeleteBook = id => {
		dispatch(deleteBook(id))
	}

	const handleToggleFavouriteBook = id => {
		dispatch(toggleFavourite(id))
	}

	return (
		<div className={`app-block ${Styles['book-list']}`}>
			<h2>Book List</h2>
			{books.length === 0 ? (
				<p>No books avaibale</p>
			) : (
				<ul>
					{filteredBooks.map((book, index) => (
						<li key={book.id}>
							<div className={Styles['book-info']}>
								{++index}. <strong>{book.title}</strong> by {book.author}
							</div>
							<span onClick={() => handleToggleFavouriteBook(book.id)}>
								{book.isFavourite ? (
									<MdBookmarkAdded
										className={`${Styles.ico} ${Styles['added-favorite-ico']}`}
									/>
								) : (
									<MdBookmarkAdd
										className={`${Styles.ico} ${Styles['favorite-ico']}`}
									/>
								)}
							</span>
							<FaDeleteLeft
								className={`${Styles.ico} ${Styles['delete-ico']}`}
								onClick={() => handleDeleteBook(book.id)}
							/>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default BookList
