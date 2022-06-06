import { Tag } from 'antd'

// components
import { HeartIcon } from 'components/HeartIcon'
import { CloseIcon } from 'components/CloseIcon'

// styles
import './MediaItem.scss'

const colors = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple'
]

export const MediaItem = ({
    title,
    native,
    image,
    description,
    genres,
    isFavourite = false,
    addFavourite,
    hasCloseIcon = false
}) => {
    return (
        <div className='media-item'>
            <div className='media-item__cover'>
                <img src={image} alt='media_item_cover' />
            </div>

            <div className='media-item__info'>
                <p>
                    { title }

                    {
                        title ? (
                            title !== native && (
                                ` | ${native}`
                            )
                        )
                        : (
                            native || ''
                        )
                    }
                </p>

                {
                    !!description && (
                        <div 
                            className='media-item__info__desc' 
                            dangerouslySetInnerHTML={{ 
                                __html: description.length >= 150 ? `${description.slice(0, 147)}...` : description
                            }} 
                        />
                    )
                }

                <div className='media-item__info__tags'>
                    {
                        genres.map((genre, index) => (
                            <Tag 
                                key={index}
                                color={colors[index]} 
                                style={{ marginBottom: 5 }}
                            >
                                { genre }
                            </Tag>
                        ))
                    }
                </div>
            </div>

            <div 
                className='media-item__fav-icon' 
                onClick={addFavourite}
            >
                {
                    hasCloseIcon ? (
                        <CloseIcon />
                    )
                    : (
                        <HeartIcon fill={isFavourite} />
                    )
                }
            </div>
        </div>
    )   
}