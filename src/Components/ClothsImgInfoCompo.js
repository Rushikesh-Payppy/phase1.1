'use client';
import StoreProductsListApi from '@/apis/store/StoreProductsListApi';
import Homepage from '@/Images/Homepage/homepage-img.jpg';
import Cloth from '@/Images/Store/cloth.png';
import Wishlist from '@/Images/Store/wishlist-toggle.svg';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

function ClothsImgInfoCompo({containerWidth,borderClass=' small-border-right ',data,addToCartButton=false})
{
  
    let router=useRouter();
    // function getValidImgUrl(imgsrc)
    // {
    //     let replacedUrl=imgsrc;
    //     if(imgsrc.includes('http://localhost:9000'))
    //     {
    //         replacedUrl=imgsrc.replace('http://localhost:9000','https://medusa.payppy.app');
    //     }
    //     return replacedUrl;
    // }


    function handleProductClick()
    {
        if(typeof window !== 'undefined'){
            window.location.href='/store/product?product='+data.id;         //in single product page it is not refreshing page so with this href the page gets refreshed
        } 
        // router.push('/store/product?product='+data.id);
    }
    return(
        <>
                <div className={` flex flex-col  custom-border-grey800 flex-shrink-0 self-stretch scroll-smooth relative cursor-pointer ${containerWidth} ${borderClass}`} onClick={handleProductClick}>
                    <Image src={Wishlist} width={16} height={16} alt="img" quality={100} className='absolute top-3 right-3 '  />

                    <div className=" small-border-bottom custom-border-grey800  bg-[#F1F2F7] mix-blend-darken ">
                        <Image src={data?.thumbnail} width={147} height={219} alt="img" quality={100} className='w-full h-auto object-contain' />
                    </div>
                    <div className="p-2.5 pb-5 background-custom-white flex flex-col gap-2  justify-center">
                        <div className="all-caps-10 custom-text-grey900 max-w-[160px] w-full text-ellipsis whitespace-nowrap overflow-hidden ">{data.title}</div>
                        <div className="all-caps-10 custom-text-grey900">₹1899</div>
                    </div>
                   {addToCartButton&& <button className="small-border-y custom-border-grey800 all-caps-10-bold background-custom-white py-2.5 px-3 text-center">Add to cart</button>}
                </div>

        </>
    )
}

export default ClothsImgInfoCompo;