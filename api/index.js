const express = require('express')

const cors = require('cors')
const booksData = require('./data/books.json')

const app = express()

app.get('/random-book', (request, response) => {
	const randomIndex = Math.floor(Math.random() * booksData.length)
	const randomBook = booksData[randomIndex]
	response.json(randomBook)
})

const port = process.env.PORT || 4000

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
