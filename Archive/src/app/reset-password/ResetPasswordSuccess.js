'use client';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import Arrow from '@/Images/Otp/arrow-icon.svg';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';


const plus_jakarta_sans=Plus_Jakarta_Sans({
    subsets:['latin'],
    display:'swap'
})
    

function ResetPasswordSuccess()
{

    let router=useRouter();



    



    return(
        <>
        <section className={"flex justify-center h-screen w-full background-custom-grey100  overflow-hidden "+plus_jakarta_sans.className}>
            <div className="max-w-[400px] w-full  h-screen  ">
                <div className="flex justify-center items-center px-6 pt-2 pb-10 background-custom-grey100 gap-8 h-screen ">
                    <div className="flex flex-col gap-8 items-center     ">
                       <div className="w-24 h-24 rounded-full background-custom-grey50"></div>
                       <div className="flex flex-col items-center gap-2">
                            <div className="body-bold custom-text-grey900">You`&apos;re all set!</div>
                            <div className="body-sm custom-text-grey700">Now, try logging in with your fresh new password.</div>
                       </div>
                        <button onClick={()=>{router.push('/sign-in')}} className='py-4 px-7 w-full bg-black shadow-sm custom-text-white all-caps-12'>Back to Log in</button>

                    </div>

                </div>
            </div>
        </section>
        </>
    )
}

export default ResetPasswordSuccess;