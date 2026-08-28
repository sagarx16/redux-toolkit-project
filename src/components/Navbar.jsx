import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const { pathname } = useLocation()
  const collectionCount = useSelector(state => state.collection.items.length)

  return (
    <nav className='flex justify-between items-center py-4 px-6 md:px-12 bg-slate-950/80 border-b border-white/10 backdrop-blur-xl sticky top-0 z-50 transition-all duration-300'>
      <Link to='/' className='flex items-center gap-2.5 group'>
        <div className='w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-pink-500 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300'>
          <div className='w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center'>
            <svg className='w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform duration-300' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z" />
            </svg>
          </div>
        </div>
        <span className='font-bold text-xl tracking-tight text-white'>
          Media<span className='bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent ml-0.5'>Search</span>
        </span>
      </Link>

      <div className='flex gap-1.5 items-center bg-slate-900/90 border border-white/10 p-1.5 rounded-2xl shadow-inner'>
        <Link
          to='/'
          className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 active:scale-95 ${
            pathname === '/'
              ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/25'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <svg className='w-4 h-4' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z" />
          </svg>
          Search
        </Link>
        <Link
          to='/collection'
          className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 active:scale-95 ${
            pathname === '/collection'
              ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/25'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <svg className='w-4 h-4' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
          </svg>
          Collection
          {collectionCount > 0 && (
            <span className='ml-0.5 px-2 py-0.5 text-xs font-bold bg-pink-500 text-white rounded-full animate-pulse'>
              {collectionCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  )
}

export default Navbar