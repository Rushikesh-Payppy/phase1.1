'ues client';
import axios from 'axios';

async function ResendOtp(payloadObj)
{
    try {
        let response=await axios.post('https://nexus.payppy.app/auth/resend-otp',payloadObj)
    
        return response.data;
    } catch (error) {
        console.error(error);
    }

}

export default ResendOtp;