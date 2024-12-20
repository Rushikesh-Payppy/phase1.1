'use client';
//header images
import CloseIcon from '@/Images/Store/close-icon.svg';
import Pepcoin from '@/Images/Homepage/pepcoin-icon.svg';
import Share from '@/Images/Store/share-icon.svg';
import Store from '@/Images/Homepage/store-icon.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function StoreShopPepoinNavbar({pepcoin=false,share=false,store=false,backclickurl='/store/home',accessToken=''}) {

    let router=useRouter();

    function handlebackClick()
    {
        router.push(backclickurl);
    }
    return (
        <>
            <div className="flex items-center justify-between py-3 px-4 small-border-bottom border-black sticky top-0 left-0 background-custom-grey50">
                <button onClick={handlebackClick}>     
                    <Image src={CloseIcon} width={20} height={20} alt="img" quality={100} className="" />
                </button>
                <div className="flex items-center gap-4">
                   {share&& <Image src={Share} width={20} height={20} alt="img" quality={100} className="" />}
                   {store&&accessToken&& 
                   <Link href={'/store/shopping-bag'}>
                       <Image src={Store} width={20} height={20} alt="img" quality={100} className="" />
                   </Link>}
                </div>
            </div>

        </>
    )
}

export default StoreShopPepoinNavbar;