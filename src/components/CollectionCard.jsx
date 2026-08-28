import { useDispatch } from 'react-redux';
import { removeCollection, removeToast } from '../redux/features/collectionSlice';

const CollectionCard = ({ item }) => {
    const dispatch = useDispatch()

    const removeFromCollection = (e, item) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(removeCollection(item.id))
        dispatch(removeToast())
    }

    return (
        <div className='relative w-full h-80 bg-slate-900/70 rounded-2xl overflow-hidden border border-white/10 group transition-all duration-300 hover:-translate-y-1.5 hover:border-red-500/40 hover:shadow-xl hover:shadow-red-500/10 flex flex-col justify-between'>
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
                    onClick={(e) => removeFromCollection(e, item)}
                    className='flex-shrink-0 bg-red-500/15 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/60 text-red-300 rounded-xl px-3.5 py-2 text-xs font-semibold tracking-wide cursor-pointer transition-all duration-200 active:scale-95 flex items-center gap-1.5 backdrop-blur-xl shadow-lg shadow-black/40'
                >
                    <svg className='w-3.5 h-3.5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    Remove
                </button>
            </div>
        </div>
    )
}

export default CollectionCard