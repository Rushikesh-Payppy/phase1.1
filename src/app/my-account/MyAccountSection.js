'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";


//components
import AccountButton from "@/Components/AccountButton";
import AccountCopyrightSection from "@/Components/AccountCopyrightSection";
import StoreFooter from '@/Components/StoreFooter';

//icons
import OrderIcon from "@/Images/Icons/order-icon.svg";
import SettingIcon from "@/Images/Icons/setting-icon.svg";
import HelpIcon from "@/Images/Icons/help-icon.svg";
import PolicyIcon from "@/Images/Icons/policy-icon.svg";
import orderIcon from "@/Images/Icons/order-icon.svg";
import settingIcon from "@/Images/Icons/setting-icon.svg";
import helpIcon from "@/Images/Icons/help-icon.svg";
import policyIcon from "@/Images/Icons/policy-icon.svg";

// Apis 
import GetAccessTokenAPI from "@/apis/auth/GetAccessToken";
import LogoutApi from "@/apis/auth/LogoutApi";


const MyAccountSection = () => {

  let[accessToken,setAccessToken]=useState('');

  let router=useRouter();

  useEffect(()=>{
    getAccessToken();
    console.log(accessToken);
    
  },[])

  //getting access token
  function getAccessToken()
  {
      GetAccessTokenAPI()
      .then((response)=>{
          if(response&&'access_token' in response)
          {
              setAccessToken(response.access_token);
          }
          
      })
      .catch((error)=>{
        console.log(error);
      })
  }
  //when user click logout
  function handleLogOut()
  {
      LogoutApi(accessToken)
      .then((response)=>{
          if(response&&'message' in response&&response.message==='Logged out successfully.')
          {
              router.push('/');
          }
      })
      .catch((error)=>{
          console.log(error);
          
      })
  }
  return (
    <>
      <article className={"page-center-parent-container h-screen small-border border-black  scroll-smooth relative "  }>
       {/* hero section */}
        <header className="small-border-bottom custom-border-grey800 ">
          <Link href="#">
            <div className="gap-6 mt-4 mx-4 rounded-tl-xl rounded-tr-xl small-border-top small-border-right  small-border-left custom-border-grey800 background-custom-grey100 h-[235px] flex justify-center items-center">
              
              {/* User Section */}
              <section className="gap-2 flex flex-col items-center ">
                  <h2 className="heading-h2 custom-text-grey900 ">
                    Omkar Ghodke
                  </h2>

                  <section className="flex items-center justify-center pt-1">
                    <div className=" h-[1px] w-2 background-custom-grey600 mr-1 "></div>
                    <p className="all-caps-10-bold custom-text-grey600">
                      WELCOME TIER
                    </p>
                    <div className=" h-[1px] w-2 background-custom-grey600 ml-1 "></div>
                  </section>
              </section>
            </div>
          </Link>
        </header>

        {/* main section */}
        <main className=" flex flex-col items-center w-full">
         {accessToken&& <>
            <AccountButton href="#" buttonIcon={orderIcon} buttonName="my orders" />
            <AccountButton href="/my-account/settings-and-activity" buttonIcon={settingIcon} buttonName="Settings & Activity" />
          </>}
          <AccountButton href="/my-account/help-and-faq" buttonIcon={helpIcon} buttonName="Help & Support"  />
          <AccountButton href="/my-account/legal-policies-and-more" buttonIcon={policyIcon} buttonName="Legal Policies & More" />
        </main>

        {/* footer section */}
        <footer className=" gap-10 pt-12 px-6 pb-10 flex flex-col items-center w-full ">
    
          <AccountCopyrightSection />
         
          <button type="button" className=" py-3 px-6 small-border custom-border-grey800 all-caps-10-bold custom-text-grey900 w-full" onClick={handleLogOut}>
            Logout
          </button>


        </footer>
          <StoreFooter/>

      </article>
    </>
  );
};

export default MyAccountSection;
