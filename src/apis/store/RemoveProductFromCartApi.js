
let baseurl='https://medusa.payppy.in/';
function RemoveProductFromCartApi(cartId,lineId)
{
    return fetch(`${baseurl}store/carts/${cartId}/line-items/${lineId}
`,
        {
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                "x-publishable-api-key": "pk_fd3a3f0b2cfa7e96a8a7e2f66f07927cb5e2d6282af3f0251ada0ef101dcf2ee",
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

export default RemoveProductFromCartApi;