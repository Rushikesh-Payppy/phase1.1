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
// import CheckIcon from '@/Images/Store/check-icon.svg';
// import ShppingBagMyFavouritesButtons from '@/Components/ShppingBagMyFavouritesButtons';
import { useEffect, useState } from 'react';
import GetCartInfoApi from '@/apis/store/GetCartInfoApi';
import GetAccessTokenAPI from '@/apis/auth/GetAccessToken';
import IntialLoadingAnimation from '@/Components/InitialPageLoadingAnimation';
import GetCartItemsApi from '@/apis/store/GetCartItemsApi';
// import UpdateProductQuantityApi from '@/apis/store/UpdateProductQuantityApi';
import RemoveProductFromCartApi from '@/apis/store/RemoveProductFromCartApi';
import { useRouter } from 'next/navigation';






const plus_jakarta_sans = Plus_Jakarta_Sans({
    subsets: ['latin'],
    display: 'swap'
})
function ShoppingBagSection() {

    let[accessToken,setAccessToken]=useState('');
    let[gettingAccessToken,setGettingAccessToken]=useState(true);

    let[cartid,setCartId]=useState('');

    let[showDetails,setShowDetails]=useState(false);


    let[cartItems,setCartItems]=useState([]);
    let[notEligibleForCheckout,setNotEligibleForCheckout]=useState(true);

    let router=useRouter();
     //to get a access token
     useEffect(()=>{
        getAccessToken();
    },[])

    useEffect(()=>{
        if(accessToken)
        {
            getCartInfo();
        }
    },[accessToken])

    useEffect(()=>{
        if(cartid)
        {
            getCartItems();
        }
    },[cartid])

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
 
     //get cart information from api
     function getCartInfo()
     {
         GetCartInfoApi(accessToken)
         .then((response)=>{
             console.log('response');
 
             if(response&&'cart_id' in response)
             {
                 setCartId(response.cart_id);
             }
         })
         .catch((error)=>{
             console.log(error);
         })
     }

     //get cart items
     function getCartItems()
     {
        GetCartItemsApi(cartid)
        .then((response)=>{
            // console.log(response);
            setCartItems(response.cart);
            console.log('response?.cart?.items?.length<1 :',response?.cart?.items?.length<1);
            
            setNotEligibleForCheckout(response?.cart?.items?.length<1);

        })
        .catch((error)=>{
            console.log(error);
        })
     }

     //to substract the quantity of product
    //  function handleSubstractCount(lineId,quantity)
    //  {
    //     if(quantity===1)
    //     {
    //         return;
    //     } 
    //     let obj={
    //         'quantity':quantity-1
    //     }
    //     UpdateProductQuantityApi(cartid,lineId,obj)
    //     .then((response)=>{
    //         console.log(response);
    //         setCartItems(response?.cart);
    //     })
    //     .catch((error)=>{

    //     })
    //  }

     //to add the quantity of product
    //  function handleAddCount(lineId,quantity)
    //  {
    //     let obj={
    //         'quantity':quantity+1
    //     }
    //     UpdateProductQuantityApi(cartid,lineId,obj)
    //     .then((response)=>{
    //         // console.log(response);
    //         setCartItems(response?.cart);
    //     })
    //     .catch((error)=>{

    //     })
    //  }

     //to remove product from cart
     function handleRemoveProduct(lineId)
     {
        RemoveProductFromCartApi(cartid,lineId)
        .then((response)=>{
            // console.log(response);
            // setCartItems(response?.cart);
            if(response&&'deleted' in response&&response.deleted===true)
            {
                getCartItems();
            }
        })
        .catch((error)=>{
            console.log(error);
        })
     }

     function handleSecureCheckout()
     {
        router.push('/store/checkout');
     }
    return (
        <>
          {  gettingAccessToken? <IntialLoadingAnimation/>
            :<section className={"flex justify-center min-h-screen w-full background-custom-grey50    " + plus_jakarta_sans.className}>
                <div className="page-center-parent-container  small-border custom-border-grey600 overflow-y-scroll overflow-scrollbar-hidden flex flex-col justify-between relative">
                <div>
                    
                    <StoreShopPepoinNavbar pepcoin={true} backclickurl='/store/home'/>

                    {/* shopping bag & my Favourites catagory buttons */}
                        <button className="all-caps-12-bold px-4 py-2.5 custom-text-grey800 small-border custom-border-grey800 text-center w-full ">Shopping Bag ({cartItems?.items?.length || 0})</button>


                    {/* shoppping bag product info  section */}
                    {cartItems?.items?.length>0&&cartItems.items.map((element,index)=>{
                        return <div  key={index} className="grid grid-cols-2 small-border-y custom-border-grey800 ">
                            <Image src={element.thumbnail} width={195} height={292} alt="img" quality={100} className=" w-full h-auto object-cover small-border-right custom-border-grey800" />

                            <div className="flex flex-col justify-between p-4 pr-3 ">

                                <div className="flex flex-col gap-4">
                                    <div className="flex justify-end w-full ">
                                        <Image src={CloseIcon} width={20} height={20} alt="img" quality={100} className="" onClick={()=>{handleRemoveProduct(element?.id)}} />
                                    </div>

                                    <div className="all-caps-10 custom-text-grey600">by {element?.product_collection}</div>

                                    <div className="all-caps-10-bold custom-text-grey900">{element?.product_title}</div>

                                    <div className="all-caps-12-bold custom-text-grey800">₹{element?.unit_price}</div>

                                </div>

                                {/* <div className="flex items-center gap-1">
                                    <Image src={Minus} width={20} height={20} alt="img" quality={100} className="cursor-pointer" onClick={()=>{handleSubstractCount(element?.id,element?.quantity)}}/>
                                    <div className="all-caps-12-bold custom-text-grey900">{element?.quantity}</div>
                                    <Image src={Plus} width={20} height={20} alt="img" quality={100} className="cursor-pointer" onClick={()=>{handleAddCount(element?.id,element?.quantity)}}/>
                                </div> */}

                                <div className="flex justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="custom-text-grey900 body-sm">{element?.title}</div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    })

                            }

                </div>    


                {/* checkout section  */}
                    <div className=" sticky bottom-0 z-[1] background-custom-white">
                        <div className="flex justify-end ">
                            <button className="py-[5px] px-2 flex items-center gap-1 small-border-x small-border-top custom-border-grey800">
                                <div className="all-caps-10 custom-text-grey900">Details</div>
                                <Image src={ChevronUp} width={16} height={16} alt="img" quality={100} className="" />
                            </button>
                        </div>
                        <div className="flex flex-col gap-4  small-border-top custom-border-grey800">
                            <div className="flex flex-col gap-2 py-4 px-6">
                                <div className="flex justify-between">
                                    <div className="all-caps-10 custom-text-grey900">Subtotal:</div>
                                    <div className="flex items-center ">
                                        <div className="all-caps-12-bold custom-text-grey800">₹{Math.round(cartItems?.subtotal)}</div>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="all-caps-10 custom-text-grey900">Shipping:</div>
                                    <div className="all-caps-10-bold custom-text-grey900">FREE</div>                                   
                                </div>
                            </div>


                            <div className="px-6">
                                <div className="custom-text-grey900 small-border custom-border-grey800 border-dashed  "></div>
                            </div>

                            <div className="flex justify-between  px-6">
                                <div className="all-caps-12 custom-text-grey900">Total</div>
                                <div className="flex flex-col items-end gap-1.5">
                                    <div className="flex items-center ">
                                        <div className="all-caps-12-bold custom-text-grey800">₹{cartItems?.total}</div>
                                       
                                    </div>   
                                    <div className="all-caps-10 custom-text-grey900">GST INCLUDED</div>
                                </div>                                   
                            </div>

                            <div className="flex flex-col">
                                <button className={`text-center all-caps-12-bold  custom-text-white px-5 py-4 ${notEligibleForCheckout?' background-custom-grey500 ':'  bg-black '}`} onClick={handleSecureCheckout} disabled={notEligibleForCheckout}>Secure Checkout</button>
                            </div>
                        </div>
                    </div>


                </div>
            </section>}
        </>
    )
}

export default ShoppingBagSection;

