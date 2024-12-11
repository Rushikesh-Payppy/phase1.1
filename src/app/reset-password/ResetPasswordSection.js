'use client';

import Arrow from '@/Images/Otp/arrow-icon.svg';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ResetConfirmPassword from './ResetConfirmPassword';
import ResetPasswordSuccess from './ResetPasswordSuccess';
import OtpInputs from '@/Components/OtpInputs';


const plus_jakarta_sans=Plus_Jakarta_Sans({
    subsets:['latin'],
    display:'swap'
})
function ResetPasswordSection()
{
    let[numberOrEmail,setNumberEmail]=useState('');
    let[sessionid,setSessionId]=useState('');

    let[pageIndex,setPageIndex]=useState(0);



 
    return(
        <>
            {pageIndex==0&&<section className={"flex justify-center  background-custom-grey50   "+plus_jakarta_sans.className}>
                <div className="page-center-parent-container px-6 py-10">
                    <div className="flex flex-col gap-10 ">
                        <Image src={Arrow} width={32} height={32} alt='img' quality={100} className=''/>
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-2">
                                <h3 className="heading-h3 custom-text-grey900 ">Reset Password</h3>
                                <div className="body-sm custom-text-grey700">We’ll send a confirmation code to your email or phone number. Once verified, you can set a new password.</div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <div className="body-sm-bold custom-text-grey900">Email / Phone Number</div>
                                <input type="text" name="numberOrEmail" value={numberOrEmail} className='w-full border border-custom-grey300 outline-none py-3.5 px-5 ' onChange={(e) => { setNumberEmail(e.target.value) }} />
                            </div>
                            <button className="py-4 px-7 w-full bg-black shadow-sm custom-text-white all-caps-12" >Proceed</button>

                        </div>
                    </div>

                </div>
            </section>}
            {pageIndex==1&&<OtpInputs/>}
            {pageIndex==2&&<ResetConfirmPassword />}
            {pageIndex==3&&<ResetPasswordSuccess />}

        </>
    )
}

export default ResetPasswordSection;