import { useDispatch, useSelector } from 'react-redux'
import { addCollection, addedToast } from '../redux/features/collectionSlice'

const ResultCard = ({ item }) => {
    const dispatch = useDispatch()
    const collection = useSelector(state => state.collection.items)
    const isSaved = collection.some(collectionItem => collectionItem.id === item.id)

    const addToCollection = (e, item) => {
        e.preventDefault()
        e.stopPropagation()
        if (!isSaved) {
            dispatch(addCollection(item))
            dispatch(addedToast())
        }
    }

    return (
        <div className='relative w-full h-80 bg-slate-900/70 rounded-2xl overflow-hidden border border-white/10 group transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col justify-between'>
            {/* Media Content */}
            <a target='_blank' rel='noopener noreferrer' className='absolute inset-0 w-full h-full block' href={item.url}>
                {item.type === 'photo' && (
                    <img className='w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110' src={item.src} alt={item.title || 'Photo'} />
                )}
                {item.type === 'video' && (
                    <video className='w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110' autoPlay loop muted playsInline src={item.src}></video>
                )}
            </a>

            {/* Top Badges */}
            <div className='relative z-10 p-3.5 flex justify-between items-center pointer-events-none'>
                <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wider uppercase backdrop-blur-md border ${
                    item.type === 'photo'
                        ? 'bg-slate-950/60 border-white/15 text-indigo-300'
                        : 'bg-slate-950/60 border-white/15 text-pink-300'
                }`}>
                    {item.type === 'photo' ? '📷 Photo' : '🎥 Video'}
                </span>

                <a
                    href={item.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='pointer-events-auto w-8 h-8 rounded-lg bg-slate-950/60 backdrop-blur-md border border-white/15 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white/20'
                    title='Open Original'
                >
                    <svg className='w-4 h-4' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                </a>
            </div>

            {/* Bottom Gradient Footer */}
            <div className='relative z-10 p-4 pt-12 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent flex justify-between items-end gap-3'>
                <h2 className='text-sm font-semibold text-white/90 leading-snug capitalize line-clamp-2 flex-1 tracking-wide group-hover:text-white transition-colors'>
                    {item.title || 'Untitled Media'}
                </h2>
                
                <button
                    onClick={(e) => addToCollection(e, item)}
                    disabled={isSaved}
                    className={`flex-shrink-0 backdrop-blur-xl border rounded-xl px-3.5 py-2 text-xs font-semibold tracking-wide transition-all duration-200 active:scale-95 flex items-center gap-1.5 ${
                        isSaved
                            ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 cursor-default shadow-sm'
                            : 'bg-white/10 hover:bg-indigo-600 border-white/20 hover:border-indigo-500 text-white cursor-pointer shadow-lg shadow-black/40'
                    }`}
                >
                    {isSaved ? (
                        <>
                            <svg className='w-3.5 h-3.5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            Saved
                        </>
                    ) : (
                        <>
                            <svg className='w-3.5 h-3.5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Save
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

export default ResultCard