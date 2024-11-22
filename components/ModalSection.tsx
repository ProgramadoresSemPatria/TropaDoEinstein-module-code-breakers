
import React from 'react';
import CustomButton from './CustomButton';
import ProgressBar from './ProgressBar';
import PrerequisiteCard from './PrerequisiteCard';
import dynamic from 'next/dynamic';

const ModalSectionTable = dynamic(() => import('./ModalSectionTable'), { ssr: false });

export default function ModalSection() {
  return (
    <section className='w-full lg:w-[81%] max-w-[1084px] h-full overflow-y-auto bg-customPurple absolute top-0 right-0 z-50 p-3  scroll-bar'>
        <div className="w-full flex items-center ">
            <CustomButton bgColor={'#7c058b'}>ESC</CustomButton>
            <h1 className='mx-auto lg:text-2xl font-bold pr-14'>Arrays & Hasing</h1>
        </div>        

        <div className="w-[70%] max-w-[500px] mt-2 flex flex-col gap-2 mx-auto">
            <p className="text-center">(0 / 150)</p>
            <ProgressBar/>
        </div>

        <div className="w-full flex flex-col items-center gap-3 text-white mt-8">
                <p>Prerequisites</p>
                <div className="w-full flex items-center justify-center gap-3">
                    <PrerequisiteCard
                        title='Title'
                        description='Title description for the card on modal section'
                    />
                    <PrerequisiteCard
                        title='Title'
                        description='Title description for the card on modal section'
                    />
                    <PrerequisiteCard
                        title='Title'
                        description='Title description for the card on modal section'
                    />
                    <PrerequisiteCard
                        title='Title'
                        description='Title description for the card on modal section'
                    />
            </div>
        </div>
        <div className="mt-8">
            <ModalSectionTable/>
        </div> 
    </section>
  )
}
