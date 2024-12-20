'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

//icons
import HomeLight from "@/Images/Icons/home-icon-light.svg";
import HomeDark from "@/Images/Icons/home-icon-dark.svg";
import FlixLight from "@/Images/Icons/flix-icon-light.svg";
import FlixDark from "@/Images/Icons/flix-icon-dark.svg";
import BillLight from "@/Images/Icons/bill-icon-light.svg";
import BillDark from "@/Images/Icons/bill-icon-dark.svg";
import BagLight from "@/Images/Icons/bag-icon-light.svg";
import BagDark from "@/Images/Icons/bag-icon-dark.svg";
import AccountLight from "@/Images/Icons/account-icon-light.svg";
import AccountDark from "@/Images/Icons/account-icon-dark.svg";
import SearchLight from "@/Images/Icons/search-menu-icon-light.svg";
import SearcgDark from "@/Images/Icons/search-menu-icon-dark.svg";
import { usePathname } from "next/navigation";
import GetAccessTokenAPI from "@/apis/auth/GetAccessToken";
import GetCartInfoApi from "@/apis/store/GetCartInfoApi";
import GetCartItemsApi from "@/apis/store/GetCartItemsApi";



const StoreFooter = () => {

  let[accessToken,setAccessToken]=useState('');

  let[cartid,setCartId]=useState('');

  let[cartItems,setCartItems]=useState([]);


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
          //  console.log(response);
           if(response&&'access_token' in response)
           {
               setAccessToken(response.access_token);
           }
           
       })
       .catch(()=>{

       })

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

      })
      .catch((error)=>{
          console.log(error);
      })
   }
  let pathname=usePathname();

  console.log('pathname :',pathname); 
  
  
  return (
    <footer className="sticky bg-store-footer-gradient h-[88px] z-[2]  bottom-0 flex justify-center items-center ">
      <div className="flex items-center max-w-64 w-full gap-6 py-3 px-5 small-border border-black rounded-full  background-custom-grey50 ">
        <Link href="/">
        { pathname==='/store/home' || pathname==='/'?<Image src={HomeDark} width={24} height={24} alt="img" quality={100} />
          :<Image src={HomeLight} width={24} height={24} alt="img" quality={100} />}
        </Link>
        

        <Link href="/flix-blogs">
         {pathname.includes('/flix-blogs')? <Image src={FlixDark} width={24} height={24} alt="img" quality={100} />
          :<Image src={FlixLight} width={24} height={24} alt="img" quality={100} />}
        </Link>

        <Link href={pathname+`/?billpay=true`}>
         {pathname.includes('/?billpay=true')? <Image src={BillDark } width={24} height={24} alt="img" quality={100} />
          :<Image src={BillLight} width={24} height={24} alt="img" quality={100} />}
        </Link>

        {/* <Link href="#">
         {pathname.includes('/search')? <Image src={SearcgDark} width={24} height={24} alt="img" quality={100} />
          :<Image src={SearchLight} width={24} height={24} alt="img" quality={100} />}
        </Link> */}

        <Link href="/store/shopping-bag" className="relative">
         {pathname.includes('/shopping-bag')?  <Image src={BagDark} width={24} height={24} alt="img" quality={100} />
          :<Image src={BagLight} width={24} height={24} alt="img" quality={100} />}
          {cartItems?.items?.length > 0&& <div className="w-2 h-2 small-border border-black background-custom-green rounded-full absolute top-0.5 right-0"></div>}
        </Link>

        <Link href="/my-account">
         {pathname.includes('/my-account')? <Image src={AccountDark} width={24} height={24} alt="img" quality={100} />
          :<Image src={AccountLight} width={24} height={24} alt="img" quality={100} />}
        </Link>
      </div>

    </footer>
  );
};

export default StoreFooter;
