'use client';

let publishKey="pk_309836f348011413862e21d0b67c72883a0e149876e5ddcd38db238785c8a9fb";
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