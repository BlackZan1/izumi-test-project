export const SEARCH_MEDIA_QUERY = `
    query ($id: Int, $page: Int, $perPage: Int, $search: String, $isAdult: Boolean) {
        Page (page: $page, perPage: $perPage) {
            pageInfo {
                total
                currentPage
                lastPage
                hasNextPage
                perPage
            }
            media (id: $id, search: $search, isAdult: $isAdult) {
                id
                title {
                    romaji
                    english
                    native
                }
                genres
                type
                coverImage {
                    large
                    color
                }
                description(asHtml: false)
                characters(page: 1, perPage: 5) {
                    nodes {
                        name {
                            first
                            middle
                            last
                        }
                        image {
                            large
                        }
                    }
                }
            }
        }
    }
`