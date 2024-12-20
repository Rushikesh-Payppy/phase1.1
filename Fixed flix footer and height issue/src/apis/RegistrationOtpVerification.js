
import axios from 'axios';

async function RegistrationOtpVerification(payloadObj)
{
    try {
        let response=await axios.post('https://payppy.in/auth/verify_mobile_otp',payloadObj)
    
        return response.data;
    } catch (error) {
        console.error(error);
        if(error.status==500&&error.response.data?.message=="session validation failed")
        {
            return{
                status:500,
                message:error.response.data.message
            }
        }
    }

}

export default RegistrationOtpVerification;