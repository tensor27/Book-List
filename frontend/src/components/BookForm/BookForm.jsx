import { useState } from 'react'
import { useDispatch } from 'react-redux'
import booksData from '../../data/books.json'
import { addBook, fetchBook } from '../../redux/slices/bookSlice'
import { setError } from '../../redux/slices/errorSlice'
import createBookWithId from '../../utils/createBookWithId'
import Styles from './BookForm.module.css'

const BookForm = () => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const dispatch = useDispatch()

	const handleSubmit = e => {
		e.preventDefault()

		if (title && author) {
			const book = createBookWithId({ title, author }, 'manual')
			dispatch(addBook(book))
			setTitle('')
			setAuthor('')
		} else {
			dispatch(
				setError({ error: 'You must fill title and author', type: 'info' })
			)
		}
	}

	const handleAddRandomBook = () => {
		const randomIndex = Math.floor(Math.random() * booksData.length)
		const randomBook = booksData[randomIndex]

		const randomBookWithId = createBookWithId(randomBook, 'random')
		dispatch(addBook(randomBookWithId))
	}

	const handleBookRequest = () => {
		dispatch(fetchBook('http://localhost:4000/random-book'))
	}

	return (
		<div className={`app-block ${Styles['book-form']}`}>
			<h2>Add a New Book</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='title'>Title: </label>
					<input
						type='text'
						id='title'
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor='author'>Author: </label>
					<input
						type='text'
						id='author'
						value={author}
						onChange={e => setAuthor(e.target.value)}
					/>
				</div>
				<button type='submit'>Add book</button>
				<button type='button' onClick={handleAddRandomBook}>
					Add random book
				</button>
				<button type='button' onClick={handleBookRequest}>
					Add random book via API
				</button>
			</form>
		</div>
	)
}

export default BookForm
