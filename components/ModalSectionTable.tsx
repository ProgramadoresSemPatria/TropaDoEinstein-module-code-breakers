'use client';
import React, { useEffect, useState, useRef } from "react";
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

import { GraphType, ProblemType, TableDataType, UserDataFromDBType } from "@/utils/Types/types";
import problemsData from '@/utils/data/problems-info-table.json';
import { useNumberOfProblemsTableContext } from "@/contexts/NumberOfProblemsTableContext";
import { useIsModalOpenContext } from "@/contexts/IsModalOpenContext";
import { addUserResolvedProblemsToDB } from "@/firebase/database/functions";
import { useAuthContext } from "@/contexts/AuthContext/AuthContext";
import { useUserInfoContext } from '@/contexts/UserInfoContext';

const typedProblemsData: GraphType = problemsData;
  
const ScrollableTable = () => {

    const { numberOfProblemsModalTable, setNumberOfProblemsModalTable } = useNumberOfProblemsTableContext();
    const { isPrincipalModalSectionOpen, setPrincipalModalTitle } = useIsModalOpenContext();
    const { userAuth } = useAuthContext();
    const { userDataFromDatabase } = useUserInfoContext();
    const [tableData, setTableData] = useState<TableDataType[]>([]);
    const initialTableDataRef = useRef<TableDataType[]>([]);

    
    useEffect(() => {
        const populateTable = () => {

            let roadmapTitleInfo = null;
            for(const title in typedProblemsData){
                if(typedProblemsData[title].id === isPrincipalModalSectionOpen.id) {
                    roadmapTitleInfo = typedProblemsData[title];
                }
            }
    
            setPrincipalModalTitle(roadmapTitleInfo?.title || '');

            const newTableData = roadmapTitleInfo?.problems.map((eachProblemInfo: ProblemType): TableDataType => {
                console.log("userDataFromDatabase", userDataFromDatabase)
                const storedProblem = userDataFromDatabase.find(
                    (item: UserDataFromDBType) => item.id === eachProblemInfo.id
                );
                return {
                    id: eachProblemInfo.id,
                    isStatusChecked: storedProblem?.isStatusChecked || false,
                    isStarChecked: storedProblem?.isStarChecked || false,
                    name: eachProblemInfo.name,
                    difficulty: eachProblemInfo.difficulty,
                    problemLink: eachProblemInfo.problemLink,
                    solutionLink: eachProblemInfo.solutionLink,
                };
            }) || [];

            setTableData(newTableData);
            console.log('userDataFromDatabase', userDataFromDatabase); 
        }
        
        if (isPrincipalModalSectionOpen.value) {
            populateTable();
        }
    
    },[isPrincipalModalSectionOpen.value, isPrincipalModalSectionOpen.id, userDataFromDatabase, setPrincipalModalTitle, userAuth?.uid]);


    useEffect(() => {
        console.log("Contando number of Problems")
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

    useEffect(() => {
        if(numberOfProblemsModalTable.totalStatusChecked === 0) return;

        const saveDataToDB = () => {
            const data = {
                problems: tableData.map((item: TableDataType) => {
                    const progressBarValue = (numberOfProblemsModalTable.totalStatusChecked / numberOfProblemsModalTable.quantityTableData) * 100;
                    return {
                        id: item.id,
                        isStatusChecked: item.isStatusChecked,
                        isStarChecked: item.isStarChecked,
                        progressBarValue: progressBarValue
                    }
                })
            }

            const roadmapTitleId = isPrincipalModalSectionOpen.id
            if(userAuth?.uid) {
                console.log("Salvando dados no DB")
                addUserResolvedProblemsToDB('users/' + userAuth?.uid + '/problems-id:' + roadmapTitleId, data.problems);
            }
            else {
                const saveDataToLocalStorage = () => {
                    const storedData = JSON.parse(localStorage.getItem('user-data') || '{}'); 
                    const updatedData = {
                        ...storedData, 
                        [`problems-id:${roadmapTitleId}`]: data.problems 
                    };
                
                    localStorage.setItem('user-data', JSON.stringify(updatedData)); 
                };
                saveDataToLocalStorage();
            }
        }

        const hasChanges = JSON.stringify(initialTableDataRef.current) !== JSON.stringify(tableData);
        if(hasChanges) {
            saveDataToDB();
            initialTableDataRef.current = tableData;

        }

    }, [tableData, userAuth?.uid, isPrincipalModalSectionOpen.id, numberOfProblemsModalTable.totalStatusChecked]);



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
                        <a href={`${row.problemLink}`} target="_blank" rel="noopener noreferrer">
                            {row.name} 
                            <LaunchRoundedIcon style={{fontSize: '16px', marginLeft: '8px'}}/>
                        </a>
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
                    <TableCell sx={{ height: '25px', width: '160px', padding: '0px 16px', color: 'white', fontWeight: '600', fontFamily: 'Helvetica, Arial, sans-serif', backgroundColor: setProblemSolvedBgColor(row.isStatusChecked) }}>
                    <a href={`${row.solutionLink}`} target="_blank" rel="noopener noreferrer" className="px-6 py-[8px] rounded-2xl hover:bg-background transition-all duration-300 ease-in-out">
                        <VideocamRoundedIcon/>
                    </a>
                        
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        </Paper>
    )
  };
  
export default ScrollableTable;