import Footer from "../components/Footer"
import Header from "../components/Header"
import Navbar from "../components/Navbar"


function Layout({ children }) {
    return (
        <div style={{ position: 'relative' }}>
            <Header />
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}

export default Layout
