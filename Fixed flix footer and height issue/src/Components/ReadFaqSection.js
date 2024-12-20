import React from "react";
import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";

//fonts
const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

const ReadFaqSection = () => {
  return (
    <section className={" gap-3 my-10 flex flex-col justify-center items-center " + plus_jakarta_sans.className } >
      
      <p className="body-sm font-normal custom-text-grey900 "> Have any doubts?</p>

      <Link href="/my-account/help-and-faq" className="background-custom-grey50 border-[0.5px] custom-border-grey800 all-caps-10-bold custom-text-grey900 py-3 px-6 ">
        Read FAQS
      </Link>
      
    </section>
  );
};

export default ReadFaqSection;
