import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setQuery } from '../redux/features/searchSlice'

const SearchBar = () => {

    const [text, setText] = useState('')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(setQuery(text))
        setText('')
    }

    return (
        <div className='w-full px-10 py-10 bg-(--c1)'>
            <form
                onSubmit={submitHandler}
                className='flex items-center gap-3 w-full max-w-3xl mx-auto bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl px-4 py-3 transition-all duration-200 focus-within:border-white/35 focus-within:bg-white/15'
            >
                <svg className='w-5 h-5 text-white/40 flex-shrink-0' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z" />
                </svg>

                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                    className='flex-1 bg-transparent text-white placeholder-white/30 text-base font-medium outline-none tracking-wide'
                    type="text"
                    placeholder='Search photos, videos...'
                />

                <button
                    className='flex-shrink-0 bg-white text-(--c1) text-sm font-semibold px-5 py-2 rounded-xl cursor-pointer tracking-wide transition-all duration-150 hover:bg-white/90 active:scale-95'
                >
                    Search
                </button>
            </form>
        </div>
    )
}

export default SearchBar