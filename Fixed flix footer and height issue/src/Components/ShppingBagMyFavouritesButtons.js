'use client';
import { Plus_Jakarta_Sans } from 'next/font/google';

import Image from 'next/image';
//images
import Whishlist from '@/Images/Store/wishlist-toggle-transparent.svg';






const plus_jakarta_sans = Plus_Jakarta_Sans({
    subsets: ['latin'],
    display: 'swap'
})
function ShppingBagMyFavouritesButtons() {



    return (
        <>
            {/* shopping bag & my Favourites catagory buttons */}
            <div className="grid grid-cols-2 small-border-top custom-border-grey800 ">
                <button className="all-caps-12-bold px-4 py-2.5 custom-text-grey800 small-border-right custom-border-grey800 text-center w-full ">Shopping Bag (1)</button>
                <button className="all-caps-12 px-4 py-2.5 custom-text-grey800 text-center w-full   flex items-center gap-1 justify-center">
                    <span>My Favourites</span>
                    <Image src={Whishlist} width={12} height={12} alt="img" quality={100} className="" />
                </button>
            </div>
        </>
    )
}

export default ShppingBagMyFavouritesButtons;

