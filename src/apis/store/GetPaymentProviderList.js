
let baseurl='https://medusa.payppy.app/';
let region_id='reg_01JDPJAQ0EV727HP0MPZH1NZA9';
function GetPaymentProviderList()
{
    return fetch(`${baseurl}store/payment-providers?region_id=${region_id} 
`,
        {
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

export default GetPaymentProviderList;