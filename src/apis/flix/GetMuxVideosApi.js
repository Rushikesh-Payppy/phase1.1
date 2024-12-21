import axios from "axios";


async function GetMuxVideosApi()
{
    try {
        let response=await axios.get(`https://strapi.payppy.app/api/mux-video-uploader/mux-asset?populate=*`);

        return response.data;
    } catch (error) {
        console.log(error);
        
    }
}

export default GetMuxVideosApi;