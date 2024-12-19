"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Plus_Jakarta_Sans } from "next/font/google";

//fonts
const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

//components
import FlixShareButton from "./FlixShareButton";
import NotificationDemo, { showToast, Toaster } from "./Toaster";

// light icons for dark footer
// import LeftChevronLight from "@/Images/Icons/left-chevron-light.svg";
import ArrowLeft from '@/Images/Icons/arrow-left.svg';
import BookmarkLight from "@/Images/Icons/bookmark-light.svg";
import LikeLight from "@/Images/Icons/like-light.svg";

// active light icons for dark footer
import ActiveBookmarkLight from '@/Images/Icons/bookmark-active-light.svg';
import ActiveLikeLight from '@/Images/Icons/like-active-light.svg';

//logo
import HotAndCoolLogo from '@/Images/Icons/hot-and-cool-icon.svg';


//API
import GetAccessTokenAPI from "@/apis/auth/GetAccessToken";
import FlixBlogSaveApi from "@/apis/flix/FlixBlogSaveApi";
import FlixBlogLikeApi from "@/apis/flix/FlixBlogLikeApi";
import FlixBlogGetLikesApi from "@/apis/flix/FlixBlogGetLikesApi";
import FlixBlogFetchLikeAndSave from "@/apis/flix/FlixBlogFetchLikeAndSave";



const FlixFooter = ({ positionValue, isLogo = false, setModalVisible, title, url, isBlogsave, setIsBlogSave, id }) => {

  const [isBookmarkActive, setBookmarkActive] = useState(false);
  const [isLikeActive, setLikeActive] = useState(false);

  const router = useRouter();

  let [accessToken, setAccessToken] = useState(''); // let[gettingAccessToken,setGettingAccessToken]=useState(true);

  // useEffect(() => {
  //   getAccessToken();
  // }, [])

  // for tecth likes and save
  useEffect(() => {
    if (accessToken) {
      fetchLikedAndSavedBlogs(id,accessToken);
    }
  }, [accessToken]);

  // getting access token
  function getAccessToken() {
    GetAccessTokenAPI()
      .then((response) => {
        console.log(response);
        if (response && 'message' in response && response.message === 'Refresh token is missing!') {
          window.location.href = '/auth/user-auth';
        }
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

  const handleBookmark = () => {

    setBookmarkActive(!isBookmarkActive);
    const toastMessage = isBookmarkActive ? "Added to Saved Flix" : "Removed from Saved";
    // NotificationDemo(toastMessage, isBookmarkActive);
    console.log("toastMessage",toastMessage);
    console.log("bookmar",isBookmarkActive)
  
  
    if (accessToken) {
      saveFlixBlog(toastMessage);
      setBookmarkActive(!isBookmarkActive);
    }

    // console.log("message", toastMessage);
    // showToast(toastMessage);

    // if(!accessToken){
    //   router.push('/auth/user-auth');
    // }
  };

  // save blog api call
  function saveFlixBlog() {

    let obj = {
      'content_id': id,
      "saved": isBookmarkActive,
    }

    FlixBlogSaveApi(obj, accessToken)
      .then((response) => {
        if (response) {
          showToast(toastMessage); // Show toast with the appropriate message

        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //fetch like and saved 
  async function fetchLikedAndSavedBlogs(id,accessToken) {
    try {
      const response = await FlixBlogFetchLikeAndSave(accessToken);
      console.log(response, "response");
  
      // Find the specific content by ID
      const result = response.liked_and_saved_videos.find(
        (item) => item.content_id === id
      );
  
      if (result) {
        console.log("item.liked:", result.liked, "item.saved:", result.saved);
  
        // Update states based on the response
        setLikeActive(result.liked);
        setBookmarkActive(result.saved);
      } else {
        console.log("No item found with the given id:", id);
      }
    } catch (error) {
      console.error("Error fetching liked and saved blogs:", error);
    }
  }
  


  const handleLike = () => {
    setLikeActive(!isLikeActive);
    const toastMessage = isLikeActive ? "Liked" : "Unliked";
    // NotificationDemo(toastMessage,isLikeActive);

    if (accessToken) {
      likeFlixBlog(toastMessage);
      setLikeActive(!isLikeActive)
    }

    //  setIsBlogSave(!isBlogsave);
    // showToast(toastMessage);

    // if(!accessToken){
    //   router.push('/auth/user-auth');
    // }
  }


  // like blog api call
  function likeFlixBlog() {

    let obj = {
      'content_id': id,
      "liked": isLikeActive,
    }

    FlixBlogLikeApi(obj, accessToken)
      .then((response) => {
        if (response) {
          showToast(toastMessage); // Show toast with the appropriate message

        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleBack = () => {
    if (setModalVisible) {
      setModalVisible('animate-slide-out');
      setTimeout(() => {
        setModalVisible(false);  // Hide the modal
      }, 1300);
      return;
    } 
      router.push('/');
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

            <button aria-label="Bookmark" onClick={handleBookmark} type="button" >
              <Image src={isBookmarkActive ? ActiveBookmarkLight : BookmarkLight}
                width={24} height={24} alt="Bookmark" quality={100} />
            </button>

            <button aria-label="Like" onClick={handleLike} type="button" >
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

