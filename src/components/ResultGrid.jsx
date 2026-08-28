import { useDispatch, useSelector } from 'react-redux'
import { fetchPhotos, fetchVideos } from '../api/mediaApi'
import { setLoading, setError, setResults } from '../redux/features/searchSlice'
import { useEffect } from 'react'
import ResultCard from './ResultCard'

const ResultGrid = () => {

    const dispatch = useDispatch()
    const { query, activeTab, results, loading, error } = useSelector((store) => store.search)

    useEffect(function () {
        if (!query) return
        const getData = async () => {
            try {
                dispatch(setLoading())
                let data = []
                if (activeTab == 'photos') {
                    let response = await fetchPhotos(query)
                    data = (response.results || []).map((item) => ({
                        id: item.id,
                        type: 'photo',
                        title: item.alt_description || item.description || 'Photo',
                        thumbnail: item.urls?.small || item.urls?.regular,
                        src: item.urls?.full || item.urls?.regular,
                        url: item.links?.html
                    }))
                }
                if (activeTab == 'videos') {
                    let response = await fetchVideos(query)
                    data = (response.videos || []).map((item) => ({
                        id: item.id,
                        type: 'video',
                        title: item.user?.name || 'Video',
                        thumbnail: item.image,
                        src: item.video_files?.[0]?.link || '',
                        url: item.url
                    }))
                }
                dispatch(setResults(data))
            } catch (err) {
                dispatch(setError(err.message))
            }
        }
        getData()
    }, [query, activeTab, dispatch])

    if (error) return (
        <div className='flex flex-col items-center justify-center w-full py-24 gap-3'>
            <span className='text-4xl'>⚠️</span>
            <p className='text-base font-medium text-white/60'>Something went wrong. Try again.</p>
        </div>
    )

    if (loading) return (
        <div className='flex items-center justify-center w-full py-24'>
            <div className='flex gap-[6px] items-center'>
                <span className='w-2 h-2 rounded-full bg-white/40 animate-bounce [animation-delay:0ms]'></span>
                <span className='w-2 h-2 rounded-full bg-white/40 animate-bounce [animation-delay:150ms]'></span>
                <span className='w-2 h-2 rounded-full bg-white/40 animate-bounce [animation-delay:300ms]'></span>
            </div>
        </div>
    )

    if (!query) return (
        <div className='flex flex-col items-center justify-center w-full py-24 gap-3'>
            <p className='text-base font-medium text-white/40 tracking-wide'>Search for photos or videos above</p>
        </div>
    )

    if (results.length === 0) return (
        <div className='flex flex-col items-center justify-center w-full py-24 gap-3'>
            <p className='text-base font-medium text-white/40 tracking-wide'>No results found for "{query}"</p>
        </div>
    )

    return (
        <div className='w-full px-10 py-6'>
            <p className='text-sm text-white/40 font-medium mb-6 tracking-wide'>{results.length} results for "<span className='text-white/70'>{query}</span>"</p>
            <div className='flex flex-wrap gap-4'>
                {results.map((item, idx) => (
                    <ResultCard key={idx} item={item} />
                ))}
            </div>
        </div>
    )
}

export default ResultGrid