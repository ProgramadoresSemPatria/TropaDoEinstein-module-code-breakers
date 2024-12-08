"use client";
import React, { useEffect, useState } from "react";
import QuestionMarkTwoToneIcon from "@mui/icons-material/QuestionMarkTwoTone";
import ProgressBar from "./ProgressBar";
import Tooltip from "./Tooltip";
import { useUserInfoContext } from "@/contexts/UserInfoContext";

export default function AsideSection() {
  
  const { userTotalProblemsStatusChecked } = useUserInfoContext();
  const [progressBarValue, setProgressBarValue] = useState<number>(0);

  useEffect(() => {
    if(userTotalProblemsStatusChecked === 0) return;
    
    const progress = (userTotalProblemsStatusChecked / 150) * 100;
    setProgressBarValue(progress);
  }, [userTotalProblemsStatusChecked])

  return (
    <>
      <aside className="hidden lg:flex  w-[22%] h-[calc(100vh-1rem)] bg-customPurple text-white absolute top-2 bottom-2 right-2 overflow-hidden  flex-col items-center justify-between pt-5 pb-16 px-2">
        <div className="flex flex-col items-center gap-8">
          <p>Select Roadmap</p>
          <div className="w-full flex justify-center items-center">
            <button className="px-6 py-[6px] rounded-2xl hover:bg-background bg-customPurpleBtn transition ease-in-out duration-300">
              Algorithms
            </button>
            <button className="px-6 py-[6px] rounded-2xl hover:bg-background active:bg-customPurpleBtn transition ease-in-out duration-300">
              Courses
            </button>
          </div>

          <div className="w-full mt-2 flex flex-col gap-2">
            <p className="text-center">{`(${userTotalProblemsStatusChecked} / 150)`}</p>
            <ProgressBar heightProgressBar={12} progressBarValue={progressBarValue}/>
          </div>
        </div>

        <div className="w-full flex justify-center items-center">
          <Tooltip title={"What is this?"}>
            <button className="px-6 py-[6px] rounded-2xl hover:bg-background transition ease-in-out duration-300">
              <QuestionMarkTwoToneIcon />
            </button>
          </Tooltip> 
        </div>
      </aside>
    </>
  );
}
