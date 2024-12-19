import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";

//fonts
const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

//logos
import instagram from '@/Images/Icons/instagram-icon.svg'; 
import youtube from '@/Images/Icons/youtube-icon.svg'; 

const AccountCopyrightSection = () => {
  return (
    <>
      <section className={"gap-4 px-6 flex flex-col items-center " + plus_jakarta_sans.className}>
        <div className="gap-5 flex flex-row justify-center ">
          <Link href="https://www.youtube.com/@hotandcoolbypayppy" target="_blank">
            <Image src={youtube} width={18} height={18} alt="" quality={100} />
          </Link>

          <Link href="https://www.instagram.com/payppy.app/" target="_blank">
            <Image src={instagram} width={18} height={18} alt="" quality={100} />
          </Link>
        </div>
        <p className="!capitalize custom-text-grey700 text-center font-normal text-[0.625rem] leading-4 px-6 ">
          Copyright 2024. Payppy Technologies Private Limited. All Rights
          Reserved.
        </p>
      </section>
    </>
  );
};

export default AccountCopyrightSection;
