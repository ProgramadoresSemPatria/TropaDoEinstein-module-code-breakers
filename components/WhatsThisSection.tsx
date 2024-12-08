"use client";
import React, { useState } from "react";
import { Modal, Box, Button, Typography } from "@mui/material";
import { useWhatsThisContext } from "@/contexts/WhatsThisContext";
import { useTreemapContext } from "@/contexts/TreemapContext";

export default function WhatsThisSection() {
  const [panning, setPanning] = useState(true);
  const [zooming, setZooming] = useState(true);
  const { isWhatsThisOpen, setWhatsThisOpen } = useWhatsThisContext();

  return (
    <Modal open={isWhatsThisOpen} onClose={() => setWhatsThisOpen(false)}>
      <Box
        className="bg-black rounded-lg shadow-lg w-full max-w-md mx-auto mt-20 p-6"
        sx={{
          outline: "none",
        }}
      >
        <Typography
          variant="h6"
          className="font-extrabold mb-10 flex justify-center align-middle text-white"
        >
          What is this?
        </Typography>

        <div className="text-gray-300 mb-4">
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
              Get stuck? I've created a detailed 🎥 video explanation for each
              problem.
            </li>
            <li>
              So far we have code solutions for [Python, Java, JavaScript, C++].
            </li>
          </ul>
          <p>See below for more details.</p>
        </div>

        <div className="mb-4">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/jgQjes7MgTM"
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        </div>

        <div className="mt-6 text-right">
          <Button
            variant="contained"
            onClick={() => setWhatsThisOpen(false)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
          >
            Close
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
