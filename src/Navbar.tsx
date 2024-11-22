import { ReactNode } from 'react'
import Logo from './Logo'

const Navbar = ({ children }: { children: ReactNode }) => {

    return (
        <nav className="nav-bar">
            <Logo />
            {children}
        </nav>
    )
}

export default Navbar