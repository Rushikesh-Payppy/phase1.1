'use client';

let publishKey="pk_fd3a3f0b2cfa7e96a8a7e2f66f07927cb5e2d6282af3f0251ada0ef101dcf2ee";
function StoreCollectionsApi()
{
       return fetch('https://medusa.payppy.in/store/collections',{
            headers:{
                'x-publishable-api-key': publishKey,
                'Content-Type': 'application/json'
            },
            credentials:'include'
        })
        .then((data)=>{
            return data.json();
        })
        .then((response)=>{
            return response;
        })
        .catch((error)=>{
            console.log(error);
            return error;
        })
}

export default StoreCollectionsApi;