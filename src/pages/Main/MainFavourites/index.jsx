import { MediaItem } from 'components/MediaItem'

export const MainFavourites = ({
    favourites,
    addFavourite
}) => {
    if(favourites.length <= 0) return null

    return (
        <div>
            <p className='app-main__title'>
                Любимое аниме
            </p>

            <div className='app-main__grid'>
                {
                    favourites.map((item) => (
                        <MediaItem
                            key={item.id}
                            title={item.title.english}
                            native={item.title.native}
                            image={item.coverImage.large}
                            description={item.description}
                            genres={item.genres}
                            isFavourite={favourites.find((i) => i.id === item.id)}
                            addFavourite={() => addFavourite(item)}
                            hasCloseIcon
                        />
                    ))
                }
            </div>
        </div>
    )
}