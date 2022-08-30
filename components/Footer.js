import Image from "next/image";

const Footer = () => {
    return ( 
        <footer className="px-40 py-11 bg-[#111111] flex justify-between">
            <div>
                <Image width={265} height={34} src={'/logo.png'}/>
                <p className="text-xs text-[#b2b2b2] font-semibold text-right">WORK HARD, PLAY HARD, REST HARD</p>
            </div>
            <div>
                <p className="text-sm text-[#7c7c7c] font-normal pt-10">© 2021 Noble Ocean Media</p>
            </div>
        </footer>
     );
}
 
export default Footer;