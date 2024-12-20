"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

//components
import FlixShareButton from "./FlixShareButton";
import NotificationDemo, { showToast} from "./Toaster";

//icons
import ArrowLeft from '@/Images/Icons/arrow-left.svg';
import BookmarkLight from "@/Images/Icons/bookmark-light.svg";
import LikeLight from "@/Images/Icons/like-light.svg";

// active light icons for dark footer
import ActiveBookmarkLight from '@/Images/Icons/bookmark-active-light.svg';
import ActiveLikeLight from '@/Images/Icons/like-active-light.svg';

//logo
import HotAndCoolLogo from '@/Images/Icons/hot-and-cool-logo.png';


//API
import GetAccessTokenAPI from "@/apis/auth/GetAccessToken";
import FlixBlogSaveApi from "@/apis/flix/FlixBlogSaveApi";
import FlixBlogLikeApi from "@/apis/flix/FlixBlogLikeApi";
import FlixBlogFetchLikeAndSave from "@/apis/flix/FlixBlogFetchLikeAndSave";
// import FlixBlogGetLikesApi from "@/apis/flix/FlixBlogGetLikesApi";


const FlixFooter = ({ positionValue, isLogo = false, setModalVisible, title, url,id }) => {

  const [isBookmarkActive, setIsBookmarkActive] = useState(false);
  const [isLikeActive, setIsLikeActive] = useState(false);

  const router = useRouter();

  let [accessToken, setAccessToken] = useState(''); // let[gettingAccessToken,setGettingAccessToken]=useState(true);

  useEffect(() => {
    getAccessToken();
  }, [])

  // for fecth likes and save
  useEffect(() => {
    if (accessToken) {
      fetchLikedAndSavedBlogs(id, accessToken);
    }
  }, [accessToken]);

  // getting access token
  function getAccessToken() {
    GetAccessTokenAPI()
      .then((response) => {
        // console.log(response);
        // if (response && 'message' in response && response.message === 'Refresh token is missing!') {
        //   window.location.href = '/auth/user-auth';
        // }
        if (response && 'access_token' in response) {
          setAccessToken(response.access_token);
        }

      })
      .catch(() => {

      })
  }
  if (!accessToken) {
    return (<></>)
  }

  //fetch like and saved 
  async function fetchLikedAndSavedBlogs(id, accessToken) {
    try {
      const response = await FlixBlogFetchLikeAndSave(accessToken);
      // console.log(response, "response");

      // Find the specific content by ID
      const result = response.liked_and_saved_videos.find(
        (item) => item.content_id === id
      );

      if (result) {
        console.log("item.liked:", result.liked, "item.saved:", result.saved);

        // Update states based on the response
        setIsLikeActive(result.liked);
        console.log("activelike", isLikeActive);
        setIsBookmarkActive(result.saved);
        console.log("activebookmark", isBookmarkActive);
      } else {
        console.log("No item found with the given id:", id);
      }
    } catch (error) {
      console.error("Error fetching liked and saved blogs:", error);
    }
  }

  // save blog api call
  function saveFlixBlog() {

    if (!accessToken) {
      router.push('/auth/user-auth');
    }

    let obj = {
      'content_id': id,
      "saved": !isBookmarkActive,
    }

    FlixBlogSaveApi(obj, accessToken)
      .then((response) => {
        console.log("response",response);
        if (response) {
          const isSaved = response.saved;
          isSaved? setIsBookmarkActive(true):setIsBookmarkActive(false);
          const toastMessage = response.saved ? "Added to Saved Flix" : "Removed from Saved";
          NotificationDemo(toastMessage,isSaved); // Show toast with the appropriate message
          fetchLikedAndSavedBlogs(id,accessToken);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // const handleBookmark = () => {
  //   console.log("handle bookmark executed");
  //   setIsBookmarkActive(!isBookmarkActive);
  //   const toastMessage = isBookmarkActive ? "Added to Saved Flix" : "Removed from Saved";
  //   NotificationDemo(toastMessage, isBookmarkActive);
  //   console.log("toastMessage", toastMessage);
  //   console.log("isbookmark active", isBookmarkActive);
  //   // console.log("bookmar",isBookmarkActive)


  //   if (accessToken) {
  //     // saveFlixBlog(toastMessage);
  //     setIsBookmarkActive(!isBookmarkActive);
  //   }

  //   // if(!accessToken){
  //   //   router.push('/auth/user-auth');
  //   // }
  //   console.log("handle bookmark ends");
  // };


  // like blog api call
  function likeFlixBlog() {

    if (!accessToken) {
      router.push('/auth/user-auth');
    }

    let obj = {
      'content_id': id,
      "liked": !isLikeActive,
    }

    FlixBlogLikeApi(obj, accessToken)
      .then((response) => {
        console.log("response", response);
        if (response) {
          const isLiked = response.liked;
          isLiked ? setIsLikeActive(true) : setIsLikeActive(false);
          const toastMessage = response.liked ? "Liked" : "Unliked";
          NotificationDemo(toastMessage, isLiked); // Show toast with the appropriate message
          fetchLikedAndSavedBlogs(id, accessToken);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // const handleLike = () => {
  //   setIsLikeActive(!isLikeActive);
  //   const toastMessage = isLikeActive ? "Liked" : "Unliked";
  //   NotificationDemo(toastMessage, isLikeActive);

  //   if (accessToken) {
  //     likeFlixBlog(toastMessage);
  //     setIsLikeActive(!isLikeActive)
  //   }

  //   // if(!accessToken){
  //   //   router.push('/auth/user-auth');
  //   // }
  // }

  const handleBack = () => {
    if (setModalVisible) {
      setModalVisible("animate-slide-out");
      setTimeout(() => {
        setModalVisible(false); // Hide the modal
      }, 1300);
      return;
    }
    router.push("/");
  };

  return (

    <footer className={`${positionValue} bottom-0 pb-10 w-full `}>

      {/* Back Button */}
      <button onClick={handleBack} type="button" className={`absolute z-[1] left-1/2 transform -translate-x-1/2 -ml-[120px] flex items-center justify-center gap-8 p-3 rounded-[90px] cursor-pointer flix-footer-dark-fradient footer-border-dark `}>
        <Image src={ArrowLeft} width={24} height={24} alt="img" quality={100} />
      </button>


      {/* Action Buttons */}
      <div className={`relative flex justify-center items-center`}>

        <section className={`flex gap-6 px-5 py-3 rounded-[90px] flix-footer-dark-fradient footer-border-dark`} >

          <button aria-label="Bookmark" onClick={saveFlixBlog} type="button" >
            <Image src={isBookmarkActive ? ActiveBookmarkLight : BookmarkLight}
              width={24} height={24} alt="Bookmark" quality={100} />
          </button>

          <button aria-label="Like" onClick={likeFlixBlog} type="button" >
            <Image src={isLikeActive ? ActiveLikeLight : LikeLight}
              width={24} height={24} alt="Like" quality={100} />
          </button>

          <FlixShareButton title={title} url={url} />

        </section>

        {/* hot and cool Logo */}
        {isLogo && <Image src={HotAndCoolLogo} width={53} height={40} alt="hot&cool" quality={100} className="absolute z-10 left-1/2 transform translate-x-1/2 ml-16" />}

      </div>

    </footer>
  );
};

export default FlixFooter;

