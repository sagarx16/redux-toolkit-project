import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setQuery } from '../redux/features/searchSlice'

const SearchBar = () => {
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    const currentQuery = useSelector(state => state.search.query)

    const trendingTags = ['Cyberpunk', 'Nature 4K', 'Abstract', 'Architecture', 'Minimalist']

    const submitHandler = (e) => {
        e.preventDefault()
        if (text.trim()) {
            dispatch(setQuery(text.trim()))
        }
    }

    const handleTagClick = (tag) => {
        setText(tag)
        dispatch(setQuery(tag))
    }

    return (
        <div className='relative w-full px-6 py-14 md:py-20 overflow-hidden bg-slate-950 flex flex-col items-center justify-center text-center'>
            {/* Ambient Backlight Glows */}
            <div className='absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-gradient-to-r from-indigo-600/30 via-purple-600/25 to-pink-500/20 blur-[120px] rounded-full pointer-events-none animate-pulse-slow' />
            
            <div className='relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center'>
                <span className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4 backdrop-blur-md shadow-inner'>
                  ✨ Powered by Unsplash & Pexels
                </span>
                
                <h1 className='text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3'>
                    Explore Stunning <span className='bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>Photos & Videos</span>
                </h1>
                <p className='text-slate-400 text-sm md:text-base max-w-lg mb-8 font-medium'>
                    High-resolution imagery and 4K footage curated for creators, designers, and developers.
                </p>

                <form
                    onSubmit={submitHandler}
                    className='group relative flex items-center gap-3 w-full max-w-2xl bg-slate-900/80 backdrop-blur-2xl border border-white/15 rounded-2xl p-2 pl-5 transition-all duration-300 focus-within:border-indigo-500/60 focus-within:ring-4 focus-within:ring-indigo-500/15 shadow-2xl shadow-slate-950'
                >
                    <svg className='w-5 h-5 text-indigo-400 flex-shrink-0 transition-transform duration-300 group-focus-within:scale-110' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z" />
                    </svg>

                    <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                        className='flex-1 bg-transparent text-white placeholder-slate-500 text-base font-medium outline-none tracking-wide py-2'
                        type="text"
                        placeholder='Search photos, 4K videos...'
                    />

                    {text && (
                        <button
                            type='button'
                            onClick={() => setText('')}
                            className='text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors'
                        >
                            <svg className='w-4 h-4' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}

                    <button
                        type='submit'
                        className='flex-shrink-0 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-semibold px-6 py-3 rounded-xl cursor-pointer tracking-wide shadow-md shadow-indigo-600/30 transition-all duration-200 active:scale-95'
                    >
                        Search
                    </button>
                </form>

                {/* Trending Tags */}
                <div className='flex flex-wrap items-center justify-center gap-2 mt-5 text-xs text-slate-400'>
                    <span className='font-semibold text-slate-500'>Trending:</span>
                    {trendingTags.map((tag) => (
                        <button
                            key={tag}
                            type='button'
                            onClick={() => handleTagClick(tag)}
                            className={`px-3 py-1 rounded-lg border transition-all duration-200 active:scale-95 ${
                                currentQuery === tag
                                    ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-slate-300'
                            }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SearchBar