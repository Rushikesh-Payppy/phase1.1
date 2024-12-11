'use client';
import React from 'react';
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


const PersonalInformationSection = () => {

    const handleName = () => {
        console.log("name clicked");
    }

    const handlePhoneNo = () => {
        console.log("phone no clicked");
    }
    return (

        <article className={"max-w-[52.7vh] h-screen min-w-[200px] min-h-[200px] mx-auto border-r-[0.5px] border-l-[0.5px] custom-border-grey950 overflow-x-hidden overflow-y-visible scroll-smooth " + plus_jakarta_sans.className}>

        <PageBackButton/>

            <h4 className='heading-h4 custom-text-grey900 capitalize mt-6 ml-4'>Personal Information</h4>

            <main className=' w-full border-t-[0.5px] custom-border-grey800 mt-5'>

                {/* Name section */}
                <button onClick={handleName} className='border-b-[0.5px] custom-border-grey800 py-7 px-6 w-full flex justify-between' type='button'>
                    <div className=' font-medium all-caps-12 custom-text-grey900 uppercase '>Full Name</div>
                    <div className=' gap-1 flex flex-row'>
                        <p className='body font-normal custom-text-grey900 gap-2  capitalize '>Omkar Ghodke</p>
                        <Image src={RightChevron} width={20} height={20} alt='img' quality={100} />
                    </div>
                </button>

                {/* Email section */}
                <div className='border-b-[0.5px] custom-border-grey800 py-7 px-6 w-full flex justify-between'>
                    <div className=' font-medium all-caps-12 custom-text-grey900 uppercase '>Email</div>
                    <div className=' gap-1 flex flex-row'>
                        <p className='body font-normal custom-text-grey900 gap-2 lowercase'>omkr888@gmail.com</p>
                    </div>
                </div>

                {/* Phone no section */}
                <button onClick={handlePhoneNo} className='border-b-[0.5px] custom-border-grey800 py-7 px-6 w-full flex justify-between' type='button'>
                    <div className=' font-medium all-caps-12 custom-text-grey900 uppercase '>Phone number</div>
                    <div className=' gap-1 flex flex-row'>
                        <p className='body font-normal custom-text-grey900 gap-2 '>+91 84468 89928</p>
                        <Image src={RightChevron} width={20} height={20} alt='img' quality={100} />
                    </div>
                </button>
                
            </main>
        </article>

    );
};

export default PersonalInformationSection;
