"use client";
import React from "react";
import { Modal, Box, Typography } from "@mui/material";
import { useWhatsThisContext } from "@/contexts/WhatsThisContext";
import CustomButton from "./CustomButton";

export default function WhatsThisSection() {
  
  const { isWhatsThisOpen, setWhatsThisOpen } = useWhatsThisContext();

  return (
    <Modal open={isWhatsThisOpen} onClose={() => setWhatsThisOpen(false)}>
      <Box
        className="bg-background text-white rounded-lg shadow-lg w-full max-w-md mx-auto mt-20 p-6 flex flex-col gap-4"
        sx={{
          outline: "none",
        }}
      >
        <Typography variant="h6" className="font-bold ">
          What is this?
        </Typography>

        <div className="mb-4">
          <p>
            This graph shows the recommended order to learn different algorithms
            topics.
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>
              Clicking each topic will open a list of problems for that topic.
            </li>
            <li>
              The problems list is identical to the Neetcode 150 which can be
              found in the Practice page.
            </li>
            <li>
              Get stuck? I&apos;ve created a detailed 🎥 video explanation for each
              problem.
            </li>
            <li>
              So far we have code solutions for [Python, Java, JavaScript, C++].
            </li>
          </ul>
          <p>See below for more details.</p>
        </div>

        <div className="mt-4 text-right">
          <CustomButton 
            onClick={() => setWhatsThisOpen(false)}
            bgColor={'var(--customPurpleBtn)'}
            >Close</CustomButton>
        </div>
      </Box>
    </Modal>
  );
}