"use client";
import React, { useEffect } from "react";
import Tree from "react-d3-tree";
import { useCenteredTree } from "../utils/TreeMapHelpers";
import { useZoomContext } from "@/contexts/ZoomContext";

// This is a simplified example of an org chart with a depth of 2.
// Note how deeper levels are defined recursively via the `children` property.
const orgChart = {
  name: "CEO",
  children: [
    {
      name: "Manager",
      attributes: {
        department: "Production",
      },
      children: [
        {
          name: "Foreman",
          attributes: {
            department: "Fabrication",
          },
          children: [
            {
              name: "Worker",
            },
          ],
        },
        {
          name: "Foreman",
          attributes: {
            department: "Assembly",
          },
          children: [
            {
              name: "Worker",
            },
          ],
        },
      ],
    },
  ],
};

// Here we're using `renderCustomNodeElement` render a component that uses
// both SVG and HTML tags side-by-side.
// This is made possible by `foreignObject`, which wraps the HTML tags to
// allow for them to be injected into the SVG namespace.

const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
}) => (
  <g>
    <circle r={15}></circle>
    {/* `foreignObject` requires width & height to be explicitly set. */}
    <foreignObject {...foreignObjectProps}>
      <div
        style={{
          border: "1px solid transparent",
          borderRadius: "5px",
          backgroundColor: "var(--purpleLogo)",
        }}
      >
        <h3 style={{ textAlign: "center" }}>{nodeDatum.name}</h3>
        {nodeDatum.children && (
          <button
            style={{
              width: "75%",
              margin: "0 auto 1rem auto",
              display: "block",
            }}
            onClick={toggleNode}
          >
            {nodeDatum.__rd3t.collapsed ? "Expand" : "Collapse"}
          </button>
        )}
      </div>
    </foreignObject>
  </g>
);

export default function TreeMap() {

  const { enableResetzoom } = useZoomContext();
  const [translate, containerRef] = useCenteredTree() as [
    { x: number; y: number },
    (
      containerElem: {
        getBoundingClientRect: () => { width: number; height: number };
      } | null
    ) => void
  ];
  const { x, y } = translate;

  const nodeSize = { x: 200, y: 150 };
  const foreignObjectProps = {
    width: nodeSize.x,
    height: nodeSize.y,
    x: -100,
    y: -20,
  };
  return (
    <div
      ref={containerRef}
      className="w-[100vw] h-[100vh] lg:w-[76vw] text-white "
    >
      <Tree
        data={orgChart}
        translate={{ x, y }}
        nodeSize={nodeSize}
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
        // Spread condicional para passar o zoom apenas se enableZoom for true
        {...(enableResetzoom && { zoom: 0.8 })}
        pathClassFunc={() => "node__link"}
        renderCustomNodeElement={(rd3tProps) =>
          renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })
        }
        orientation="vertical"
      />
    </div>
  );
}
