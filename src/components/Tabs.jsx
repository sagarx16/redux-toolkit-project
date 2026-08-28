import { useDispatch, useSelector } from 'react-redux'
import { setActiveTabs } from '../redux/features/searchSlice'

const Tabs = () => {
    const tabs = ['photos', 'videos']

    const dispatch = useDispatch()

    const activeTab = useSelector((state) => state.search.activeTab)

    return (
        <div className='flex px-10 pb-2'>
            <div className='flex items-center gap-1 bg-white/10 backdrop-blur-md border border-white/15 p-1 rounded-xl'>
                {tabs.map((elem, idx) => (
                    <button
                        key={idx}
                        onClick={() => dispatch(setActiveTabs(elem))}
                        className={`px-6 py-2 rounded-lg text-sm font-medium tracking-wide capitalize cursor-pointer transition-all duration-200 active:scale-95
                            ${activeTab === elem
                                ? 'bg-white text-(--c1) shadow-sm'
                                : 'text-white/50 hover:text-white/80 hover:bg-white/10'
                            }`}
                    >
                        {elem}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Tabs