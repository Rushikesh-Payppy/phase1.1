//Original code
import axios from "axios";

async function FlixForYouApi()
{
    try {
        let response = await axios.get('https://strapi.payppy.app/api/flixes/?populate=*');

        return response.data;
    } catch (error) {
        console.log(error);
        
    }
}

export default FlixForYouApi;


  