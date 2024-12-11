
import { Plus_Jakarta_Sans } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const plus_jakarta_sans=Plus_Jakarta_Sans({
    subsets:['latin'],
    display:'swap'
})
    

function StoreNavbar()
{
    return(
        <>
        <nav className={"flex items-center absolute top-7 left-6 z-[1] " +plus_jakarta_sans.className}>
            <div className="flex items-cnter gap-4">
                <h3 className="heading-h3 custom-text-white">Store</h3>
                <div className="h-7 border w-[1px]"></div>
            </div>
            <div className="flex items-center gap-4 overflow-x-scroll">
                <Link href='/' className='flex-shrink-0'><div className="all-caps-10-bold custom-text-white pl-4">CyberPUNK</div></Link>
                <Link href='/' className='flex-shrink-0'><div className="all-caps-10 custom-text-white ">MAGMA</div></Link>
                <Link href='/' className='flex-shrink-0'><div className="all-caps-10 custom-text-white ">EthiKz</div></Link>


            </div>
        </nav>
        </>
    )
}

export default StoreNavbar;