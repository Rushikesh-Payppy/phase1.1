import StoreProductsListApi from '@/apis/store/StoreProductsListApi';
import Homepage from '@/Images/Homepage/homepage-img.jpg';
import Cloth from '@/Images/Store/cloth.png';
import Wishlist from '@/Images/Store/wishlist-toggle.svg';

import Image from 'next/image';

function ClothsHorizontalCarousel({containerWidth,borderClass=' small-border-right ',title,img,addToCartButton=false})
{
    let baseUrl='http://148.135.138.27:9000/';
   function getImageSrc(imgUrl)
   {
    let urlNeedToBeReplaced='http://localhost:9000/';
    let finalUrl=imgUrl?.replace(urlNeedToBeReplaced,baseUrl);
    return finalUrl;
   }
    return(
        <>
                <div className={` inline-flex flex-col  custom-border-grey800 flex-shrink-0 scroll-smooth relative ${containerWidth} ${borderClass}`}>
                    <Image src={Wishlist} width={16} height={16} alt="img" quality={100} className='absolute top-3 right-3 '  />

                    <div className="flex justify-center items-center px-4 py-6  small-border-bottom custom-border-grey800  bg-[#F1F2F7]">
                        <Image src={img?getImageSrc(img.url):Cloth } width={147} height={219} alt="img" quality={100} className='w-auto h-auto object-contain' />
                    </div>
                    <div className="p-2.5 pb-5 background-custom-white flex flex-col gap-2  justify-center">
                        <div className="all-caps-10 custom-text-grey900 max-w-[160px] w-full text-ellipsis whitespace-nowrap overflow-hidden ">{title || "T-Shirt"}</div>
                        <div className="all-caps-10 custom-text-grey900">₹1899</div>
                    </div>
                   {addToCartButton&& <button className="small-border-y custom-border-grey800 all-caps-10-bold background-custom-white py-2.5 px-3 text-center">Add to cart</button>}
                </div>

        </>
    )
}

export default ClothsHorizontalCarousel;