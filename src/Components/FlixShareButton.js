"use client";

import { RWebShare } from "react-web-share";
import Image from "next/image";

// Icons
import Share from "@/Images/flix/share.svg";
import ShareDark from "@/Images/flix/shareDark.svg";

const FlixShareButton = ({ title, url, isLightMode }) => {
  return (
    <RWebShare
      data={{
        title: title,
        url: url,
           // text: text,
      }}
    >
      <button>
        <Image  src={isLightMode ? ShareDark : Share} width={24} height={24} alt="Share" quality={100} />
      </button>
    </RWebShare>
  );
};

export default FlixShareButton;

