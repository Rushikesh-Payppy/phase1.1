"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";


// Dark Mode
// bright icons
import leftChevron from "@/Images/flix/leftChevron.svg";
import bookmark from "@/Images/flix/bookmark.svg";
import like from "@/Images/flix/thumbs-up.svg";
import share from "@/Images/flix/share.svg";

// active bright icons 
import activeBookmark from '@/Images/flix/bookmarkActive.svg';
import activeLike from '@/Images/flix/likeActive.svg';

// dark icons
import leftChevronDark from "@/Images/flix/chevronLeftDark.svg";
import bookmarkDark from "@/Images/flix/bookmarkDark.svg";
import likeDark from "@/Images/flix/likeDark.svg";
import shareDark from "@/Images/flix/shareDark.svg";

// active dark icons
import activDarkBookmark from '@/Images/flix/bookmarkActiveDark.svg';
import activeDarkLike from '@/Images/flix/likeActiveDark.svg';
import FlixShareButton from "./FlixShareButton";
import { useRouter } from "next/navigation";


const FlixFooter = ({ positionValue = "fixed", backOption = "/",gradient, setModalVisible, mode, title, url }) => {

  const [isBookmarkActive, setBookmarkActive] = useState(false);
  const [isLikeActive, setLikeActive] = useState(false);
  // const [isGradient, setIsGradient] = useState(false);
  const router = useRouter();

  const isLightMode = mode === "light";

  const handleLike = () => {
    setLikeActive(prevState => !prevState);
  }

  const handleBookmark = () => {
    setBookmarkActive(prevState => !prevState);
  }

  const footerGradientClass = isLightMode ? "background-custom-grey50" : "flix-footer-dark-fradient";
  const footerBorderClass = isLightMode ? "small-border custom-border-grey800" : "footer-border-dark";

  const handleBack = () => {
    if(setModalVisible)
    {
      setModalVisible(false);
    }
    else{
      router.push('/');
    }
  }

  return (

    <footer className={`${positionValue} bottom-0 ${gradient? "bg-flix-blog-footer-gradient":""}  w-full h-24 `}>

      {/* Back Button */}

      <button onClick={handleBack} className={`absolute left-1/2 transform -translate-x-1/2  -ml-[120px] border flex items-center justify-center gap-8 ${footerGradientClass} ${footerBorderClass} p-3 rounded-[90px]`}>
        <Image src={isLightMode ? leftChevronDark : leftChevron} width={24} height={24} alt="img" quality={100} />
      </button>

      {/* mt-16 */}
      <div className={`flex justify-center items-center `}>

        {/* Action Buttons */}
        <section className={`flex gap-6 px-5 py-3 ${footerGradientClass} ${footerBorderClass} rounded-[90px]`} >
          <button aria-label="Bookmark" onClick={handleBookmark} type="button" >
            <Image src={isLightMode ? isBookmarkActive ? activDarkBookmark : bookmarkDark : isBookmarkActive ? activeBookmark : bookmark}
              width={24} height={24} alt="Bookmark" quality={100} />
          </button>

          <button aria-label="Like" onClick={handleLike} type="button" >
            <Image src={isLightMode ? isLikeActive ? activeDarkLike : likeDark : isLikeActive ? activeLike : like}
              width={24} height={24} alt="Like" quality={100} />
          </button>

          {/* <button aria-label="Share" type="button" >
            <Image src={isLightMode ? shareDark : share}  width={24} height={24} alt="Share" quality={100} />
          </button> */}

          <FlixShareButton title={title} url={url} isLightMode={isLightMode} />

        </section>
      </div>

    </footer>
  );
};

export default FlixFooter;