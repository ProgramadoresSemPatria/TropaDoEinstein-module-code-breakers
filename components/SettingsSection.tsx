"use client";
import React, { useState } from "react";
import { Modal, Box, Button, Switch, Typography } from "@mui/material";
import { useSettingsContext } from "@/contexts/SettingsContext";
import { useTreemapContext } from "@/contexts/TreemapContext";

export default function SettingsSection() {
  const [panning, setPanning] = useState(true);
  const [zooming, setZooming] = useState(true);
  const { isSettingsOpen, setIsSettingsOpen } = useSettingsContext();
  const { enableDragging, setEnableDragging } = useTreemapContext();

  return (
    <Modal
      //className={isSettingsOpen ? "block" : "hidden"}
      open={isSettingsOpen}
      onClose={() => setIsSettingsOpen(false)}
    >
      <Box
        className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto mt-20 p-6"
        sx={{
          outline: "none",
        }}
      >
        <Typography variant="h6" className="font-bold mb-4">
          Settings
        </Typography>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Typography>Enable Dragging</Typography>
            <Switch
              checked={enableDragging}
              onChange={(e) => setEnableDragging(e.target.checked)}
            />
          </div>
          <div className="flex justify-between items-center">
            <Typography>Enable Panning</Typography>
            <Switch
              checked={panning}
              onChange={(e) => setPanning(e.target.checked)}
            />
          </div>
          <div className="flex justify-between items-center">
            <Typography>Enable Zooming</Typography>
            <Switch
              checked={zooming}
              onChange={(e) => setZooming(e.target.checked)}
            />
          </div>
        </div>
        <div className="mt-6 text-right">
          {
            <Button
              variant="contained"
              onClick={() => setIsSettingsOpen(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
            >
              Close
            </Button>
          }
        </div>
      </Box>
    </Modal>
  );
}
