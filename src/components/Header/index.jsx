// assets
import LogoSVG from 'assets/logo.svg'
import { useNavigate } from 'react-router-dom'

// styles
import './Header.scss'

export const Header = () => {
    const navigate = useNavigate()

    return (
        <header>
            <div className='app-logo' onClick={() => navigate('/')}>
                <img src={LogoSVG} alt='logo' />    
            </div>
        </header>
    )
}