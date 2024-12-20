'use client';
import axios from 'axios';

async function SignInApi(payloadObj)
{
    try {
        let response=await axios.post('https://payppy.in/auth/login',payloadObj)
    
        return response.data;
    } catch (error) {
        console.error(error);
    }

}

export default SignInApi;