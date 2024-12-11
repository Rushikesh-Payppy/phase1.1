import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

//icons
import LeftChevron from '@/Images/Icons/chevron-left-icon-dark.svg';

const PageBackButton = () => {

    const router = useRouter();

    const handleBack = () => { 
        router.back();
    }

    return (
        <button onClick={handleBack} className="w-full gap-[71px] py-3 px-4  ">
            <Image src={LeftChevron} width={24} height={24} alt="img" quality={100} />
        </button>
    );
};

export default PageBackButton;

