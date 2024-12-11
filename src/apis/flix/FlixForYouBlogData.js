import axios from "axios";


async function FlixForYouBlogData(id)
{
    try {
        let response=await axios.get(`https://strapi.payppy.app/api/flixes/${id}?populate=*`);

        return response.data;
    } catch (error) {
        console.log(error);
        
    }
}

export default FlixForYouBlogData;