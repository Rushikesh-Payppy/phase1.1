let baseurl='https://nexus.payppy.app/';
function LogoutApi(accessToken)
{
    return fetch(`${baseurl}auth/logout`,
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+accessToken
            },
            credentials:'include'
        }
    )
    .then((data)=>{
        return data.json();
    })
    .catch((error)=>{
        return error;
    })
}

export default LogoutApi;