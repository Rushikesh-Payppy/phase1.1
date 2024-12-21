'use client';

function StoreGetProductsExcludingOne(query,productId)
{

    return fetch(`https://medusa.payppy.app/store/products${query}`,{
            headers:{
                "x-publishable-api-key": process.env.PUBLISHABLE_KEY
            }
        })
        .then((data)=>{
            return data.json();
        })
        .then((response)=>{
            let products=response.products.filter((element)=>{
                return element.id!==productId;
            })

            return products;
        })
        .catch((error)=>{
            console.log(error);
            return error;
        })


}

export default StoreGetProductsExcludingOne;