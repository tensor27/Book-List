import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import booksData from '../../data/books.json'
import { addBook } from '../../redux/books/actioCreators'
import Styles from './BookForm.module.css'

const BookForm = () => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const dispatch = useDispatch()

	const handleSubmit = e => {
		e.preventDefault()

		if (title && author) {
			const book = { title, author, id: uuidv4(), isFavourite: false }
			dispatch(addBook(book))
			setTitle('')
			setAuthor('')
		}
	}

	const handleAddRandomBook = () => {
		const randomIndex = Math.floor(Math.random() * booksData.length)
		const randomBook = {
			...booksData[randomIndex],
			id: uuidv4(),
			isFavourite: false,
		}
		console.log(randomBook)
		dispatch(addBook(randomBook))
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
			</form>
		</div>
	)
}

export default BookForm
