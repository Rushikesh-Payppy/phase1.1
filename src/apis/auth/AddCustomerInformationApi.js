
let baseurl='https://payppy.in/';

function AddCustomerInformationApi(payload,accessToken)
{
    return fetch(`${baseurl}api/add-customer
`,
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+accessToken
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

export default AddCustomerInformationApi;