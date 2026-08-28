import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const { pathname } = useLocation()

  return (
    <nav className='flex justify-between items-center py-4 px-10 bg-(--c2) border-b border-white/10 backdrop-blur-md sticky top-0 z-50'>
      <Link to='/' className='font-semibold text-xl tracking-tight text-(--c4) hover:opacity-75 transition-opacity duration-200'>
        Media<span className='text-(--c3)'>Search</span>
      </Link>

      <div className='flex gap-1 items-center bg-white/5 border border-white/10 p-1 rounded-xl'>
        <Link
          to='/'
          className={`text-sm font-medium px-5 py-2 rounded-lg transition-all duration-200 active:scale-95 ${
            pathname === '/'
              ? 'bg-(--c4) text-(--c1) shadow-sm'
              : 'text-(--c4) opacity-50 hover:opacity-80 hover:bg-white/10'
          }`}
        >
          Search
        </Link>
        <Link
          to='/collection'
          className={`text-sm font-medium px-5 py-2 rounded-lg transition-all duration-200 active:scale-95 ${
            pathname === '/collection'
              ? 'bg-(--c4) text-(--c1) shadow-sm'
              : 'text-(--c4) opacity-50 hover:opacity-80 hover:bg-white/10'
          }`}
        >
          Collection
        </Link>
      </div>
    </nav>
  )
}

export default Navbar