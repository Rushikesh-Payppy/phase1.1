
let baseurl='https://medusa.payppy.in/';
let region_id='reg_01JDPJAQ0EV727HP0MPZH1NZA9';
function GetPaymentProviderList()
{
    return fetch(`${baseurl}store/payment-providers?region_id=${region_id} 
`,
        {
            headers:{
                'Content-Type':'application/json',
                "x-publishable-api-key": "pk_fd3a3f0b2cfa7e96a8a7e2f66f07927cb5e2d6282af3f0251ada0ef101dcf2ee"
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