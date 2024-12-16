"use client";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

import { toast } from "sonner"
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";

//fonts
const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

//icons
import Checkbox from '@/Images/Icons/Checkbox.svg';


const Toaster = ({ isBlogSave, setIsBlogSave, ...props }) => {
  const { theme = "system" } = useTheme();

  return (

    <Sonner
      theme={theme}
      // container mx-auto max-w-screen-lg px-4
      className="toaster group z-10 absolute "
      style={{ bottom: '130px' }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:flex justify-center items-center small-border border-black py-4 ",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

export const showToast = (toastMessage, isBookmarkActive, isLikeActive) => {
  toast(
    <div className="flex py-2 " >
      {(isBookmarkActive || isLikeActive) && <Image src={Checkbox} width={16} height={16} alt="img" quality={100} />}
      <p className={"all-caps-12 uppercase pl-2 " + plus_jakarta_sans}> {toastMessage} </p>
    </div>,
  );
};

