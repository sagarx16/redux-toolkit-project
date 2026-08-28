import { useDispatch, useSelector } from "react-redux"
import CollectionCard from "../components/CollectionCard"
import { clearCollection } from '../redux/features/collectionSlice'

const CollectionPage = () => {

  const collection = useSelector(state => state.collection.items)
  const dispatch = useDispatch()

  const clearAll = () => dispatch(clearCollection())

  return (
    <div className="min-h-screen px-10 py-8">

      {collection.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-2">
            <svg className="w-7 h-7 text-white/20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
          </div>
          <p className="text-lg font-medium text-white/30 tracking-wide">Your collection is empty</p>
          <p className="text-sm text-white/20">Save photos and videos to see them here</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-white tracking-tight">Your Collection</h2>
              <p className="text-sm text-white/40 mt-1">{collection.length} saved {collection.length === 1 ? 'item' : 'items'}</p>
            </div>
            <button
              onClick={clearAll}
              className="flex items-center gap-2 bg-white/5 hover:bg-red-500/15 border border-white/10 hover:border-red-500/30 text-white/50 hover:text-red-400 text-sm font-medium px-5 py-2.5 rounded-xl cursor-pointer transition-all duration-200 active:scale-95"
            >
              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
              Clear all
            </button>
          </div>

          <div className='flex flex-wrap gap-4'>
            {collection.map((item, idx) => (
              <CollectionCard key={idx} item={item} />
            ))}
          </div>
        </>
      )}

    </div>
  )
}

export default CollectionPage