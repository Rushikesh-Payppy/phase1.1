
let baseurl='https://medusa.payppy.app/';
function IntiatePaymentApi(payload,paymentCollectionId)
{
    return fetch(`${baseurl}store/payment-collections/${paymentCollectionId}/payment-sessions
`,
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                "x-publishable-api-key": "pk_309836f348011413862e21d0b67c72883a0e149876e5ddcd38db238785c8a9fb"
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

export default IntiatePaymentApi;