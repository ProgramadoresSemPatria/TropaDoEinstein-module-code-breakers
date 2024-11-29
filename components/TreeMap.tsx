"use client";
import React from "react";
import Tree from "react-d3-tree";
import { useCenteredTree } from "../utils/TreeMapHelpers";
import { useTreemapContext } from "@/contexts/TreemapContext";
import { useIsModalOpenContext } from "@/contexts/IsModalOpenContext";

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
  foreignObjectProps,
  onClickNode,
}) => (
  <g>
    <circle r={5}></circle>
    <foreignObject {...foreignObjectProps}>
      <div
        style={{
          width: "200px",
          height: "62px",
          padding: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid transparent",
          borderRadius: "5px",
          backgroundColor: "var(--purpleLogo)",
          transition: "transform 0.2s, box-shadow 0.2s",
          cursor: "pointer",
        }}
        // Efeito de hover
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "var(--customPurpleBtn)";
          e.currentTarget.style.transition =
            "background-color 0.5s ease-in-out";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "var(--purpleLogo)";
          e.currentTarget.style.transition =
            "background-color 0.5s ease-in-out";
        }}
        // Evento de clique
        onClick={() => onClickNode(nodeDatum)}
      >
        <h3 style={{ textAlign: "center" }}>{nodeDatum.name}</h3>
      </div>
    </foreignObject>
  </g>
);

export default function TreeMap() {
  const { enableResetzoom } = useTreemapContext();
  const { enableDragging } = useTreemapContext();
  const { setIsPrincipalModalSectionOpen } = useIsModalOpenContext();
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

  const handleNodeClick = (node) => {
    setIsPrincipalModalSectionOpen(true);
  };

  return (
    <div
      ref={containerRef}
      className="w-[100vw] h-[100vh] lg:w-[76vw] text-white p-5"
    >
      <Tree
        data={orgChart}
        translate={{ x, y }}
        nodeSize={nodeSize}
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
        pathClassFunc={() => "custom-node-link"}
        draggable={enableDragging}
        renderCustomNodeElement={(rd3tProps) =>
          renderForeignObjectNode({
            ...rd3tProps,
            foreignObjectProps,
            onClickNode: handleNodeClick,
          })
        }
        orientation="vertical"
        // Spread condicional para passar o zoom apenas se enableZoom for true
        {...(enableResetzoom && { zoom: 0.9999 })}
      />
    </div>
  );
}
