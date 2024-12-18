'use client';

function StoreGetProductsExcludingOne(query,productId)
{

    return fetch(`https://medusa.payppy.app/store/products${query}`,{
            headers:{
                "x-publishable-api-key": "pk_309836f348011413862e21d0b67c72883a0e149876e5ddcd38db238785c8a9fb"
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