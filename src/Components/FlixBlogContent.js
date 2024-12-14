"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import '@/Styles/flix-blogs/flix-blogs.css';
import { useRouter } from "next/navigation";

import '@/Styles/flix-blogs/flix-blogs.css';

import { Plus_Jakarta_Sans } from "next/font/google";
//fonts
const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

//PAGE
import BlogPage from '@/app/flix-blogs/[blog]/Blog';

// icons
import ChevronLeft from '@/Images/Icons/chevron-left-dark.svg';
import ChevronRightLight from '@/Images/Icons/chevron-right-light.svg';
import HotAndCoolLogo from '@/Images/Icons/hot-and-cool-icon.svg';
import FlixFooter from "./FlixFooter";

//component
// import FlixFooter from "./FlixFooter";

//base URL
let baseUrl = "https://strapi.payppy.app";
// let baseUrl = "http://148.135.138.27:1337";


// BlogShowcase
const FlixBlogContent = ({ data }) => {

  const [modalVisible,setModalVisible] = useState(false);  //Modal (Blog Reader) state

  let router = useRouter();

  function handleReadMore() {
    // router.push("flix-blogs/" + data.documentId);
    setModalVisible(true);
  }

  const handleBack = ()=>{
    router.back();

}


function getImgUrl(data) {
  const imgName = data.CoverImage.formats?.large?.url || data.CoverImage.formats?.medium?.url ||  data.CoverImage.formats?.small?.url || data.CoverImage.formats?.thumbnail.url;
  return (imgName ? (baseUrl + imgName) : "");
}


  return (
    <>
      <article className="relative w-full h-full flex flex-col justify-end snap-start snap-always animate-scroll-up">

     {/* Blog reader Modal */}
        <BlogPage modalVisible={modalVisible} setModalVisible={setModalVisible} data={data} />

      {/* Back Button */}
      {/* <button onClick={handleBack} className={`fixed top-0 mt-6 ml-6 bg-[#FDFBF8] gap-8 p-3 border-[0.5px] border-[#3D3E40] rounded-[90px] cursor-pointer`}>
        <Image  src={ChevronLeft} width={24} height={24} alt="img" quality={100} />
      </button> */}


       {/* hot and cool Logo */}
       <Image src={HotAndCoolLogo} width={58} height={44} alt="hot&cool" quality={100} className="absolute bottom-10 right-9" />

       {/* blog cover image */}
        <Image  src={getImgUrl(data)} alt="img" width={390} height={802} quality={100} className="absolute top-0 left-0 min-w-[200px] w-full h-full object-cover -z-[1]" />
       
       {/* Blog title */}
        <section className={ "blog-title-gradient w-full h-1/2 flex justify-center items-center " + plus_jakarta_sans.className} >

        {/* href={"flix-blogs/" + data.documentId}  */}
            <Link href='#' onClick={handleReadMore} className="gap-5 mx-4 flex flex-col items-center " >
              <h1 className="heading-h1 custom-text-white text-center ">
                {data.Title}
              </h1>

              {/* Read More Link */}
              <div className=" gap-1.5 flex flex-row items-center " onClick={handleReadMore} >
                <p className="all-caps-10-bold custom-text-white uppercase ">
                  Read more
                </p>
                <Image src={ChevronRightLight} height={18} width={18} alt="Arrow Icon" quality={100} />
              </div>
            </Link>
      
        </section>

        <footer className=" flex justify-center items-center">
          <FlixFooter gradient={false} positionValue="absolute" />
        </footer>

      </article>
    </>
  );
};

export default FlixBlogContent;



// function getImgUrl(data) {
//   if (data.FeaturedImageOrVideo?.ext == "mp4") { return foryouImage0;}
//   let imgName = data.FeaturedImageOrVideo.formats?.large?.url || data.FeaturedImageOrVideo.formats?.medium?.url ||  data.FeaturedImageOrVideo.formats?.small?.url || data.FeaturedImageOrVideo.formats?.thumbnail.url;
//   return !imgName ? featureImg1 : baseUrl + imgName;
// }

// export {getImgUrl};
