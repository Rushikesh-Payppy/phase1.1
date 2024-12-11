'use client';
import React, { useState } from "react";
import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";

// Fonts
const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

// Components
import PageCloseButton from "@/Components/PageCloseButton";
import AccordionComponent from '@/Components/AccordionComponent';

const accordionData = {
  account: {
    noOfItems: 2,
    items: [
      {
        heading: "How can I create an account on the Payppy App?",
        para: (
          <>
            To create an account on the Payppy App, simply log onto{" "}
            <Link href="https://payppy.app/" className="underline">
              www.payppy.app
            </Link>{" "}
            and follow the registration prompts to set up your account with your email address or phone number.
          </>
        ),
      },
      {
        heading: "Is my personal information secure when creating an account?",
        para: "Yes, we take data security seriously. Your personal information is encrypted and protected according to industry standards.",
      },
    ],
  },
  orders: {
    noOfItems: 3,
    items: [
      {
        heading: "How can I track my order on the Payppy App?",
        para: "Find your tracking ID on the ‘Track Orders’ section of my account page. We’ll also keep you updated via WhatsApp and SMS whenever possible.",
      },
      {
        heading: "Can I modify or cancel my order after it has been placed?",
        para: "Yes, you can modify or cancel your order within 24 hours of placing it. Simply go to your ‘recent orders’ under my account page and cancel your order.",
      },
      {
        heading: "What should I do if I receive the wrong item or my order is incomplete?",
        para: (
          <>
            If you receive the wrong item or your order is incomplete, please contact our customer support team via email at{" "}
            <Link href="mailto:support@payppy.app" className="underline">
              support@payppy.app
            </Link>{" "}
            immediately for assistance in resolving the issue.
          </>
        ),
      },
    ],
  },
  payments: {
    noOfItems: 2,
    items: [
      {
        heading: "What payment methods are accepted on the Payppy App?",
        para: "The Payppy App accepts various payment methods including credit/debit cards, mobile wallets, UPI, and Payppy Wallet balance if applicable.",
      },
      {
        heading: "Is my payment information secure when making a purchase?",
        para: "Yes, your payment information is securely processed using encryption and other security measures taken care of by Razorpay, protecting your financial data.",
      },
    ],
  },
  delivery: {
    noOfItems: 3,
    items: [
      {
        heading: "How long does it take for orders to be delivered?",
        para: "Delivery times may vary depending on your location. Generally, it is 3-6 business days.",
      },
      {
        heading: "Can I choose the delivery method for my order?",
        para: "No, currently you cannot choose delivery options. You will be eligible for the standard delivery method.",
      },
      {
        heading: "What happens if my order is delayed or lost during delivery?",
        para: (
          <>
            In the event of a delayed or lost delivery, please contact us at{" "}
            <Link href="mailto:support@payppy.app" className="underline">
              support@payppy.app
            </Link>{" "}
            for assistance in tracking the package or arranging a replacement or refund.
          </>
        ),
      },
    ],
  },
  returns: {
    noOfItems: 2,
    items: [
      {
        heading: "What is the return policy for items purchased on the Payppy App?",
        para: (
          <>
            Please refer to{" "}
            <Link href="/my-account/legal-policies-and-more/shipping-return-refund" className="underline">
              Payppy’s return policy
            </Link>{" "}
            listed on the product page.
          </>
        ),
      },
      {
        heading: "How do I initiate a return for an item?",
        para: "Go to the my account page, select the return order link, select the appropriate reason for returning the product, and submit the request. You’ll be notified via email/SMS/WhatsApp once the return is generated.",
      },
    ],
  },
  productAndStock: {
    noOfItems: 1,
    items: [
      {
        heading: "How do I search for products on the Payppy App?",
        para: "We have a dedicated tab to search any product for your convenience. The tab also provides categories and menus to choose from and shop.",
      },
    ],
  },
  wallet: {
    noOfItems: 3,
    items: [
      {
        heading: "How does the wallet feature work on the Payppy App?",
        para: "The wallet feature allows you to store funds within your Payppy account for faster and easier transactions. Your refunded money also gets stored in the wallet.",
      },
      {
        heading: "Can I transfer funds from my wallet to my bank account?",
        para: "Yes, you can transfer funds from your Payppy wallet to your linked bank account.",
      },
      {
        heading: "Are there any fees associated with using the wallet for transactions?",
        para: (
          <>
            Fees, if applicable, will be specified in our terms of service. Please refer to the{" "}
            <Link href="/my-account/legal-policies-and-more/terms-of-use" className="underline">
              terms of service
            </Link>{" "}
            for more information on fees associated with using the wallet feature.
          </>
        ),
      },
    ],
  },
};

const HelpAndFAQSection = () => {
  const [activeAccordion, setActiveAccordion] = useState("account");

  const handleClick = (accordionId) => {
    setActiveAccordion(accordionId);
  };

  return (
    <article className={`max-w-[52.7vh] h-screen min-w-[200px] min-h-[200px] mx-auto border-r-[0.5px] border-l-[0.5px] custom-border-grey950 ${plus_jakarta_sans.className}`}>
      <header>
        {/* Close button */}
        <PageCloseButton />

        <h4 className="heading-4 font-semibold custom-text-grey900 pl-4 mt-5">
          Help & FAQs
        </h4>

        {/* Options navbar */}
        <nav className="faqNav overflow-scrollbar-hidden gap-6 mt-5 pt-5 px-4 border-b-[0.5px] custom-border-grey800 flex flex-row overflow-x-scroll scroll-smooth  overflow-y-hidden text-nowrap">
          {Object.keys(accordionData).map((key) => (
            <button key={key} onClick={() => handleClick(key)}  type="button"
            className={`gap-2.5 pb-4 all-caps-10 font-medium custom-text-grey900 ${activeAccordion === key ? " border-b-2 border-[#3D3E40] font-semibold" : "" }`}>
              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}
            </button>
          ))}
        </nav>
      </header>

      <main className="gap-10">
        <section className="border-t-[0.5px] custom-border-grey400 p-4 flex flex-col">
          <AccordionComponent
            noOfItems={accordionData[activeAccordion].noOfItems}
            ac1Heading={accordionData[activeAccordion].items[0].heading}
            ac1para={accordionData[activeAccordion].items[0].para}
            ac2Heading={accordionData[activeAccordion].items[1]?.heading}
            ac2para={accordionData[activeAccordion].items[1]?.para}
            ac3Heading={accordionData[activeAccordion].items[2]?.heading}
            ac3para={accordionData[activeAccordion].items[2]?.para}
          />
        </section>

        {/* Contact us section */}
        <section className="gap-3 mt-10 flex flex-col justify-center items-center">
          <p className="body-sm font-normal custom-text-grey900">Still have any doubts?</p>
          <Link href="mailto:support@payppy.app" className="border-[0.5px] custom-border-grey800 all-caps-10-bold custom-text-grey900 py-3 px-6">
            Contact Us
          </Link>
        </section>

      </main>

    </article>
  );
};

export default HelpAndFAQSection;


// const options = ["account","orders","payments","delivery","returns","product and stock","wallet"];

const account = [
  {
  question1: "How can I create an account on the Payppy App?",
  answer1: (
    <>
      To create an account on the Payppy App, simply log onto{" "}
      <Link href="https://payppy.app/" className="underline">
        www.payppy.app
      </Link>{" "}
      and follow the registration prompts to set up your account with your email
      address or phone number.
    </>
  )
},

{
  question2: "Is my personal information secure when creating an account?",
  answer2: "Yes, we take data security seriously. Your personal information is encrypted and protected according to industry standards.",
}
];

const orders = [
  {
    question1: "How can I track my order on the Payppy App?",
    answer1: "Find your tracking ID on the ‘Track Orders’ section of my account page. We’ll also keep you updated via WhatsApp and SMS whenever possible."
  },
  {
    question2: "Can I modify or cancel my order after it has been placed?",
    answer2: "Yes, you can modify or cancel your order within 24 hours of placing it. Simply go to your ‘recent orders’ under my account page and cancel your order."
  },
  {
    question3: "What should I do if I receive the wrong item or my order is incomplete?",
    answer3: (
      <>
        If you receive the wrong item or your order is incomplete, please contact our customer support team via email at{" "}
        <Link href="mailto:support@payppy.app" className="underline">
          support@payppy.app
        </Link>{" "}
        immediately for assistance in resolving the issue.
      </>
    )
  },
];


  const payments = [
    {
      question1: "What payment methods are accepted on the Payppy App?",
      answer1: "The Payppy App accepts various payment methods including credit/debit cards, mobile wallets, UPI, and Payppy Wallet balance if applicable.",
    },
    {
      question2: "Is my payment information secure when making a purchase?",
      answer2: "Yes, your payment information is securely processed using encryption and other security measures taken care of by Razorpay, protecting your financial data.",
    },
  ];





// 'use client';
// import Image from 'next/image';

// import Arrow from '@/Images/Icons/plus-icon.svg';
// import { useState } from 'react';
// import Link from 'next/link';

// function FAQ() {
//   let [accordionIndex, setAccorrdionIndex] = useState(-1);

//   const FAQData = [
//     {question: "How can I create an account on the Payppy App?",
//     answer: (
//       <>
//         To create an account on the Payppy App, simply log onto{" "}
//         <Link href="https://payppy.app/" className="underline">
//           www.payppy.app
//         </Link>{" "}
//         and follow the registration prompts to set up your account with your
//         email address or phone number.
//       </>
//     ),}
//   ]

//   function handleAccordionClick(index) {
//     if (index == accordionIndex) {
//       setAccorrdionIndex(-1);
//       return;
//     }
//     setAccorrdionIndex(index);

//   }
//   return (
//     <>

//       <section className="pt-10 pb-20 px-4 sm:px-10 sm::py-20 background-custom-grey50 flex flex-col items-center gap-5 sm:gap-10">
//         <h2 className="font-medium common-h2-heading custom-text-black">FAQ</h2>

//         <div className="background-custom-white rounded-3xl border custom-border-grey200 max-w-4xl w-full">
//           {FAQData.length > 0 && FAQData.map((element, index) => {
//             return <div key={index} className={`payglocal-faq-container p-6 sm:p-8 custom-border-grey200 ${index != FAQData.length - 1 ? ' border-b ' : ''} flex flex-col gap-2 sm:gap-3 cursor-pointer`} onClick={() => { handleAccordionClick(index) }}>
//               <div className="flex gap-4 items-center justify-between">
//                 <h6 className="common-h6-heading custom-text-black font-medium">{element.question}</h6>
//                 <Image src={Arrow} width={32} height={32} quality={100} alt='img' className={` duration-300 ${accordionIndex == index ? ' rotate-180 ' : ''}`} />
//               </div>
//               <p className={`common-body1-text custom-text-grey600 font-medium duration-300 ${accordionIndex == index ? ' overflow-auto accordion-answer-visible ' : ' overflow-hidden max-h-0'}`}>{element.answer}</p>
//             </div>
//           })}

//         </div>

//       </section>

//     </>
//   )
// }
// export default FAQ;