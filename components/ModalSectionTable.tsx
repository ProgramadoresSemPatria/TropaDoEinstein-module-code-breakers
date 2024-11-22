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
import { useProgressBarWidthContext } from "@/contexts/ProgressBarWidthContext";
  
  
  const ScrollableTable = () => {

    const { setNumberOfProblemsModalTable } = useProgressBarWidthContext();

    const [tableData, setTableData] = useState([
        { id: 1, isStatusChecked: true,  name: "Item 1", isStarChecked: true, problem: 'Problem title', difficulty: 'Easy', solutionLink: 'http:/' },
        { id: 2, isStatusChecked: false, name: "Item 2", isStarChecked: false, problem: 'Problem title', difficulty: 'Easy', solutionLink: 'http:/' },
        { id: 3, isStatusChecked: true,  name: "Item 3", isStarChecked: false, problem: 'Problem title', difficulty: 'Medium', solutionLink: 'http:/'},
        { id: 4, isStatusChecked: false, name: "Item 3", isStarChecked: false, problem: 'Problem title', difficulty: 'Easy', solutionLink: 'http:/' },
        { id: 5, isStatusChecked: true, name: "Item 3", isStarChecked: true, problem: 'Problem title', difficulty: 'Medium', solutionLink: 'http:/'},
        { id: 6, isStatusChecked: false, name: "Item 3", isStarChecked: false, problem: 'Problem title', difficulty: 'Medium', solutionLink: 'http:/'},
        { id: 7, isStatusChecked: false, name: "Item 3", isStarChecked: false, problem: 'Problem title', difficulty: 'Medium', solutionLink: 'http:/'},
        { id: 8, isStatusChecked: false, name: "Item 3", isStarChecked: false, problem: 'Problem title', difficulty: 'Medium', solutionLink: 'http:/'},
        { id: 9, isStatusChecked: false, name: "Item 3", isStarChecked: false, problem: 'Problem title', difficulty: 'Hard', solutionLink: 'http:/'},
        { id: 10, isStatusChecked: false, name: "Item 3", isStarChecked: false, problem: 'Problem title', difficulty: 'Hard', solutionLink: 'http:/'},
    ]);

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
    }, [tableData])

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
                <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '.94rem' }}>Status</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '.94rem' }}>Star</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '.94rem' }}>Problem</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '.94rem' }}>Difficulty</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '.94rem' }}>Solution</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => (
                <TableRow 
                    key={row.id} 
                    sx={{
                        height: '25px',
                        fontFamily: 'Arial, sans-serif',
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
                    <TableCell sx={{ height: '25px', padding: '0px 15px', color: 'white', fontWeight: '600', letterSpacing: '0.05rem', backgroundColor: setProblemSolvedBgColor(row.isStatusChecked) }}>
                        {row.problem} 
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
                            letterSpacing: '0.05rem', 
                            fontSize: '.85rem',
                            color: setDifficultyTextColor(row.difficulty),
                            backgroundColor: setProblemSolvedBgColor(row.isStatusChecked)
                        }}
                    >
                        {row.difficulty}
                    </TableCell>
                    <TableCell sx={{ height: '25px', width: '160px', padding: '0px 37px', color: 'white', fontWeight: '600', letterSpacing: '0.05rem', backgroundColor: setProblemSolvedBgColor(row.isStatusChecked) }}>
                        <Link href={row.solutionLink}>
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