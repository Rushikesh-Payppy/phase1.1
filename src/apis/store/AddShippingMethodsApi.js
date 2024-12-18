
let baseurl='https://medusa.payppy.in/';
function AddShippingMethodsApi(payload,cartId)       //cart Id if we want to add a data for that cart then  
{
    return fetch(`${baseurl}store/carts/${cartId}/shipping-methods
`,
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                "x-publishable-api-key": "pk_fd3a3f0b2cfa7e96a8a7e2f66f07927cb5e2d6282af3f0251ada0ef101dcf2ee"
            },
            body:JSON.stringify(payload)
        }
    )
    .then((data)=>{
        return data.json();
    })
    .catch((error)=>{
        return error;
    })
}

export default AddShippingMethodsApi;