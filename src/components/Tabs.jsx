import { useDispatch, useSelector } from 'react-redux'
import { setActiveTabs } from '../redux/features/searchSlice'

const Tabs = () => {
    const dispatch = useDispatch()
    const activeTab = useSelector((state) => state.search.activeTab)

    const tabs = [
        { id: 'photos', label: 'Photos', icon: '📷' },
        { id: 'videos', label: 'Videos', icon: '🎥' }
    ]

    return (
        <div className='flex justify-center px-6 py-4'>
            <div className='flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-xl border border-white/10 p-1.5 rounded-2xl shadow-xl'>
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id
                    return (
                        <button
                            key={tab.id}
                            onClick={() => dispatch(setActiveTabs(tab.id))}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold tracking-wide cursor-pointer transition-all duration-200 active:scale-95 ${
                                isActive
                                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25'
                                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                            }`}
                        >
                            <span>{tab.icon}</span>
                            <span>{tab.label}</span>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default Tabs