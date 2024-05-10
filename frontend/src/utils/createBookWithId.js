import { v4 as uuidv4 } from 'uuid'

const createBookWithId = (book, source) => {
	return {
		...book,
		isFavourite: false,
		id: uuidv4(),
		source,
	}
}

export default createBookWithId
