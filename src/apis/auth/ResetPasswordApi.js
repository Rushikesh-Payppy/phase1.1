
let baseurl='https://nexus.payppy.app/';
function ResetPasswordApi(payload,token)
{
    return fetch(`${baseurl}auth/reset-password/${token}`,
        {
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
            },
            credentials:'include',
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

export default ResetPasswordApi;