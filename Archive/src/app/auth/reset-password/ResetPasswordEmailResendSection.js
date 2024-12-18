'use client';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import Arrow from '@/Images/Auth/arrow-icon.svg';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import UserResendMail from '@/apis/auth/UserResendMail';
import ForgotPasswordApi from '@/apis/auth/ForgotPasswordApi';


const plus_jakarta_sans=Plus_Jakarta_Sans({
    subsets:['latin'],
    display:'swap'
})
    

function ResetPasswordEmailResendSection({email,setResetPasswordSteps,alreadyRegistered})
{

    let[timer,setTimer]=useState(60);
    let[emailRegistered,setEmailRegistered]=useState(false);
    let[mailsent,setMailSent]=useState(true);


    useEffect(()=>{
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1); // Update based on previous value
            }, 1000);
    
            return () => clearInterval(interval); // Cleanup on unmount or timer reset
        }
    },[timer])

    useEffect(()=>{
        if(alreadyRegistered)
        {
            handleResendEmail();
        }
    },[alreadyRegistered])

    //handleing resend email
    function handleResendEmail()
    {
        let obj={
            'login_value':email
        }

        ForgotPasswordApi(obj)
        .then((response)=>{
            // console.log(response);
            if(response&&'message' in response)
            {
                if(response.message==='Password reset link has been sent to your email.')
                {
                    setTimer(60);
                }
            }
        })
        .catch((error)=>{
            console.log(error);
        })

    }

    //handling back click button
    function handleBackBtn()
    {
        setResetPasswordSteps(0);
    }
    return(
        <>
        {/* <section className={"flex justify-center h-screen w-full background-custom-grey100  overflow-hidden "+plus_jakarta_sans.className}> */}
            
            <div className="page-center-parent-container overflow-hidden border-black small-border custom-border-grey600 background-custom-white">
                
                <div className="flex flex-col px-6 pt-24 pb-10 background-custom-grey100 gap-8 h-screen relative ">
                    
                            <Image src={Arrow} width={36} height={36} alt='img' quality={100} className='cursor-pointer absolute top-6 left-6' onClick={handleBackBtn} />
                        <div className="flex flex-col gap-10 ">

                            <div className="flex flex-col gap-8">

                                <div className="flex flex-col gap-2">
                                    <h3 className="heading-h3 custom-text-grey900 ">We’ve sent a verification link to {email} </h3>
                                    <div className="body-sm custom-text-grey700">We're one step closer to setting a new password</div>
                                </div>

                                {emailRegistered? <span className="custom-text-alert body-sm">Your email is already verified.</span>
                               : <h5 className="heading-h5 custom-text-grey900">To verify your email, tap the button in the email we sent you</h5>} 

                                {timer > 0 ? <div className="custom-text-grey500 body-sm">Resend link in 00:{timer}sec</div> :
                                    <div className="custom-text-grey800 body-sm-bold cursor-pointer underline" onClick={handleResendEmail}>Resend link</div>}

                            </div>
                        </div>

                </div>
            </div>
        {/* </section> */}
        </>
    )
}

export default ResetPasswordEmailResendSection;