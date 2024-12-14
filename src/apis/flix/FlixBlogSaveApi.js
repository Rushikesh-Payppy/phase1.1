import axios from "axios";

async function FlixBlogSaveApi() {
    try {
        let response = await axios.get("https://strapi.payppy.app/api/save");
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

export default FlixBlogSaveApi;



//for like post method

//payload
//access token
//var content_id
//liked = true/ false

//get likes
//API 
//"https://strapi.payppy.app/api/content/<content_id>/likes" get method no playload



//for save post method
//access token
//var content_id
//saved = true/ false

//user likes get method
//access token
//API
//"https://strapi.payppy.app/api/user/likes"
