'use client';

function TaxesApi(cartId)
{

    return fetch(`https://medusa.payppy.in/store/carts/${cartId}/taxes`,{
        method:'POST',
            headers:{
                "x-publishable-api-key": process.env.PUBLISHABLE_KEY
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