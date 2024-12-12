'use client';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import ReactFlow, {
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
  Edge,
  Node,
  Connection,
} from "reactflow";
import "reactflow/dist/style.css";
import dagre from "dagre";

import { initialNodes, initialEdges } from '@/utils/graphInfo';
import { useIsModalOpenContext } from "@/contexts/IsModalOpenContext";
import ProgressBar from './ProgressBar';
import { useUserInfoContext } from '@/contexts/UserInfoContext';
import { ProgressBarInfoType, UserDataFromDBArrayType } from '@/utils/Types/types';
import { useAuthContext } from '@/contexts/AuthContext/AuthContext';


const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  const nodeWidth = 182;
  const nodeHeight = 80;

  dagreGraph.setGraph({ rankdir: "TB" });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };
  });

  return { nodes, edges };
};

interface NodeData {
  label: string;
}

export default function Graph() {

  const { userAuth } = useAuthContext();
  const { setIsPrincipalModalSectionOpen, isPrincipalModalSectionOpen } = useIsModalOpenContext();
  const { setUserTotalProblemsStatusChecked } = useUserInfoContext();
  const [progressBarInfo, setProgressBarInfo] = useState<ProgressBarInfoType[]>([{  
    nodeId: 0,
    progressBarValue: 0,
    totalStatusChecked: 0
  }]); 

  const [userGraphDataFromDatabase, setUserGraphDataFromDatabase] = useState<UserDataFromDBArrayType>([]);


  useEffect(() => {
      /* if(userAuth?.uid) {
          const fetchData = async () => { 
            const resolvedProblems = await getDataFromDB('users/' + userAuth?.uid); 
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { name, email, ...allResolvedProblemsSaved} = resolvedProblems;
            console.log("allResolvedProblemsSaved", allResolvedProblemsSaved)
            if(allResolvedProblemsSaved) {
                const data: UserDataFromDBArrayType = [];
                for(const problemInfo in allResolvedProblemsSaved) {

                  const id = (allResolvedProblemsSaved[problemInfo][0].nodeId);
                  data.push(
                    { 
                      nodeId: Number(id) || 0,
                      progressBarValue: Number(allResolvedProblemsSaved[problemInfo][0].progressBarValue) || 0,
                      totalStatusChecked: Number(allResolvedProblemsSaved[problemInfo][0].totalStatusChecked) || 0,
                      problemId: 0, //mock value
                      isStarChecked: false, //mock value
                      isStatusChecked: false, //mock value
                    }
                  )
                }
                console.log("Data", data)
                setUserGraphDataFromDatabase(data)
                
            }
          };
          fetchData();
          console.log("Buscouuuuuuuuuuu no DB")
      }
      else {
      } */
      const storageData = JSON.parse(localStorage.getItem('user-data') ?? '{}'); 
      
      
      const data: UserDataFromDBArrayType = [];
      for(const problemInfo in storageData) {

        const id = (storageData[problemInfo][0]?.nodeId);
        data.push(
          { 
            nodeId: Number(id) || 0,
            progressBarValue: Number(storageData[problemInfo][0]?.progressBarValue) || 0,
            totalStatusChecked: Number(storageData[problemInfo][0]?.totalStatusChecked) || 0,
            problemId: 0, //mock value
            isStarChecked: false, //mock value
            isStatusChecked: false, //mock value
          }
        )
      }
      setUserGraphDataFromDatabase(data)

  }, [isPrincipalModalSectionOpen.id, userAuth?.uid, isPrincipalModalSectionOpen.value]);

  useEffect(() => {
    if(!initialNodes || !userGraphDataFromDatabase) return;
    
    setProgressBarInfo([]);
    const newProgressBarInfo = initialNodes.map((node) => { 
      let progressValue: number = 0;
      let totalStatusChecked: number = 0;
      if (userAuth?.uid) { 
        const findResult = userGraphDataFromDatabase.find((item) => item.nodeId === Number(node.id));
        progressValue = Number(findResult?.progressBarValue) || 0; 
        totalStatusChecked = Number(findResult?.totalStatusChecked) || 0;  
      } 
      else { 
        const findResult = userGraphDataFromDatabase.find((item) => item.nodeId === Number(node.id));
        progressValue = Number(findResult?.progressBarValue) || 0; 
        totalStatusChecked = Number(findResult?.totalStatusChecked) || 0; 
      }

      return { 
        nodeId: Number(node.id) || 0, 
        progressBarValue: progressValue,
        totalStatusChecked: totalStatusChecked
       };
    });

    setProgressBarInfo((prevData) => [...prevData, ...newProgressBarInfo]);

  }, [initialNodes, userGraphDataFromDatabase])

  useEffect(() => {
    if(progressBarInfo) {
      const totalChecked = progressBarInfo.reduce((acc, item) => {
        return acc + item.totalStatusChecked;
      }, 0)
      setUserTotalProblemsStatusChecked(totalChecked)
    }
  }, [progressBarInfo])

  const handleNodeClick = (nodeId: string) => {
    setIsPrincipalModalSectionOpen({ value: true, id: Number(nodeId) });
  };

  // Generate initial nodes and edges with layout
  const { nodes: initialLayoutedNodes, edges: initialLayoutedEdges } = useMemo(
    () => getLayoutedElements(initialNodes, initialEdges),
    [],
  );

  // State for nodes and edges
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nodes, setNodes, onNodesChange] = useNodesState(initialLayoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialLayoutedEdges);
  
  const nodeTypes = useMemo(() => ({
    custom: ({ data, id }: { data: NodeData, id: string }) => {
     
      const hasIncoming = edges.some(edge => edge.target === id);
      const hasOutgoing = edges.some(edge => edge.source === id);

      const progressValue = progressBarInfo.find((item: ProgressBarInfoType) => item.nodeId === Number(id)) ?.progressBarValue || 0;  

      return (
        <div
          key={id}
          className={`p-4 text-white rounded-lg flex flex-col text-center text-sm h-[62px] min-w-[200px] justify-center cursor-pointer transition ease-in-out duration-300   progressValue ${progressValue === 100 ? 'bg-[#4a186b] hover:bg-[#4a186bd3]' : 'bg-purpleLogo hover:bg-customPurpleBtn'}`}
          onClick={() => handleNodeClick(id)}
        >
          { hasIncoming && (
              <Handle type="target" position={Position.Top} id="target" />
            )}
            {hasOutgoing && (
              <Handle type="source" position={Position.Bottom} id="source" />
          )}
          <strong className="pb-2">{data.label}</strong>

          <ProgressBar key={id} heightProgressBar={8} progressBarValue={Number(progressValue)}/>

        </div>
      );
    },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [edges, progressBarInfo]);

  const edgeStyles = {
    stroke: 'rgb(183, 201, 196)', 
    strokeWidth: 5,   
    smoothness: 1,
    zIndex: 10,
  };

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) => addEdge({ ...params, style: edgeStyles }, eds)),
    [setEdges]
  );

  return (
    <div className="w-[100vw] h-[calc(100vh-2.5rem)] lg:w-[76vw] text-white">
      <ReactFlow
        nodes={nodes}
        edges={edges.map(edge => ({
          ...edge,
          style: edgeStyles
        }))}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView

      >
        <Controls />
      </ReactFlow>
    </div>
  );
  
};