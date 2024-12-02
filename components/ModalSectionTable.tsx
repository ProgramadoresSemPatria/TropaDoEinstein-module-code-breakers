'use client';
import React, { useEffect, useState } from "react";
import {
Table,
TableBody,
TableCell,
TableContainer,
TableHead,
TableRow,
Checkbox,
Paper,
} from "@mui/material";
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import Link from "next/link";

import { GraphType, ProblemType, TableDataType } from "@/utils/Types/types";
import problemsData from '@/utils/data/problems-info-table.json';
import { useNumberOfProblemsTableContext } from "@/contexts/NumberOfProblemsTableContext";
import { useIsModalOpenContext } from "@/contexts/IsModalOpenContext";

const typedProblemsData: GraphType = problemsData;
  
const ScrollableTable = () => {

    const { setNumberOfProblemsModalTable } = useNumberOfProblemsTableContext();
    const { isPrincipalModalSectionOpen, setPrincipalModalTitle } = useIsModalOpenContext();
    const [tableData, setTableData] = useState<TableDataType[]>([]);

    
    useEffect(() => {
        const populateTable = () => {

            let problemInfo = null;
            for(const problem in typedProblemsData){
                if(typedProblemsData[problem].id === isPrincipalModalSectionOpen.id) {
                    problemInfo = typedProblemsData[problem];
                }
            }
            //console.log("problemInfo", problemInfo)
            setPrincipalModalTitle(problemInfo?.title || '')

            setTableData(() => { 
                return problemInfo?.problems.map((problem: ProblemType) => (
                    { 
                        id: problem.id, 
                        isStatusChecked: false, 
                        isStarChecked: false, 
                        name: problem.name, 
                        difficulty: problem.difficulty,
                        problemLink: problem.problemLink, 
                        solutionLink: problem.solutionLink, 
                    }
                )) || []; 
            })
        }
        populateTable();
    
    },[isPrincipalModalSectionOpen.id]);


    useEffect(() => {
        if(tableData){
            const quantityTableData = tableData.length;
            const totalStatusChecked = tableData.reduce((acc, item) => {
                if(item.isStatusChecked === true){
                    return acc + 1;
                }
                return acc;
            }, 0);
            setNumberOfProblemsModalTable({ quantityTableData, totalStatusChecked });
        }
    }, [setNumberOfProblemsModalTable, tableData])

    const setDifficultyTextColor = (difficulty: string) => { 
        switch (difficulty) { 
            case 'Easy': return 'green'; 
            case 'Medium': return 'yellow'; 
            case 'Hard': return 'red'; 
            default: return 'white'; 
        } 
    };
    const setProblemSolvedBgColor = (isProblemSolved: boolean) => {
        switch (isProblemSolved) {
            case true: return '#095c433c';
            case false: return 'transparent'
        }
    }
        
    const handleStarClick = (id: number) => {
        setTableData((prevData) =>
            prevData.map((item) =>
                item.id === id ? { ...item, isStarChecked: !item.isStarChecked } : item
            )
        );
    };
    const handleStatusClick = (id: number) => {
        setTableData((prevData) =>
            prevData.map((item) =>
                item.id === id ? { ...item, isStatusChecked: !item.isStatusChecked } : item
            )
        );
    };
    

    return (
      <Paper>
        <TableContainer sx={{ backgroundColor: 'var(--customPurple)' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'white', fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 'bold', fontSize: '.94rem' }}>Status</TableCell>
                <TableCell sx={{ color: 'white', fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 'bold', fontSize: '.94rem' }}>Star</TableCell>
                <TableCell sx={{ color: 'white', fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 'bold', fontSize: '.94rem' }}>Problem</TableCell>
                <TableCell sx={{ color: 'white', fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 'bold', fontSize: '.94rem' }}>Difficulty</TableCell>
                <TableCell sx={{ color: 'white', fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 'bold', fontSize: '.94rem' }}>Solution</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => (
                <TableRow 
                    key={row.id} 
                    sx={{
                        height: '25px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        backgroundColor: setProblemSolvedBgColor(row.isStatusChecked)
                    }}
                    >
                    <TableCell sx={{ height: '25px', width: '150px', padding: '0px 15px', backgroundColor: setProblemSolvedBgColor(row.isStatusChecked) }}>
                        <Checkbox  
                            sx={{ 
                                color: 'white', 
                                '&:hover': { color: 'rgba(0, 255, 179, 0.8)', }, 
                                '&:active': { color: 'rgba(0, 255, 179, 0.8)', }, 
                                '&.Mui-checked': { color: 'rgba(0, 255, 179, 0.8)', }, 
                            }}
                            checked={row.isStatusChecked}
                            onChange={() => handleStatusClick(row.id)}
                        />
                    </TableCell>
                    <TableCell sx={{ height: '25px', width: '120px', padding: '0px 15px', backgroundColor: setProblemSolvedBgColor(row.isStatusChecked) }}>
                        <div
                            onClick={() => handleStarClick(row.id)}
                            style={{
                            cursor: "pointer",
                            color: row.isStarChecked ? "yellow" : "white",
                            fontSize: "2.1rem",
                            paddingBottom: '6px'
                            }}
                        >
                            { row.isStarChecked ? (
                            <StarRoundedIcon style={{ fontSize: "2.1rem" }} />
                            ) : (
                            <StarOutlineRoundedIcon style={{ fontSize: "2.1rem" }} />
                            ) }
                        </div>
                    </TableCell>
                    <TableCell sx={{ height: '25px', padding: '0px 15px', color: 'white', fontWeight: '600', fontFamily: 'Helvetica, Arial, sans-serif', backgroundColor: setProblemSolvedBgColor(row.isStatusChecked) }}>
                        {row.name} 
                        <Link href="/">
                            <LaunchRoundedIcon style={{fontSize: '16px', marginLeft: '8px'}}/>
                        </Link>
                    </TableCell>
                    <TableCell 
                        sx={{ 
                            height: '25px', 
                            width: '190px', 
                            padding: '0px 15px', 
                            fontWeight: '600', 
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontSize: '.85rem',
                            color: setDifficultyTextColor(row.difficulty),
                            backgroundColor: setProblemSolvedBgColor(row.isStatusChecked)
                        }}
                    >
                        {row.difficulty}
                    </TableCell>
                    <TableCell sx={{ height: '25px', width: '160px', padding: '0px 37px', color: 'white', fontWeight: '600', fontFamily: 'Helvetica, Arial, sans-serif', backgroundColor: setProblemSolvedBgColor(row.isStatusChecked) }}>
                        <Link href={'/'}>
                            <VideocamRoundedIcon/>
                        </Link>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
    
  };
  
export default ScrollableTable;