import { useEffect, useState, useTransition } from 'react'
import { useQuery } from 'graphql-hooks'
import { Button, Empty, Input, message } from 'antd'

// components
import { MediaItem } from 'components/MediaItem'
import { MediaItemSkeleton } from 'components/MediaItemSkeleton'
import { MoreIcon } from 'components/MoreIcon'

// queries
import { SEARCH_MEDIA_QUERY } from 'queries/media'

const emptyData = { 
    Page: { 
        media: [],
        pageInfo: {
            hasNextPage: false
        }
    } 
}

export const MainList = ({
    favourites,
    addFavourite
}) => {
    const [isPending, startTransition] = useTransition({
        timeoutMs: 1000
    })
    const [search, setSearch] = useState('')
    const [isMore, setMore] = useState(false)
    const [page, setPage] = useState(1)
    const [items, setItems] = useState([])
    const { 
        loading, 
        error, 
        refetch,
        data = emptyData
    } = useQuery(
        SEARCH_MEDIA_QUERY, 
        { 
            variables: {
                search: '',
                page: 1,
                perPage: 3,
                isAdult: false // Было очень интересно испробовать!
            } 
        }
    )

    useEffect(() => {
        if(!!error) {
            message.error('Something wrong with server, please try again later!')
        }
    }, [error])

    const searchHandle = (value) => {
        if(isPending) return

        startTransition(async () => {
            const res = await refetch({
                variables: {
                    search: value,
                    page: 1,
                    perPage: 3,
                    isAdult: false
                }
            })

            const { 
                Page: { 
                    media: newMedia 
                }
            } = res.data

            setItems(newMedia)
        })
    }

    const changeHandle = (ev) => {
        const { value } = ev.currentTarget
        
        searchHandle(value)
        setSearch(value)
    }

    const moreHandle = async () => {
        setMore(true)

        let newPage = page + 1

        const res = await refetch({
            variables: {
                search,
                page: newPage,
                perPage: 3,
                isAdult: false
            }
        })

        const { 
            Page: { 
                media: newMedia 
            } 
        } = res.data

        setItems((prev) => ([ ...prev, ...newMedia ]))
        setPage(newPage)

        setMore(false)
    }

    const { 
        Page: { 
            pageInfo: { hasNextPage } 
        } 
    } = data

    return (
        <div>
            <p className='app-main__title'>
                Список аниме
            </p>

            <Input 
                onChange={changeHandle} 
                allowClear
                style={{ height: 45, borderRadius: 10 }}
            />

            {
                !!search && items.length > 0 ? (
                    <>
                        <div className='app-main__grid'>
                            {
                                !isMore && loading ? (
                                    <>
                                        <MediaItemSkeleton />

                                        <MediaItemSkeleton />

                                        <MediaItemSkeleton />
                                    </>
                                )
                                : (
                                    <>
                                        {
                                            items.map((item) => (
                                                <MediaItem 
                                                    key={item.id}
                                                    title={item.title.english}
                                                    native={item.title.native}
                                                    image={item.coverImage.large}
                                                    description={item.description}
                                                    genres={item.genres}
                                                    isFavourite={favourites.find((i) => i.id === item.id)}
                                                    addFavourite={() => addFavourite(item)}
                                                />
                                            ))
                                        }

                                        {
                                            isMore && (
                                                <>
                                                    <MediaItemSkeleton />

                                                    <MediaItemSkeleton />

                                                    <MediaItemSkeleton />
                                                </>
                                            )
                                        }
                                    </>
                                )
                            }
                        </div>

                        <div className='flex items-center j-content-between'>
                            <Button 
                                type='primary' 
                                size='large'
                                style={{ borderRadius: 7, margin: '0 auto 40px' }}
                                onClick={moreHandle}
                                disabled={!hasNextPage}
                            >
                                <div className='flex items-center j-content-between'>
                                    <span style={{ marginRight: 10 }}>
                                        Загрузить ещё 
                                    </span>

                                    <MoreIcon />        
                                </div>
                            </Button>
                        </div>
                    </>
                )
                : (
                    <div className='app-main__empty'>
                        <Empty description={'Нету данных'} />
                    </div>
                )
            }
        </div>
    )
}