import { v4 as uuidv4 } from 'uuid'

const createBookWithId = book => {
	return {
		...book,
		isFavourite: false,
		id: uuidv4(),
	}
}

export default createBookWithId
