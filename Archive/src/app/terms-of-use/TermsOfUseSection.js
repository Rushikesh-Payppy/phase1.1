'use client';
import React, { useEffect, useState } from "react";
import '@/Styles/policies/policies.css';
import { Plus_Jakarta_Sans } from "next/font/google";

//font
const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

//components
import PageCloseButton from "@/Components/PageCloseButton";

//API
import PoliciesApi from "@/apis/PoliciesApi";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";


const TermsOfUseSection = () => {

  let [richText, setRichText] = useState([]);

 

  function fetchData() {

    PoliciesApi('Terms of use')
      .then((response) => {
        setRichText(response.policy_text);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      <article className={"page-center-parent-container  small-border-x border-black  scroll-smooth background-custom-grey50 overflow-scroll " + plus_jakarta_sans.className} >
        
        {/* page close button */}
        <PageCloseButton href="/my-account/legal-policies-and-more" />
        
        <main className="gap-8 mx-6 mt-5 mb-16 flex flex-col scroll-smooth">

          <h1 className=" heading-h1 custom-text-grey900 capitalize ">Terms of Use</h1>

          {/* rich text */}
          <section className={"policies " + plus_jakarta_sans.className}>
            <BlocksRenderer content={richText} />
          </section>
        </main>

      </article>
    </>
  );
};

export default TermsOfUseSection;
