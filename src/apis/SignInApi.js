'use client';
import axios from 'axios';

async function SignInApi(payloadObj)
{
    try {
        let response=await axios.post('https://nexus.payppy.app/auth/login',payloadObj)
    
        return response.data;
    } catch (error) {
        console.error(error);
    }

}

export default SignInApi;