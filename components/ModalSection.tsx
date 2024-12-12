'use client';

import React, { useEffect, useState } from 'react';
import CustomButton from './CustomButton';
import ProgressBar from './ProgressBar';
import PrerequisiteCard from './PrerequisiteCard';
import dynamic from 'next/dynamic';
import { useIsModalOpenContext } from '@/contexts/IsModalOpenContext';
import problemsData from '@/utils/data/problems-info-table.json';

const ModalSectionTable = dynamic(() => import('./ModalSectionTable'), { ssr: false });

import { GraphType, PrerequisitesType } from "@/utils/Types/types";
import { useNumberOfProblemsTableContext } from '@/contexts/NumberOfProblemsTableContext';
//import { getDataFromDB } from '@/firebase/database/functions';
import { useAuthContext } from '@/contexts/AuthContext/AuthContext';
import { useUserInfoContext } from '@/contexts/UserInfoContext';
import { validateUserDataFromDBType } from '@/utils/functions/validateUserDataFromLocalStorage'

const typedRoadmapData: GraphType = problemsData;

export default function ModalSection() {
    
    const { userAuth } = useAuthContext();
    const { isPrincipalModalSectionOpen, setIsPrincipalModalSectionOpen, principalModalTitle } = useIsModalOpenContext();
    const { setUserDataFromDatabase } = useUserInfoContext();
    const { numberOfProblemsModalTable } = useNumberOfProblemsTableContext();
    const [prerequisiteData, setPrerequisiteData] = useState<PrerequisitesType[]>([]);
    const [progressBarInfo, setProgressBarInfo] = useState({  
        id: 0,
        progressBarValue: 0,
        totalAmountProblems: 0,
        totalResolvedProblems: 0
    });

    useEffect(() => {
        const calculateProgress: () => number = () => { 
            if (numberOfProblemsModalTable.quantityTableData === 0) { 
                return 0; 
            }
            return (numberOfProblemsModalTable.totalStatusChecked / numberOfProblemsModalTable.quantityTableData) * 100; 
        }; 
        const progressBarInfo = calculateProgress();  
        
        setProgressBarInfo({  
            id: isPrincipalModalSectionOpen.id,
            progressBarValue: progressBarInfo,
            totalAmountProblems: numberOfProblemsModalTable.quantityTableData,
            totalResolvedProblems: numberOfProblemsModalTable.totalStatusChecked
        }) 
    }, [isPrincipalModalSectionOpen.id, numberOfProblemsModalTable.quantityTableData, numberOfProblemsModalTable.totalStatusChecked]);

    useEffect(() => {
        /* const fetchData = async () => { 
            const resolvedProblems = await getDataFromDB('users/' + userAuth?.uid); 
            let userDataProblems = null;
            console.log("isPrincipalModalSectionOpen.id", isPrincipalModalSectionOpen.id);
            for(const problem in resolvedProblems) {
                const idString = `problems-id:${isPrincipalModalSectionOpen.id}`; 
                //console.log("idString", idString);
                //console.log("-----Problem----", );
                console.log("-----Problem----", problem)
                if(problem === idString) {
                    userDataProblems = problem
                }
            }
            console.log("userDataProblems", userDataProblems);
            //const userDataProblems = resolvedProblems[`problems-id:${isPrincipalModalSectionOpen.id}`] || [];
            //console.log("userDataProblems", resolvedProblems)
            //console.log("userDataProblems", userDataProblems)
            if(userDataProblems) {
                //setUserDataFromDatabase(userDataProblems)
            }
        }; 

        if(userAuth?.uid) {
            fetchData();
        }
        else {} */

        const userData = JSON.parse(localStorage.getItem('user-data') ?? '{}'); 
        const userDataProblems = userData[`problems-id:${isPrincipalModalSectionOpen.id}`] || [];

        const localStorageData = validateUserDataFromDBType(userDataProblems) ? userDataProblems : [];
        setUserDataFromDatabase(localStorageData);
        

    }, [isPrincipalModalSectionOpen.id, userAuth?.uid]);

    useEffect(() => {
        const populatePrerequisites = () => {

            let prerequisiteInfo = null;
            for(const subject in typedRoadmapData){
                if(typedRoadmapData[subject].id === isPrincipalModalSectionOpen.id) {
                    prerequisiteInfo = typedRoadmapData[subject].prerequisites as PrerequisitesType[];
                }
            }

            setPrerequisiteData(() => { 
                return prerequisiteInfo?.map((prerequisite: PrerequisitesType) => (
                    { 
                        title: prerequisite.title,
                        description: prerequisite.description,
                        link: prerequisite.link,
                    }
                )) || []; 
            })
        }
        populatePrerequisites();
    
    },[isPrincipalModalSectionOpen.id]);


        
    return (
        <section className={`${ isPrincipalModalSectionOpen.value ? 'block' : 'hidden'} w-full lg:w-[81%] max-w-[1084px] h-full overflow-y-auto bg-customPurple absolute top-0 right-0 z-50 p-3  scroll-bar  modal-section`}>
            <div className="w-full flex items-center ">
                <CustomButton onClick={() => setIsPrincipalModalSectionOpen({ value: false, id: 0 })} bgColor={'#7c058b'}>
                    ESC
                </CustomButton>
                <h1 className='mx-auto lg:text-2xl font-bold pr-14'>{principalModalTitle}</h1>
            </div>        

            <div className="w-[70%] max-w-[500px] mt-2 flex flex-col gap-2 mx-auto">
                <p className="text-center">{`(${progressBarInfo.totalResolvedProblems} / ${progressBarInfo.totalAmountProblems})`}</p>
                <ProgressBar heightProgressBar={12} progressBarValue={progressBarInfo.progressBarValue}/>
            </div>

            <div className="w-full flex flex-col items-center gap-3 text-white mt-8">
                    <p className='font-medium'>Prerequisites</p>
                    <div className="w-full flex flex-wrap items-center justify-center gap-3">
                        {prerequisiteData && prerequisiteData.map((prerequisite, index) => (
                            <PrerequisiteCard
                                key={index}
                                title={prerequisite.title}
                                description={prerequisite.description}
                                link={prerequisite.link}
                            />
                        ))}
                </div>
            </div>
            <div className="mt-8">
                <ModalSectionTable />
            </div> 
        </section>
    )
}
