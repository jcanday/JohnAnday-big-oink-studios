import Image from "next/image";
import Link from "next/link"
const Navbar = () => {
    return (
        <nav className="flex justify-between items-center px-40 py-3 border-b border-solid border-b-[#626262]">
            <Link href="/">  
                <a><Image width={265} height={34.37} alt="logo" src={'/logo.png'}/></a>
            </Link> 
            <Link href="/portfolio"><a className="text-sm font-semibold">PORTFOLIO</a></Link>
        </nav>
        
    );
}
 
export default Navbar;