import { useState } from 'react'

// components
import { MainList } from './MainList'
import { MainFavourites } from './MainFavourites'

// styles
import './Main.scss'

export const MainPage = () => {
    const [favourites, setFavourites] = useState([])

    const addFavourite = (media) => {
        if(favourites.findIndex((i) => i.id === media.id) >= 0) {
            const filteredFavs = [ ...favourites ].filter((i) => i.id !== media.id)

            setFavourites(filteredFavs)
        }
        else setFavourites((prev) => ([ ...prev, media ]))
    }

    return (
        <div className='app-main'>
            <div className='main-container'>
                <MainList 
                    favourites={favourites}
                    addFavourite={addFavourite} 
                />

                <MainFavourites 
                    favourites={favourites}
                    addFavourite={addFavourite} 
                />
            </div>
        </div>
    )
}