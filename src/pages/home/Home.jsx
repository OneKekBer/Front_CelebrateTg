import { useSelector } from 'react-redux'
import s from './home.module.scss'
import { useState } from 'react'
import Calendar from 'react-calendar'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logedOut } from './../../store/auth/authSlice'


import 'react-calendar/dist/Calendar.css'

const Home = () => {
	const dispatch = useDispatch()

	const status = useSelector(state => state.auth.status)
	const [value, onChange] = useState(new Date())
	const [isCalendarOn, setIsCalendarOn] = useState(false)
	return (
		<div>
			{status === 'guest' || status === 'wait' ? (
				<div className={s.notLogin}>
					{' '}
					<Link to='/login' className={s.cont}>
						<h1>Please Log In</h1> <div className={s.button}>log in</div>{' '}
					</Link>
				</div>
			) : (
				<div className='bg-slate-200 relative h-screen flex justify-center items-center'>
					{isCalendarOn && <div className='fixed top-1/2 left-1/2 transform translate-x-1/2 -translate-y-1/2 '>
						<Calendar onChange={onChange} value={value} />
					</div>}

					<div onClick={() => {
						dispatch(logedOut())
					}} className='absolute top-5 right-5 text-red-500'>logedOut</div>

					<div className='w-[800px] p-5 bg-white  h-[80vh] shadow-2xl'>

						<h1>Hello!!</h1>

						<div className=' w-full	 h-[300px] bg-slate-200' ></div>
						<div className={s.btn}> Новое Событие</div>
					</div>


				</div>
			)}
		</div>
	)
}

export default Home
