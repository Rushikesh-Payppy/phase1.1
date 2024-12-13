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

// icons
import ChevronLeftDark from '@/Images/Icons/chevron-left-icon-dark.svg';

//components
import InitialPageLoadingAnimation from '@/Components/InitialPageLoadingAnimation';
// import FlixFooter from "@/Components/FlixFooter";
// import FooterGradient from "@/Components/FooterGradient";


//API's
import FlixForYouBlogData from "@/apis/flix/FlixForYouBlogData";


// function Blog({ data=false, modalVisible, setModalVisible }) {
function Blog({ data, modalVisible, setModalVisible }) {

  let router = useRouter();
  let [response, setReponse] = useState(data);

  function getBlogData() {
    FlixForYouBlogData(id)
      .then((data) => {
        setReponse(data.data);
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

  //base URL
  let baseUrl = "https://strapi.payppy.app";

  function getCoverImgUrl(data) {
    const imgName = data.FeaturedImageOrVideo.formats?.large?.url || data.FeaturedImageOrVideo.formats?.medium?.url || data.FeaturedImageOrVideo.formats?.small?.url || data.FeaturedImageOrVideo.formats?.thumbnail.url;
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

  const handleBack = () => {
    setModalVisible(false);
  }

  return (
    <>
      {response.length == 0 ? (
        <InitialPageLoadingAnimation />
      ) : (
        <>
          <article className={`page-center-parent-container animate-slide-in ${modalVisible ? ' absolute top-0  z-10  overflow-scroll max-h-screen h-full block' : ' hidden -z-[1] top-[100%] overflow-hidden max-h-0 '} `}>

            <main className=" background-custom-grey50 relative small-border-left small-border-right custom-border-grey800 background-custom-white scroll-smooth -mt-[50px]">

               {/* Back Button */}
               <button onClick={handleBack} className={`sticky top-6 ml-6 bg-[#FDFBF8] gap-8 p-3 border-[0.5px] border-[#3D3E40] rounded-[90px] cursor-pointer`}>
                <Image src={ChevronLeftDark} width={24} height={24} alt="img" quality={100} />
              </button>

              {/* blog Rich feature image */}
              <Image src={getCoverImgUrl(response)} alt="img" height={500} width={500} quality={100} className="w-full h-auto aspect-square object-cover" />

              <div className="flex flex-col gap-5 pb-[75px] px-6 pt-7">
                {/* blog title & publish details */}
                <section className=" gap-3">
                  <section className={" gap-2 py-[1px] flex flex-row items-center uppercase font-medium all-caps-10 custom-text-grey600 " + plus_jakarta_sans.className} >
                    <p>{response.BlogReadingminutes} min read</p>
                    <p className="border-l pl-2 custom-border-grey300 ">
                      Published on: {gerFormattedPublishedDate(response.publishedAt)}
                    </p>
                  </section>

                  <h1 className={"heading-h1 tracking-tight !font-normal custom-text-grey900 mt-3 " + noto_serif.className}>
                    {response.Title}
                  </h1>
                </section>

                <RichText data={response.BlogDescription} />

                {/* categories at bottom */}
                <section className={"flex flex-wrap gap-4 items-center custom-text-grey900 " + plus_jakarta_sans.className}>
                  {response.Category.split(',').map((element, index) => {
                    return <div className="gap-2 py-2.5 px-4 background-custom-grey50 text-center border-[0.5px] custom-border-grey900 rounded-full ">
                      #{element}
                    </div>
                  })}
                </section>
              </div>
            </main>

            {/* footer gradient */}
            {/* <FooterGradient positionValue="fixed"/> */}

            {/* footer */}
            {/* <FlixFooter positionValue="fixed" backOption="/flix/flix-blogs" mode="light" /> */}
          </article>
        </>
      )}
    </>
  );
}

export default Blog;

