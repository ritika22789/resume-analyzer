import { Link } from "react-router";

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full bg-[#E6E0FF] shadow-md flex justify-between items-center px-6 py-4 h-20 z-50">
            <Link to="/">
                <img 
                    src="/images/resume1.png"  
                    alt="App Logo" 
                    className="h-16 w-auto"
                />
            </Link>
            <Link 
                to="/upload" 
                className="w-fit px-12 py-4 bg-[#FF6767] text-[#FFFFFF] font-semibold rounded-2xl hover:bg-[#FF8282] shadow-md hover:shadow-lg transition"
            >
                Upload Resume
            </Link>
        </nav>
    )
}

export default Navbar;
