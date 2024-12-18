"use client";
import React, { useEffect, useState } from "react";
import "@/Styles/policies/policies.css";
import { useRouter } from "next/navigation";

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


const ShippingReturnRefundSection = () => {

  const router = useRouter();

  let [richText, setRichText] = useState([]);

  function fetchData() {
    PoliciesApi("Shipping, Return and Refund Policy")
      .then((response) => {
        setRichText(response.policy_text);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleBack = ()=>{
    router.back();
  }

  return (
    <>
      <article className={"overflow-scroll scroll-smooth max-w-[52.7vh] h-screen min-w-[200px] min-h-[200px] mx-auto border-r-[0.5px] border-l-[0.5px] custom-border-grey950 " + plus_jakarta_sans.className}>

        {/* page close button */}
        <PageCloseButton  />

        <main className="gap-8 mx-6 mt-5 mb-16 flex flex-col scroll-smooth">

          <h1 className=" heading-h1 custom-text-grey900 capitalize ">
            Shipping, Return & Refund Policy
          </h1>

          {/* rich text */}
          <section className={"policies " + plus_jakarta_sans.className}>
            <BlocksRenderer content={richText} />
          </section>
        </main>
      </article>
    </>
  );
};

export default ShippingReturnRefundSection;
