'use client';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import Arrow from '@/Images/Otp/arrow-icon.svg';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';


const plus_jakarta_sans=Plus_Jakarta_Sans({
    subsets:['latin'],
    display:'swap'
})
    

function OtpInputs({sessionId,phone_number})
{

    let router=useRouter();
    let otp=useRef([6]);

    function OtpVerification()
    {


        let number=otp.current[0].value+otp.current[1].value+otp.current[2].value+otp.current[3].value+otp.current[4].value+otp.current[5].value;
        console.log('number :',number);
        
        fetch('http://65.1.13.124:5000/auth/verify_mobile_otp',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json', // Specify the content type
            },
            body:JSON.stringify({
                    "phone_number":phone_number,
                    "session_uuid":sessionId,
                    "otp": number

            })
        }).then((response)=>{
            response.json();
        })
        .then((data)=>{
                console.log(data);  
                router.push('/sign-in');
        })
        .catch((error)=>{
            console.log(error);
            
        })
    }
    




    function handleOtp(e,index)
    {
        console.log(e);
        
        let value=e.target.value.replace(/[^0-9 ]/g, "");

        if(value=='' )
        {
            otp.current[index].value="";
        }

        if(index>0&&e.key==='Backspace'&&value=='')
        {
            otp.current[index-1].focus();
        }

        if(value.length>1 )
        {
            return;
        }
        if(value.length===1&&index<5)
        {
            otp.current[index+1].focus();
        }

        if(index===5&&otp.current[5].length>0)
            {
                OtpVerification();
            }

       
    }
    return(
        <>
        <section className={"flex justify-center h-screen w-full background-custom-grey100  overflow-hidden "+plus_jakarta_sans.className}>
            <div className="page-center-parent-container small-border custom-border-grey600 relative">
                <div className="flex flex-col px-6 pt-2 pb-10 background-custom-grey100 gap-8 h-screen ">
                    <div className="flex flex-col gap-10 ">
                        <Image src={Arrow} width={36} height={36} alt='img' quality={100} />
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-2">
                                <h3 className="heading-h3 custom-text-grey900 ">Enter 6 digit code we sent to <br />+91 84468 89928</h3>
                                <div className="body-sm custom-text-grey700">This helps us keep your account secure</div>
                            </div>
                            <div className="flex flex-col gap-5 ">
                                <div className="grid grid-cols-6 border border-l-0 custom-border-grey200 w-full ">
                                    {Array(6).fill(0).map((element,index)=>{
                                        return<div className="border-l  h-16 custom-border-grey200 " key={index}>
                                            <input type="text"  ref={ref=>(otp.current[index]=ref)} className='outline-none h-full px-5 heading-h3 w-full otp-input-fields ' maxLength={1} onChange={(e)=>{handleOtp(e,index)}} onKeyDown={(e)=>{handleOtp(e,index)}} />
                                        </div>
                                    })}
                                   
                                </div>
                                <div className="custom-text-grey500 body-sm">Resend code in 00:14</div>
<button onClick={OtpVerification} className='border'>send</button>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
        </>
    )
}

export default OtpInputs;