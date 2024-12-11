'use client';
import React from "react";
import Link from "next/link";
import Image from "next/image";

//icons
import HomeLight from "@/Images/Icons/home-icon-light.svg";
import HomeDark from "@/Images/Icons/home-icon-dark.svg";
import FlixLight from "@/Images/Icons/flix-icon-light.svg";
import FlixDark from "@/Images/Icons/flix-icon-dark.svg";
// import BillLight from "@/Images/Icons/bill-icon-light.svg";
// import BillDark from "@/Images/Icons/bill-icon-dark.svg";
import BagLight from "@/Images/Icons/bag-icon-light.svg";
import BagDark from "@/Images/Icons/bag-icon-dark.svg";
import AccountLight from "@/Images/Icons/account-icon-light.svg";
import AccountDark from "@/Images/Icons/account-icon-dark.svg";
import SearchLight from "@/Images/Icons/search-menu-icon-light.svg";
import SearcgDark from "@/Images/Icons/search-menu-icon-dark.svg";
import { usePathname } from "next/navigation";



const StoreFooter = () => {

  let pathname=usePathname();

  console.log('pathname :',pathname);
  
  
  return (
    <footer className="sticky bg-store-footer-gradient h-[88px] z-[2]  bottom-0 flex justify-center items-center ">
      <div className="flex items-center max-w-64 w-full gap-6 py-3 px-5 small-border border-black rounded-full background-white background-custom-white ">
        <Link href="/">
        { pathname==='/store/home' || pathname==='/'?<Image src={HomeDark} width={24} height={24} alt="img" quality={100} />
          :<Image src={HomeLight} width={24} height={24} alt="img" quality={100} />}
        </Link>

        <Link href="/flix-blogs">
         {pathname.includes('/flix-blogs')? <Image src={FlixDark} width={24} height={24} alt="img" quality={100} />
          :<Image src={FlixLight} width={24} height={24} alt="img" quality={100} />}
        </Link>

        <Link href="#">
         {pathname.includes('/search')? <Image src={SearcgDark} width={24} height={24} alt="img" quality={100} />
          :<Image src={SearchLight} width={24} height={24} alt="img" quality={100} />}
        </Link>

        <Link href="/store/shopping-bag">
         {pathname.includes('/shopping-bag')?  <Image src={BagDark} width={24} height={24} alt="img" quality={100} />
          :<Image src={BagLight} width={24} height={24} alt="img" quality={100} />}
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
