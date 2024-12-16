
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
import { showToast } from "./Toaster";

// light icons for dark footer
import LeftChevronLight from "@/Images/Icons/left-chevron-light.svg";
import BookmarkLight from "@/Images/Icons/bookmark-light.svg";
import LikeLight from "@/Images/Icons/like-light.svg";

// active light icons for dark footer
import ActiveBookmarkLight from '@/Images/Icons/bookmark-active-light.svg';
import ActiveLikeLight from '@/Images/Icons/like-active-light.svg';


// dark icons for light footer
import LeftChevronDark from "@/Images/Icons/chevron-left-dark.svg";
import BookmarkDark from "@/Images/Icons/bookmark-dark.svg";
import LikeDark from "@/Images/Icons/like-dark.svg";

// active dark icons for light footer
import ActiveDarkBookmark from '@/Images/Icons/bookmark-active-dark.svg';
import ActiveDarkLike from '@/Images/Icons/like-active-dark.svg';

//API
import GetAccessTokenAPI from "@/apis/auth/GetAccessToken";
import FlixBlogSaveApi from "@/apis/flix/FlixBlogSaveApi";
import FlixBlogLikeApi from "@/apis/flix/FlixBlogLikeApi";
import FlixBlogGetLikesApi from "@/apis/flix/FlixBlogGetLikesApi";
import FlixBlogFetchLikeAndSave from "@/apis/flix/FlixBlogFetchLikeAndSave";



const FlixFooter = ({ positionValue = "fixed", backOption = "/", gradient, setModalVisible, mode, title, url, isBlogsave, setIsBlogSave, id }) => {

  const [isBookmarkActive, setBookmarkActive] = useState(false);
  const [isLikeActive, setLikeActive] = useState(false);

  let [accessToken, setAccessToken] = useState(''); // let[gettingAccessToken,setGettingAccessToken]=useState(true);

  const router = useRouter();

  const isLightMode = mode === "light";


  useEffect(() => {
    getAccessToken();
    fetchLikedAndSavedBlogs(id);
  }, [])

  //getting access token
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
    const toastMessage = isBookmarkActive ? "Added to Saved Flix" : "Removed from Saved" ;
    console.log("message", toastMessage);
    setIsBlogSave(true);
    showToast(toastMessage,isBookmarkActive);

    if (accessToken) {
      saveFlixBlog(toastMessage);
      setBookmarkActive(!isBookmarkActive);
    }
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


  const handleLike = () => {
    setLikeActive(prevState => !prevState);
    const toastMessage = isLikeActive ? "Liked" : "Unliked";
    setIsBlogSave(!isBlogsave);
    showToast(toastMessage,isLikeActive);

    if (accessToken) {
      likeFlixBlog(toastMessage);
      setLikeActive(!isLikeActive)
    }
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


  //fetch liked and saved blogs

  async function fetchLikedAndSavedBlogs(id) {
    try {
      const response = await FlixBlogFetchLikeAndSave();
      console.log(response, "response")
      const result = response.find((item) => item.content_id === id); // Use find correctly
      if (result) {
        console.log("item.liked:", result.liked);
      } else {
        console.log("No item found with the given id:", id);
      }
    } catch (error) {
      console.error("Error fetching liked and saved blogs:", error);
    }
  }

  const footerGradientClass = isLightMode ? "background-custom-grey50" : "flix-footer-dark-fradient";
  const footerBorderClass = isLightMode ? "small-border custom-border-grey800" : "footer-border-dark";

  const handleBack = () => {
    if (setModalVisible) {
      setModalVisible(false);
    }
    else {
      router.push('/');
    }
  }



  return (

    <footer className={`${positionValue} bottom-10 ${gradient ? "bg-flix-blog-footer-gradient" : ""}  w-full h-24 `}>

      {/* Back Button */}
      <button onClick={handleBack} className={`absolute left-1/2 transform -translate-x-1/2  -ml-[120px] border flex items-center justify-center gap-8 ${footerGradientClass} ${footerBorderClass} p-3 rounded-[90px]`}>
        <Image src={isLightMode ? LeftChevronDark : LeftChevronLight} width={24} height={24} alt="img" quality={100} />
      </button>


      {/* Action Buttons */}
      <div className={`flex justify-center items-center `}>

        <section className={`flex  gap-6 px-5 py-3 ${footerGradientClass} ${footerBorderClass} rounded-[90px]`} >

          <button aria-label="Bookmark" onClick={handleBookmark} type="button" >
            <Image src={isLightMode ? isBookmarkActive ? BookmarkDark :ActiveDarkBookmark : isBookmarkActive ?  BookmarkLight : ActiveBookmarkLight}
              width={24} height={24} alt="Bookmark" quality={100} />
          </button>


          <button aria-label="Like" onClick={handleLike} type="button" >
            <Image src={isLightMode ? isLikeActive ? LikeDark : ActiveDarkLike : isLikeActive ? LikeLight : ActiveLikeLight}
              width={24} height={24} alt="Like" quality={100} />
          </button>

          <FlixShareButton title={title} url={url} isLightMode={isLightMode} />

        </section>

      </div>

    </footer>
  );
};

export default FlixFooter;