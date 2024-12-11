'use client'
import { Plus_Jakarta_Sans } from "next/font/google";
import Image from "next/image";

import Verified from '@/Images/Auth/verified.svg';
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";



const plus_jakarta_sans=Plus_Jakarta_Sans({
    subsets:['latin'],
    display:'swap'
})


function ResetPasswordSuccessSection() {
    
    let router=useRouter();



    function handleBackToLogin()
    {
        router.push('/?auth=login')
    }
    return(
        <>
            <section className={"flex justify-center h-screen w-full background-custom-grey100  overflow-hidden "+plus_jakarta_sans.className}>
                        <div className="page-center-parent-container w-full  h-screen small-border border-black ">
                            <div className="flex flex-col justify-center items-center px-6 pt-2 pb-10 background-custom-grey100 gap-8 h-screen ">
                                <div className="flex flex-col items-center gap-5">
                                    <Image src={Verified} width={36} height={36} alt="img" quality={100} className=""/>
                                    <div className="flex flex-col gap-2 items-center">
                                        <h2 className="heading-h2">You're all set!</h2>
                                        <div className="body-sm custom-text-grey700">Now, try logging in with your fresh new password.</div>
                                    </div>
                                </div>
                            <button className={`py-4 px-7 w-full  bg-black  shadow-sm custom-text-white all-caps-12`} onClick={handleBackToLogin}>Back to Log in</button>
                            </div>
                </div>
            </section>
        </>
    )
}
export default ResetPasswordSuccessSection;
