import axios from "axios";


async function PoliciesApi(title)
{
    try {
        let response=await axios.get(`https://strapi.payppy.app/api/policies?populate=*`);

        let data=response.data;

        let titleMatchedPolicy=response.data?.data.find((element,index)=>{
            return element.policy_title==title;
        })
        
        return titleMatchedPolicy;

    } catch (error) {
        console.log(error);
        
    }
}

export default PoliciesApi;