const express = require('express')

const cors = require('cors')
const booksData = require('./data/books.json')

function getRandomBook() {
	const randomIndex = Math.floor(Math.random() * booksData.length)
	const randomBook = booksData[randomIndex]
	return randomBook
}

const app = express()
app.use(cors())

app.get('/random-book', (request, response) => {
	response.json(getRandomBook())
})

app.get('/random-book-delay', (request, response) => {
	setTimeout(() => {
		response.json(getRandomBook())
	}, 2500)
})

const port = process.env.PORT || 4000

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
