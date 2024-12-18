"use client";
import { RWebShare } from "react-web-share";
import Image from "next/image";

// Icons
import ShareLight from "@/Images/Icons/share-light.svg";
import ShareDark from "@/Images/Icons/share-dark.svg";

const FlixShareButton = ({ title, url,isLightMode }) => {
  return (
    <RWebShare
      data={{
        title: title,
        url: url,
           // text: text,
      }}
    >
      <button type="button">
        <Image  src={isLightMode ? ShareDark : ShareLight} width={24} height={24} alt="Share" quality={100} />
      </button>
    </RWebShare>
  );
};

export default FlixShareButton;

