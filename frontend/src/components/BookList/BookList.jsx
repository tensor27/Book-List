import { FaDeleteLeft } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBook } from '../../redux/books/actioCreators'
import Styles from './BookList.module.css'

function BookList() {
	const books = useSelector(state => state.books)
	const dispatch = useDispatch()

	const handleDeleteBook = id => {
		dispatch(deleteBook(id))
	}

	return (
		<div className={`app-block ${Styles['book-list']}`}>
			<h2>Book List</h2>
			{books.length === 0 ? (
				<p>No books avaibale</p>
			) : (
				<ul>
					{books.map((book, index) => (
						<li key={book.id}>
							<div className={Styles['book-info']}>
								{++index}. <strong>{book.title}</strong> by {book.author}
							</div>
							<FaDeleteLeft
								className={Styles['delete-ico']}
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
