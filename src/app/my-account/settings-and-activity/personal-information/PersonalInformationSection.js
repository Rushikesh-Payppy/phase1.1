'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Plus_Jakarta_Sans } from "next/font/google";

//font
const plus_jakarta_sans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    display: "swap",
});

//components
import PageBackButton from '@/Components/PageBackButton';


//icons
import RightChevron from '@/Images/Icons/chevron-right-icon-dark.svg';
import { useRouter } from 'next/navigation';
import GetAccessTokenAPI from '@/apis/auth/GetAccessToken';
import IntialLoadingAnimation from '@/Components/InitialPageLoadingAnimation';
import GetCartInfoApi from '@/apis/store/GetCartInfoApi';


const PersonalInformationSection = () => {


    let [accessToken, setAccessToken] = useState('');
    let [gettingAccessToken, setGettingAccessToken] = useState(true);

    let[userInfo,setUserInfo]=useState('');

    let router=useRouter();


     //to get a access token
     useEffect(() => {
        getAccessToken();
    }, [])

    useEffect(()=>{
        getUserInfo();
    },[accessToken])


    //to handle page
    const handleNavigationPage = (url) => {
        router.push(url);
    }


    function getUserInfo()
    {
        GetCartInfoApi(accessToken)
        .then((response)=>{
            console.log(response);
            
            setUserInfo(response);
        })
        .catch(()=>{

        })
    }


      //getting access token
      function getAccessToken() {
        GetAccessTokenAPI()
            .then((response) => {
                if (response && 'access_token' in response) {
                    setAccessToken(response.access_token);
                }

                if(response&&'message' in response&&response.message==='Refresh token is missing')
                {
                    router.push('/auth/user-auth')
                }
            })
            .catch(() => {

            })
            .finally()
        {
            setGettingAccessToken(false);
        }
    }
    return (
        <>
        {gettingAccessToken? <IntialLoadingAnimation/>
            :   <article className={"max-w-[52.7vh] h-screen min-w-[200px] min-h-[200px] mx-auto border-r-[0.5px] border-l-[0.5px] custom-border-grey950 overflow-x-hidden overflow-y-visible scroll-smooth " + plus_jakarta_sans.className}>

            <PageBackButton url='/my-account/settings-and-activity'/>

                <h4 className='heading-h4 custom-text-grey900 capitalize mt-6 ml-4'>Personal Information</h4>

                <main className=' w-full border-t-[0.5px] custom-border-grey800 mt-5'>

                    {/* Name section */}
                    <button onClick={()=>{handleNavigationPage('/auth/user-information?personalInfo=true')}} className='border-b-[0.5px] custom-border-grey800 py-7 px-6 w-full flex justify-between' type='button'>
                        <div className=' font-medium all-caps-12 custom-text-grey900 uppercase '>Full Name</div>
                        <div className=' gap-1 flex flex-row'>
                            <p className='body font-normal custom-text-grey900 gap-2  capitalize '>{(userInfo?.details_data?.first_name || "") + " " + (userInfo?.details_data?.last_name || "")}</p>
                            <Image src={RightChevron} width={20} height={20} alt='img' quality={100} />
                        </div>
                    </button>

                    {/* Email section */}
                    <div className='border-b-[0.5px] custom-border-grey800 py-7 px-6 w-full flex justify-between'>
                        <div className=' font-medium all-caps-12 custom-text-grey900 uppercase '>Email</div>
                        <div className=' gap-1 flex flex-row'>
                            <p className='body font-normal custom-text-grey900 gap-2 lowercase'>{(userInfo?.email || "")}</p>
                        </div>
                    </div>

                    {/* Phone no section */}
                    <button onClick={()=>{handleNavigationPage('/auth/mobile-verification?personalInfo=true')}} className='border-b-[0.5px] custom-border-grey800 py-7 px-6 w-full flex justify-between' type='button'>
                        <div className=' font-medium all-caps-12 custom-text-grey900 uppercase '>Phone number</div>
                        <div className=' gap-1 flex flex-row'>
                            <p className='body font-normal custom-text-grey900 gap-2 '>{userInfo?.details_data?.phone_number || ""}</p>
                            <Image src={RightChevron} width={20} height={20} alt='img' quality={100} />
                        </div>
                    </button>
                    
                </main>
            </article>}
        </>

    );
};

export default PersonalInformationSection;