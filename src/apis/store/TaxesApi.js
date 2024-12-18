'use client';

function TaxesApi(cartId)
{

    return fetch(`https://medusa.payppy.app/store/carts/${cartId}/taxes`,{
        method:'POST',
            headers:{
                "x-publishable-api-key": "pk_309836f348011413862e21d0b67c72883a0e149876e5ddcd38db238785c8a9fb"
            }
        })
        .then((data)=>{
            return data.json();
        })
        .catch((error)=>{
            console.log(error);
            return error;
        })


}

export default TaxesApi;