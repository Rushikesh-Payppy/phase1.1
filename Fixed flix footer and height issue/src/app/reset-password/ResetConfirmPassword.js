'use client';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import Arrow from '@/Images/Otp/arrow-icon.svg';
import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';


const plus_jakarta_sans=Plus_Jakarta_Sans({
    subsets:['latin'],
    display:'swap'
})
    

function ResetConfirmPassword({})
{

    let router=useRouter();
    let[password,setPassword]=useState('');
    let[confirmPassword,setConfirmPassword]=useState('');
    let[token,setToken]=useState('');

    let params=useSearchParams();

    useEffect(()=>{
        let token=params.get('token');
        setToken(token);
    },[params])


    



    return(
        <>
        <section className={"flex justify-center h-screen w-full background-custom-grey100  overflow-hidden "+plus_jakarta_sans.className}>
            <div className="page-center-parent-container w-full  h-screen  relative">
                <div className="flex flex-col px-6 pt-2 pb-10 background-custom-grey100 gap-8 h-screen ">
                    <div className="flex flex-col gap-10 ">
                        <Image src={Arrow} width={36} height={36} alt='img' quality={100} />
                      <div className="flex flex-col gap-8">
                        <h3 className="heading-h3">Update your password</h3>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1.5">
                                <div className="body-sm-bold custom-text-grey900">Password</div>
                                <input type="password" name="password" value={password} className='w-full border border-custom-grey300 outline-none py-3.5 px-5 ' onChange={(e) => { setPassword(e.target.value) }} />
                            </div>
                            <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                                 <div className="flex grow gap-2">
                                    <div className="custom-text-grey600 body-sm">8 characters minimum</div>
                                </div>
                                <div className="flex grow gap-2">
                                    <div className="custom-text-grey600 body-sm">One number</div>
                                </div>
                                <div className="flex grow gap-2">
                                    <div className="custom-text-grey600 body-sm">One uppercase letter</div>
                                </div>
                                <div className="flex grow gap-2">
                                    <div className="custom-text-grey600 body-sm">One special character</div>
                                </div>
                            </div>
                        </div>
                    </div>

                         <div className="flex flex-col gap-1.5">
                            <div className="body-sm-bold custom-text-grey900">Confirm Password</div>
                            <input type="password" name="password" value={confirmPassword} className='w-full border border-custom-grey300 outline-none py-3.5 px-5 ' onChange={(e) => { setConfirmPassword(e.target.value) }} />
                        </div>
                        
                        <button className='py-4 px-7 w-full bg-black shadow-sm custom-text-white all-caps-12'>Proceed</button>

                    </div>

                </div>
            </div>
        </section>
        </>
    )
}

export default ResetConfirmPassword;