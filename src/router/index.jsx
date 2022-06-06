import { Route, Routes } from 'react-router-dom'

// pages
import { MainPage } from 'pages/Main'

export const AppRoutes = () => (
    <Routes>
        <Route path='/' element={<MainPage />} />
    </Routes>
)