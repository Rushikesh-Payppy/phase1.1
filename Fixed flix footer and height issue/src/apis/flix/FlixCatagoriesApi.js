import axios from "axios";


async function FlixCatagoriesApi()
{
    try {
        // let response=await axios.get('http://148.135.138.27:1337/api/flix-catagories/?populate=*');
        let response=await axios.get('https://strapi.payppy.app/api/flix-catagories/?populate=*');

        return response.data;
    } catch (error) {
        console.log(error);
        
    }
}

export default FlixCatagoriesApi;