

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
import Checkbox from '@/Images/Icons/Checkbox-light.svg';


const FlixReelToaster = ({ isBlogSave, setIsBlogSave, ...props }) => {
  const { theme = "system" } = useTheme();

  return (

    <Sonner
      theme={theme}
      // container mx-auto max-w-screen-lg px-4
      className="toaster group z-10 sticky lg:absolute lg:mb-24 mb-24 sm:mb-0 mx-auto text-center"

      // className="toaster group z-10 absolute bottom-10 w-1/2 transform -translate-x-1/2"
      // style={{ bottom: '130px' }}
      toastOptions={{
        duration: 700, // Set the duration for the toast to be visible (in milliseconds)
        classNames: {
          toast:
            "group toast group-[.toaster]:border-[0.5px] flex justify-center border-[#FFFFFF4D] group-[.toaster]:bg-[#1A1917CC] py-3 "
            // group-[.toaster]:text-foreground group-[.toaster]: group-[.toaster]:shadow-lg group-[.toaster]: ",
        },
      }}
      {...props}
    />
  );
};

export { FlixReelToaster };

export default function showFlixReelToaster(toastMessage,isLikeActive,isBookmarkActive) {

  toast.custom((t) => (
    <div className="w-[var(--width)] bg-background-custom-flix-toaster py-2">
      <div className="gap-2">
        <div className="flex justify-center items-center grow gap-2">
          {/* {(isLikeActive || isBookmarkActive) && <Image src={Checkbox} width={16} height={16} alt="img" quality={100} />} */}
          <p className={"all-caps-12 text-center uppercase custom-text-white "+plus_jakarta_sans.className}> {toastMessage}</p>
        </div>
      </div>
    </div>
  )
  );
}