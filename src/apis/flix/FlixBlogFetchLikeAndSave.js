import axios from "axios";

async function FlixBlogFetchLikeAndSave()
{
    try {
        let response = await axios.get(`https://nexus.payppy.app/api/user/interaction`);

        return response.data;
    } catch (error) {
        console.log(error);
        
    }
}

export default FlixBlogFetchLikeAndSave;



//fetch saved and liked blogs
//API --> http://payppy.in/api/user/interaction
// get method required and send access token