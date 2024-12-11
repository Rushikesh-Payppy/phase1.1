"use client";

import React, { useState } from "react";


import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/ShadCNComponent/ui/drawer";

export default function DrawerDemo() {
  const [goal, setGoal] = useState(350);

  function onClick(adjustment) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }

  return (
    <Drawer>
      <DrawerTrigger asChild >
        <button variant="outline">Open Drawer</button>
      </DrawerTrigger>
      <DrawerContent >
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <button
                className="h-8 w-8 shrink-0 rounded-full border border-gray-300 bg-white text-gray-700"
                onClick={() => onClick(-10)}
                disabled={goal <= 200}
              >
                -
              </button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                  {goal}
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  Calories/day
                </div>
              </div>
              <button
                className="h-8 w-8 shrink-0 rounded-full border border-gray-300 bg-white text-gray-700"
                onClick={() => onClick(10)}
                disabled={goal >= 400}
              >
                +
              </button>
            </div>
            <div className="mt-3 h-[120px] flex items-center justify-center">
              <span className="text-sm text-gray-600">No chart displayed</span>
            </div>
          </div>
          <DrawerFooter>
            <button className="w-full rounded bg-blue-500 px-4 py-2 text-white">
              Submit
            </button>
            <DrawerClose asChild>
              <button className="w-full rounded border border-gray-300 bg-white px-4 py-2 text-gray-700">
                Cancel
              </button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
