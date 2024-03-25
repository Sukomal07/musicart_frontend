import Footer from "../components/Footer"
import Header from "../components/Header"
import Navbar from "../components/Navbar"


function Layout({ children }) {
    return (
        <>
            <Header />
            <Navbar />
            {children}
            <Footer />
        </>
    )
}

export default Layout
