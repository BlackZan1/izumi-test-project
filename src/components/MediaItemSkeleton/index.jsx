import { Skeleton } from 'antd'

// styles
import './MediaItemSkeleton.scss'

export const MediaItemSkeleton = () => (
    <div className='media-item is-skeleton'>
        <div className='media-item__cover skeleton-full-width'>
            <Skeleton.Input 
                active
                style={{ width: '100%', height: 180 }}
            />
        </div>

        <div className='media-item__info'>
            <div 
                className='skeleton-full-width' 
                style={{ marginBottom: '1em' }}
            >
                <Skeleton.Input 
                    active
                    style={{ width: '100%', height: 25, borderRadius: 6 }}
                />
            </div>

            <div className='media-item__skeleton-flex'>
                <Skeleton.Input 
                    active
                    style={{ width: 12, height: 16, borderRadius: 6 }}
                /> 

                <Skeleton.Input 
                    active
                    style={{ width: 12, height: 16, borderRadius: 6 }}
                /> 

                <Skeleton.Input 
                    active
                    style={{ width: 32, height: 16, borderRadius: 6 }}
                /> 
            </div>
        </div>
    </div>
)