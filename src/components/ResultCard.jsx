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
        <div className='w-[18vw] min-w-[200px] relative h-80 bg-white rounded-2xl overflow-hidden border border-black/5 cursor-pointer group transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01] hover:shadow-2xl'>
            <a target='_blank' rel='noopener noreferrer' className='block h-full' href={item.url}>
                {item.type == 'photo' ? <img className='h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105' src={item.src} alt="" /> : ''}
                {item.type == 'video' ? <video className='h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105' autoPlay loop muted src={item.src}></video> : ''}
            </a>
            <div className='absolute inset-x-0 bottom-0 flex justify-between items-end gap-3 px-4 pt-12 pb-[18px] bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-auto'>
                <h2 className='text-[15px] font-medium text-white leading-snug capitalize tracking-wide max-h-14 overflow-hidden flex-1'>{item.title}</h2>
                <button
                    onClick={(e) => addToCollection(e, item)}
                    disabled={isSaved}
                    className={`flex-shrink-0 backdrop-blur-md border rounded-lg px-[14px] py-[7px] text-[13px] font-medium tracking-wide transition-all duration-150 active:scale-95 ${
                        isSaved
                            ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 cursor-default'
                            : 'bg-white/10 border-white/25 text-white cursor-pointer hover:bg-white/20 hover:border-white/40'
                    }`}
                >
                    {isSaved ? 'Saved ✓' : 'Save'}
                </button>
            </div>
        </div>
    )
}

export default ResultCard