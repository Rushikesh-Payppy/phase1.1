
let baseurl='https://medusa.payppy.app/';
function GenerateOrderApi(cartId)
{
    return fetch(`${baseurl}store/carts/${cartId}/complete
`,
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                "x-publishable-api-key": "pk_309836f348011413862e21d0b67c72883a0e149876e5ddcd38db238785c8a9fb"
            },
        }
    )
    .then((data)=>{
        return data.json();
    })
    .catch((error)=>{
        return error;
    })
}

export default GenerateOrderApi;