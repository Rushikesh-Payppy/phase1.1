'use client';
import { useEffect, useState } from "react";
import '@/Styles/flix-blogs/flix-blogs.css';
import Image from "next/image";
import RichText from "./RichText";
import { useRouter } from "next/navigation";
import { Noto_Serif, Plus_Jakarta_Sans } from "next/font/google";

//fonts
const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const noto_serif = Noto_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

//components
import InitialPageLoadingAnimation from '@/Components/InitialPageLoadingAnimation';
import FlixFooter from "@/Components/FlixFooter";


//API's
import FlixForYouBlogData from "@/apis/flix/FlixForYouBlogData";


// function Blog({ data=false, modalVisible, setModalVisible }) {
function Blog({ id = false, data = false, modalVisible, setModalVisible }) {

  let router = useRouter();
  let [response, setResponse] = useState(data || '');

  function getBlogData() {
    FlixForYouBlogData(id)
      .then((data) => {
        setResponse(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {

    if (!data) {
      getBlogData();

    }

  }, []);


  useEffect(() => {
    // console.log(response);

  }, [response]);

 
  //base URL
  let baseUrl = "https://strapi.payppy.app";

  function getCoverImgUrl(data) {
    const imgName = data?.FeaturedImageOrVideo?.formats?.large?.url || data?.FeaturedImageOrVideo?.formats?.medium?.url || data?.FeaturedImageOrVideo?.formats?.small?.url || data?.FeaturedImageOrVideo?.formats?.thumbnail.url;
    return (imgName ? (baseUrl + imgName) : "");
  }

  function gerFormattedPublishedDate(dateString) {

    const date = new Date(dateString);

    // Extract day, month, and year
    const day = date.getDate(); // Day of the month (1-31)
    const month = date.toLocaleString('en-US', { month: 'short' }); // Short month name
    const year = String(date.getFullYear()).slice(-2); // Last 2 digits of the year

    // Combine into the desired format
    return `${day} ${month} ${year}`;
  }

  // const handleBack = () => {
  //   setModalVisible(false);
  // }

  const url = `/flix-blogs/${data?.documentId || response?.documentId}`;
  const title = data?.Title || response?.Title;

  return (
    <>
      {!response ? (
        <InitialPageLoadingAnimation />
      ) : (
        <>
          <article className={`max-w-[52.7vh] h-[100dvh] overflow-y-scroll overflow-x-hidden overflow-scrollbar-hidden ${modalVisible === 'animate-slide-out' ? 'animate-slide-out z-[1] absolute top-0 h-[100dvh]' : modalVisible ? 'fixed top-0 z-[1] overflow-y-scroll overflow-x-hidden h-[100dvh] max-w-[52.7vh] animate-slide-in' : ' hidden -z-[1] top-[100%] overflow-hidden max-h-0 '} ${id ? ' for-flixBlock overflow-y-scroll z-auto h-[100dvh] ' : ''}`}>
          {/* <article className={`max-w-[52.7vh] h-[100dvh] overflow-y-scroll overflow-scrollbar-hidden ${modalVisible === 'animate-slide-out' ? 'animate-slide-out z-10 block absolute top-0 h-[100dvh]' : modalVisible ? 'absolute top-0 z-10 overflow-y-scroll h-[100dvh] animate-slide-in' : 'hidden -z-[1] top-[100%] overflow-hidden max-h-0 '} ${id ? ' for-flixBlock overflow-y-scroll z-auto ' : ''}`}> */}
          {/* -mt-[50px] add in main tag when top back button is used */}
          <div className="background-custom-grey50 small-border-left small-border-right custom-border-grey800 scroll-smooth ">
            {/* blog Rich feature image */}
            <Image src={getCoverImgUrl(response)} alt="img" height={500} width={500} quality={100} className="w-full h-auto aspect-square object-cover" />
            <div className="flex flex-col gap-5 px-6 pt-7 pb-9 ">
              {/* blog title & publish details */}
              <section className=" gap-3">
                <section className={" gap-2 py-[1px] flex flex-row items-center uppercase font-medium all-caps-10 custom-text-grey600 " + plus_jakarta_sans.className} >
                  <p>{response?.BlogReadingminutes} min read</p>
                  <p className="border-l pl-2 custom-border-grey300 ">
                    Published on: {gerFormattedPublishedDate(response?.publishedAt)}
                  </p>
                </section>

                <h1 className={"heading-h1 tracking-tight !font-normal custom-text-grey900 mt-3 " + noto_serif.className}>
                  {response?.Title}
                </h1>
              </section>

              <RichText data={response?.BlogDescription || []} />

              {/* categories at bottom */}
              <section className={"flex flex-wrap  gap-4 items-center custom-text-grey900 " + plus_jakarta_sans.className}>
                {response?.Category?.length > 0 && response?.Category?.split(',').map((element, index) => {
                  return <div key={index} className="gap-2 py-2.5 px-4 background-custom-grey50 text-center border-[0.5px] custom-border-grey900 rounded-full ">
                    #{element}
                  </div>
                })}
              </section>

            </div>

            {/* footer */}
            <FlixFooter url={url} title={title} positionValue="sticky" setModalVisible={setModalVisible} id={data?.documentId || response?.documentId} />
            
          </div>
        </article>

    </>
  )
}
    </>
  );
}

export default Blog;

