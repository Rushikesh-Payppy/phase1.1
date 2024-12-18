let baseurl='https://payppy.in/';
function GetAuthInfoApi(accessToken)
{
    return fetch(`${baseurl}api/get-customer`,
        {
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+accessToken
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

export default GetAuthInfoApi;