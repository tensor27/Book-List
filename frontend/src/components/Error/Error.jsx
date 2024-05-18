import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import { clearError, selectErrorMessage } from '../../redux/slices/errorSlice'

function Error() {
	const errorMessage = useSelector(selectErrorMessage)
	const dispatch = useDispatch()

	useEffect(() => {
		if (errorMessage.error) {
			toast[errorMessage.errorType](errorMessage.error)
			dispatch(clearError())
		}
	}, [errorMessage, dispatch])

	return <ToastContainer position='top-right' autoClose={2000} theme='dark' />
}

export default Error
