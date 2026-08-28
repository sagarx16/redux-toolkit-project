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
                if (activeTab === 'photos') {
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
                if (activeTab === 'videos') {
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
        <div className='flex flex-col items-center justify-center w-full py-20 px-6 text-center'>
            <div className='w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 text-2xl text-red-400'>
                ⚠️
            </div>
            <h3 className='text-lg font-semibold text-white mb-1'>Unable to load media</h3>
            <p className='text-sm text-slate-400 max-w-sm mb-4'>{error || 'Something went wrong. Please check your internet or try again.'}</p>
        </div>
    )

    if (loading) return (
        <div className='w-full px-6 md:px-12 py-8'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
                {Array.from({ length: 10 }).map((_, idx) => (
                    <div key={idx} className='w-full h-80 bg-slate-900/80 rounded-2xl border border-white/10 overflow-hidden shimmer-effect flex flex-col justify-between p-4'>
                        <div className='w-20 h-6 bg-slate-800 rounded-lg'></div>
                        <div className='space-y-2'>
                            <div className='w-3/4 h-4 bg-slate-800 rounded-md'></div>
                            <div className='w-1/2 h-4 bg-slate-800 rounded-md'></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

    if (!query) return null

    if (results.length === 0) return (
        <div className='flex flex-col items-center justify-center w-full py-20 px-6 text-center'>
            <div className='w-16 h-16 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center mb-4 text-slate-400'>
                <svg className='w-8 h-8' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z" />
                </svg>
            </div>
            <h3 className='text-lg font-semibold text-white mb-1'>No results found</h3>
            <p className='text-sm text-slate-400'>No {activeTab} matched your search for "{query}". Try a different keyword.</p>
        </div>
    )

    return (
        <div className='w-full px-6 md:px-12 py-8'>
            <div className='flex items-center justify-between mb-6 pb-4 border-b border-white/10'>
                <div className='flex items-center gap-2'>
                    <span className='text-sm text-slate-400 font-medium'>Showing</span>
                    <span className='px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'>
                        {results.length} results
                    </span>
                    <span className='text-sm text-slate-400 font-medium'>for</span>
                    <span className='text-sm font-semibold text-white'>"{query}"</span>
                </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
                {results.map((item) => (
                    <ResultCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    )
}

export default ResultGrid