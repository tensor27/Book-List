import { useSelector } from 'react-redux'
import Styles from './BookList.module.css'

function BookList() {
	const books = useSelector(state => state.books)

	console.log(books)
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
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default BookList
