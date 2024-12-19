'ues client';
import axios from 'axios';

async function ResendOtp(payloadObj)
{
    try {
        let response=await axios.post('https://payppy.in/auth/resend-otp',payloadObj)
    
        return response.data;
    } catch (error) {
        console.error(error);
    }

}

export default ResendOtp;