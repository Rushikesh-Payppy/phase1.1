'use client';

function StoreProductsListApi(query)
{

    return fetch(`http://148.135.138.27:9002/store/products${query}`,{
            headers:{
                "x-publishable-api-key": "pk_fd3a3f0b2cfa7e96a8a7e2f66f07927cb5e2d6282af3f0251ada0ef101dcf2ee"
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