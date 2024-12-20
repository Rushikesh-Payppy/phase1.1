'use client';
import StoreShopPepoinNavbar from '@/Components/StoreShopPepoinNavbar';
import { Plus_Jakarta_Sans } from 'next/font/google';

import Image from 'next/image';
//images
// import Whishlist from '@/Images/Store/wishlist-toggle-transparent.svg';
// import SingleProduct from '@/Images/Store/single-product.jpg';
import CloseIcon from '@/Images/Store/close-icon.svg';
// import Pepcoin from '@/Images/Homepage/pepcoin-icon.svg';
// import Plus from '@/Images/Store/plus.svg';
// import Minus from '@/Images/Store/minus.svg';
import ChevronUp from '@/Images/Store/chevron-up.svg';
import OrderSuccess from '@/Images/Store/order-success.svg';
// import ShppingBagMyFavouritesButtons from '@/Components/ShppingBagMyFavouritesButtons';
import { useEffect, useState } from 'react';
import GetCartInfoApi from '@/apis/store/GetCartInfoApi';
import GetAccessTokenAPI from '@/apis/auth/GetAccessToken';
import IntialLoadingAnimation from '@/Components/InitialPageLoadingAnimation';
import GetCartItemsApi from '@/apis/store/GetCartItemsApi';
// import UpdateProductQuantityApi from '@/apis/store/UpdateProductQuantityApi';
import RemoveProductFromCartApi from '@/apis/store/RemoveProductFromCartApi';
import { useRouter } from 'next/navigation';
import GetOrdersApi from '@/apis/store/GetOrdersApi';






const plus_jakarta_sans = Plus_Jakarta_Sans({
    subsets: ['latin'],
    display: 'swap'
})
function OrderCompleteSection() {

    let[accessToken,setAccessToken]=useState('');
    let[gettingAccessToken,setGettingAccessToken]=useState(true);


    let router=useRouter();
     //to get a access token
     useEffect(()=>{
        getAccessToken();
    },[])

   

     //getting access token
     function getAccessToken()
     {
         GetAccessTokenAPI()
         .then((response)=>{
             console.log(response);
             if(response&&'message' in response&&response.message==='Refresh token is missing!')
             {
                 window.location.href='/auth/user-auth';
             }
             if(response&&'access_token' in response)
             {
                 setAccessToken(response.access_token);
             }
             
         })
         .catch(()=>{
 
         })
         .finally()
         {
             setGettingAccessToken(false);
         }
     }
 
    


    function handleRouterClick()
    {
        // router.push('/my-account/my-orders');
    }
    
     function handlebackClick()
     {
         router.push('/');
     }
    return (
        <>
          {  gettingAccessToken || !accessToken? <IntialLoadingAnimation/>
            :<section className={"flex justify-center min-h-screen w-full background-custom-grey50    " + plus_jakarta_sans.className}>
                <div className="page-center-parent-container  small-border custom-border-grey600 overflow-y-scroll overflow-scrollbar-hidden  relative">

                    
                    <button onClick={handlebackClick} className='py-3 px-4'>     
                        <Image src={CloseIcon} width={20} height={20} alt="img" quality={100} className="" />
                    </button>
                <div className="flex flex-col justify-center items-center h-full ">
                    <div className="flex flex-col gap-5 items-center max-w-60 w-full">
                        <div className="flex flex-col gap-5 items-center">
                            <Image src={OrderSuccess} width={88} height={80} alt="img" quality={100} className="" />
                            <div className="flex flex-col gap-2 items-center">
                                <h4 className="heading-h4 custom-text-grey900 text-center   ">Your order has been placed</h4>
                                <div className="custom-text-grey900 text-center  body-sm">We&apos;ve received your order, and your parcel will soon be on it’s way!</div>
                            </div>
                        </div>
                        <button className="custom-text-grey800 body-sm-bold underline" onClick={handleRouterClick}>Order Details</button>
                    </div>
                </div>


                </div>
            </section>}
        </>
    )
}

export default OrderCompleteSection;

