
let baseurl='https://nexus.payppy.app/';
function GetCartInfoApi(accessToken)
{
    return fetch(`${baseurl}auth/profile
`,
        {
            headers:{
                'Content-Type':'application/json',
                "x-publishable-api-key": process.env.PUBLISHABLE_KEY,
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

export default GetCartInfoApi;