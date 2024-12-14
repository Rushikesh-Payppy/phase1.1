import React from "react";
import { Accordion, AccordionContent, AccordionItem } from "@/Components/ui/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";

import { Plus_Jakarta_Sans } from "next/font/google";

const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

const AccordionComponent = ({ items }) => {
  return (
    <div className="">
      <Accordion type="single" collapsible className="w-full">
        {items.map((item) => (
          <AccordionItem className={`pb-2 ${plus_jakarta_sans.className} border-none `} value={item.id} key={item.id} >
            <AccordionPrimitive.Header className="flex">
              <AccordionPrimitive.Trigger className="heading-h5  custom-text-grey800 flex flex-1 items-center justify-between py-4 text-left transition-all [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0 [&[data-state=open]>svg]:rotate-180">
                {item.title}
                <Plus className="shrink-0 opacity-100 ml-4 transition-transform duration-200 " size={16} strokeWidth={2} aria-hidden="true" />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionContent className="pb-2 body-sm font-normal custom-text-grey900 border-none">
              {/* Add border-none here to ensure no borders */}
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default AccordionComponent;
