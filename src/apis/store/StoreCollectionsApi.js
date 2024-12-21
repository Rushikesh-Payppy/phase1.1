'use client';

let publishKey=process.env.PUBLISHABLE_KEY;
function StoreCollectionsApi()
{
       return fetch('https://medusa.payppy.app/store/collections',{
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