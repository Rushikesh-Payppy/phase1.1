"use client";
import React, { useState } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import Image from "next/image";

// fonts
const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

// icons
import PlusIcon from "@/Images/Icons/plus-icon.svg";
import MinusIcon from "@/Images/Icons/minus-icon.svg";

const AccordionComponent = ({ noOfItems, ac1Heading, ac1para, ac2Heading, ac2para, ac3Heading, ac3para }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={`flex flex-col w-full ${plus_jakarta_sans.className}`}>
      
      {/* Accordion item 1 */}
      {noOfItems >= 1 && (
        <div className="flex flex-col py-4 justify-between">
          <div className="flex justify-between">
            <button onClick={() => toggleAccordion(0)} className="font-medium text-left text-gray-900">
              <h5 className="heading-h5 custom-text-grey800 mr-4">{ac1Heading}</h5>
            </button>
            <Image className="ml-auto" src={activeIndex === 0 ? MinusIcon : PlusIcon} width={24} height={24} alt="icon" quality={100}/>
          </div>

          {activeIndex === 0 && (
            <div className="prose prose-sm sm:prose prose-base py-4">
              <p className="font-normal body-sm custom-text-grey900">{ac1para}</p>
            </div>
          )}
        </div>
      )}

      {/* Accordion item 2 */}
      {noOfItems >= 2 && (
        <div className="flex flex-col py-4 justify-between">
          <div className="flex justify-between">
            <button onClick={() => toggleAccordion(1)} className="font-medium text-left text-gray-900">
              <h5 className="heading-h5 custom-text-grey800 mr-4">{ac2Heading}</h5>
            </button>
            <Image className="ml-auto" src={activeIndex === 1 ? MinusIcon : PlusIcon} width={24} height={24} alt="icon" quality={100} />
          </div>

          {activeIndex === 1 && (
            <div className="prose prose-sm sm:prose prose-base py-4">
              <p className="font-normal body-sm custom-text-grey900">{ac2para}</p>
            </div>
          )}
        </div>
      )}

      {/* Accordion item 3 */}
      {noOfItems >= 3 && (
        <div className="flex flex-col py-4 justify-between">
          <div className="flex justify-between">
            <button onClick={() => toggleAccordion(2)} className="font-medium text-left text-gray-900">
              <h5 className="heading-h5 custom-text-grey800 mr-4">{ac3Heading}</h5>
            </button>
            <Image className="ml-auto" src={activeIndex === 2 ? MinusIcon : PlusIcon}  width={24} height={24} alt="icon" quality={100}/>
          </div>

          {activeIndex === 2 && (
            <div className="prose prose-sm sm:prose prose-base py-4">
              <p className="font-normal body-sm custom-text-grey900">{ac3para}</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default AccordionComponent;
