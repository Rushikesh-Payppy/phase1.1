
let baseurl='https://payppy.in/';
function GetOrdersApi(accessToken)
{
    return fetch(`${baseurl}api/get-orders
`,
        {
            headers:{
                'Content-Type':'application/json',
                // "x-publishable-api-key": process.env.PUBLISHABLE_KEY,
                'Authorization': 'Bearer '+accessToken
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

export default GetOrdersApi;