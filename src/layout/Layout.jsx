import { isMobile } from 'react-device-detect'

import Footer from "../components/Footer"
import Header from "../components/Header"
import MobileHeader from '../components/MobileHeader'
import Navbar from "../components/Navbar"


function Layout({ children }) {
    return (
        <div style={{ position: 'relative' }}>
            {
                isMobile ? <MobileHeader /> : <Header />
            }
            {
                !isMobile && (
                    <Navbar />
                )
            }
            {children}
            <Footer />
        </div>
    )
}

export default Layout
