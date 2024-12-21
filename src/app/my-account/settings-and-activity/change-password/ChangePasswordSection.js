'use client';
import Image from 'next/image';


import Arrow from '@/Images/Otp/arrow-icon.svg';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PasswordValidationBoxes, { verifyPasswordIsMatchingToCriteriaWhileTyping } from '@/Components/PasswordValidation';
import GetAccessTokenAPI from '@/apis/auth/GetAccessToken';
import IntialLoadingAnimation from '@/Components/InitialPageLoadingAnimation';
import SanitizeInputs from '@/SanitizingInputs/SanitizeInputs';
import ChangePasswordApi from '@/apis/auth/ChangePasswordApi';
import LoadingAnimation from '@/app/auth/LoadingAnimation';
import { PasswordToaster } from '@/Components/PasswordToaster';


    

function ChangePasswordSection()
{

    let [accessToken, setAccessToken] = useState('');
    let [gettingAccessToken, setGettingAccessToken] = useState(true);
    let[currentPassword,setCurrentPassword]=useState('');
    let[invalidCurrentPassword,setInvalidCurrentPassword]=useState(false);
    let[newPassword,setNewPassword]=useState('');
    let[confirmPassword,setConfirmPassword]=useState('');
    let[inValidNewPassword,setinValidNewPassword]=useState(true);
    let[passwordConfirmPasswordNotMatching,setPasswordConfirmPasswordNotMatching]=useState(false);
    let[loadingAnimation,setLoadingAnimation]=useState(false);
    
    //if user entered his previous password then this state will become true to show error massage
    let[enteredPreviousPassword,setEnteredPreviousPassword]=useState(false);
    
    //if user session has been expired then to show error massage
    // let[sessionExpired,setSessionExpired]=useState(false);
    
    let router=useRouter();

  //to get a access token
    useEffect(() => {
        getAccessToken();
    }, [])

    useEffect(()=>{
        let inValidNewPassword=verifyPasswordIsMatchingToCriteriaWhileTyping(newPassword);
        setinValidNewPassword(inValidNewPassword);
        // setEnteredPreviousPassword(false);
    },[newPassword])

      //getting access token
      function getAccessToken() {
        GetAccessTokenAPI()
            .then((response) => {
                if(response&&'message' in response&&response.message==='Refresh token is missing')
                {
                    window.location.href = '/auth/user-auth';
                }
                if (response && 'access_token' in response) {
                    setAccessToken(response.access_token);
                }

            })
            .catch(() => {

            })
            .finally()
        {
            setGettingAccessToken(false);
        }
    }

    //when click on proceed
    function handleClickProceed()
    {

        setPasswordConfirmPasswordNotMatching(newPassword!==confirmPassword || confirmPassword.length<1);
        setInvalidCurrentPassword(currentPassword.length<8);
        if(newPassword!=confirmPassword || inValidNewPassword || currentPassword.length<8)
        {
            return;
        }
        let obj={
           "old_password":currentPassword,
            "new_password":newPassword 
        }
        setLoadingAnimation(true);
        ChangePasswordApi(obj,accessToken)
        .then((response)=>{
            if(response&&'message' in response)
            {
                if(response?.message==='Old password is incorrect.')
                {
                    setInvalidCurrentPassword(true);
                    return;
                }
                else if(response?.message==='Old password and new password cannot be the same.')
                {
                    setEnteredPreviousPassword(true);
                }

                if(response?.message==='Password has been changed successfully.')
                {
                    // alert('password changed succesfully');
                    <PasswordToaster />
                    resetAllStates();

                }
            }
        })
        .catch((error)=>{
            console.log(error);
        })
        .finally(()=>{
            setLoadingAnimation(false);
        })
      
    }

    //handle current password input
    function handleCurrentPasswordInput(e)
    {
        let sanitizedInput=SanitizeInputs(e.target.value);
        setCurrentPassword(sanitizedInput);
    }

    //handle new password input
    function handleNewPasswordInput(e)
    {
        let sanitizedInput=SanitizeInputs(e.target.value);
        setNewPassword(sanitizedInput);
    }

    //handle confirm password input
    function handleConfirmPassword(e)
    {
        let sanitizedInput=SanitizeInputs(e.target.value);
        setConfirmPassword(sanitizedInput);
    }

    function resetAllStates()
    {
        setConfirmPassword('');
        setCurrentPassword('');
        setNewPassword('');
        setinValidNewPassword(false);
        setPasswordConfirmPasswordNotMatching(false);
        setEnteredPreviousPassword(false);
        setInvalidCurrentPassword(false);
    }
  

    function handleConfirmPassKeyDown(e)
    {
        if(e.key==='Enter')
        {
            handleClickProceed();
        }

    }

    function handleBackClick()
    {
        router.push('/my-account/settings-and-activity');
    }


    return(
        <>
        {gettingAccessToken ? <IntialLoadingAnimation />
                :
        <section className={"flex justify-center h-screen w-full background-custom-grey50  overflow-hidden "}>
            <div className="page-center-parent-container w-full  h-screen small-border border-black">
                <div className="flex flex-col px-6 pt-2 pb-10 background-custom-grey50 gap-8 h-screen ">
                    <div className="flex flex-col gap-10 ">
                        <Image src={Arrow} width={36} height={36} alt='img' quality={100} className='cursor-pointer' onClick={handleBackClick}/>
                      <div className="flex flex-col gap-8">
                        <h3 className="heading-h3">Update your password</h3>

                        <div className="flex flex-col gap-1.5">
                            <div className="body-sm-bold custom-text-grey900">Current Password</div>
                            <input type="password" name="password" value={currentPassword} className='w-full border border-custom-grey300 outline-none py-3.5 px-5 ' onChange={handleCurrentPasswordInput} onKeyDown={handleCurrentPasswordInput}/>
                            {invalidCurrentPassword&&<span className="custom-text-alert body-sm">Please Enter Valid Current Password</span>}
                        </div>

                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1.5">
                                <div className="body-sm-bold custom-text-grey900">New Password</div>
                                <input type="password" name="password" value={newPassword} className='w-full border border-custom-grey300 outline-none py-3.5 px-5 ' onChange={handleNewPasswordInput} />
                            </div>
                           <PasswordValidationBoxes password={newPassword} />
                        </div>
                         <div className="flex flex-col gap-1.5">
                            <div className="body-sm-bold custom-text-grey900">Confirm Password</div>
                            <input type="password" name="password" value={confirmPassword} className='w-full border border-custom-grey300 outline-none py-3.5 px-5 ' onChange={handleConfirmPassword} onKeyDown={handleConfirmPassKeyDown}/>
                            {passwordConfirmPasswordNotMatching&&<span className="custom-text-alert body-sm">Passwords do not match. Please try again</span>}
                        </div>
                        
                        <div className="flex flex-col gap-1">
                            {enteredPreviousPassword&&<div className="custom-text-alert body-sm text-center">New password is required.</div>}
                            {/* {sessionExpired&&<div className="custom-text-alert body-sm text-center">Your Session has been Expired Please Go Back To Reset Password</div>} */}
                            <button className={`py-4 px-7 w-full ${inValidNewPassword || loadingAnimation?' background-custom-grey500 ':' bg-black '} shadow-sm custom-text-white all-caps-12 flex justify-center`} disabled={inValidNewPassword || loadingAnimation} onClick={handleClickProceed}>{loadingAnimation?<LoadingAnimation borderColor='border-white'/>:'Proceed'}</button>
                        </div>
                    </div>


                    </div>

                </div>
            </div>
        </section>}
        </>
    )
}

export default ChangePasswordSection;