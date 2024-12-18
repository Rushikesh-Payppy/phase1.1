import axios from "axios";

async function FlixBlogGetLikesApi({contentId})
{
    try {
        let response = await axios.get(`https://nexus.payppy.app/api/content/${contentId}/likes`);

        return response.data;
    } catch (error) {
        console.log(error);
        
    }
}

export default FlixBlogGetLikesApi;




//get likes
//API 
//"https://strapi.payppy.app/api/content/<content_id>/likes" get method no playload




//user likes get method
//access token
//API
//"https://strapi.payppy.app/api/user/likes"