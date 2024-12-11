'use client';
import React from 'react';
import { Plus_Jakarta_Sans } from "next/font/google";

//font
const plus_jakarta_sans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    display: "swap",
});

//components
import PageBackButton from '@/Components/PageBackButton';
import AccountButton from '@/Components/AccountButton';
import ReadFaqSection from '@/Components/ReadFaqSection';


const SettingsAndActivitySection = () => {

    const handleLogout = () => { console.log("logout clicked"); }

    return (

        <article className={"max-w-[52.7vh] h-screen min-w-[200px] min-h-[200px] mx-auto border-r-[0.5px] border-l-[0.5px] custom-border-grey950 overflow-x-hidden overflow-y-visible scroll-smooth " + plus_jakarta_sans.className}>
            
            <PageBackButton />

            <main className='gap-10 mt-5 border-t-[0.5px] custom-border-grey800'>
                <AccountButton href="/my-account/personal-information" buttonName="Personal Information" />
                <AccountButton href="#" buttonName="Change Password" />

                {/* seperator gap 1 */}
                <div className=' w-full gap-3 h-10  background-custom-grey100 border-b-[0.5px] custom-border-grey800 '></div>

                <AccountButton href="#" buttonName="Address Book" />

                {/* seperator gap 2 */}
                <div className=' w-full gap-3 h-10 background-custom-grey100 border-b-[0.5px] custom-border-grey800 '></div>

                <AccountButton href="#" buttonName="Delete Account" />

                {/* logout button */}
                <div className='mt-10 mx-6'>
                    <button onClick={handleLogout} className='w-full border-[0.5px] custom-border-grey800 py-3 px-6 all-caps-10-bold custom-text-grey900 ' type='button'>
                        Logout
                    </button>
                </div>

            </main>

            <footer className=' w-full'>
                <ReadFaqSection />
            </footer>

        </article>
    );
}

export default SettingsAndActivitySection;