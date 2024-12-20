'use client';

function StoreProductsListApi(query)
{

    return fetch(`https://medusa.payppy.in/store/products${query}`,{
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

export default StoreProductsListApi;