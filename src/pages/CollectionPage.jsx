import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import CollectionCard from "../components/CollectionCard"
import { clearCollection } from '../redux/features/collectionSlice'

const CollectionPage = () => {
  const collection = useSelector(state => state.collection.items)
  const dispatch = useDispatch()

  const clearAll = () => dispatch(clearCollection())

  return (
    <div className="min-h-screen px-6 md:px-12 py-10 bg-slate-950">
      {collection.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-28 px-6 text-center">
          <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 shadow-xl shadow-indigo-500/5">
            <svg className="w-10 h-10 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Your collection is empty</h2>
          <p className="text-sm text-slate-400 max-w-sm mb-8 font-medium">Save your favorite photos and videos while exploring to access them anytime here.</p>
          <Link
            to='/'
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-semibold px-6 py-3 rounded-xl cursor-pointer shadow-lg shadow-indigo-600/30 transition-all duration-200 active:scale-95"
          >
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z" />
            </svg>
            Explore Media
          </Link>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-white/10">
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">Your <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Collection</span></h1>
              <p className="text-sm text-slate-400 mt-1 font-medium">{collection.length} saved {collection.length === 1 ? 'item' : 'items'} stored locally</p>
            </div>

            <button
              onClick={clearAll}
              className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 text-red-300 text-sm font-semibold px-5 py-2.5 rounded-xl cursor-pointer transition-all duration-200 active:scale-95 shadow-lg shadow-black/20"
            >
              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
              Clear All
            </button>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
            {collection.map((item) => (
              <CollectionCard key={item.id} item={item} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default CollectionPage