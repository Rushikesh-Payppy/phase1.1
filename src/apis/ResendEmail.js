'use client';
import axios from 'axios';

async function ResendEmail(payloadObj)
{
    try {
        let response=await axios.post('https://payppy.in/auth/resend_verification_email',payloadObj)
    
        return response.data;
    } catch (error) {
        console.error(error);
        if(error.status===400&&error.response.data.message=="Your email is already verified.")
        {
            return{
                status:400,
                message:'Your email is already verified.'
            }
        }
    }

}

export default ResendEmail;