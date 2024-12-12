'use client';
import React from 'react';
import Image from 'next/image';
import logo from '../public/logo_horizontal_branco.webp';
import Link from 'next/link';
import CustomButton from './CustomButton';
import { useAuthContext } from '@/contexts/AuthContext/AuthContext';
 

export default function Header() {

    const { userAuth, logout } = useAuthContext();

    return (
        <header className="w-full h-16 bg-customPurple px-5 sm:px-10 border-b-[1px] border-purpleLogo text-white">
            <nav className="w-full h-full flex  justify-between">
                <div className="w-fit h-full flex items-center gap-16">
                    <Link href="/">
                        <Image
                            src={logo}
                            alt="Logo"
                            width={110}
                            height={110}
                        />
                    </Link>
                    <ul className='hidden md:flex gap-8 items-center'>
                        <li className='px-6 py-[6px] hover:bg-background transition ease-in-out duration-300 rounded-2xl cursor-pointer'>
                            <a href="https://neetcode.io/courses" target="_blank" rel="noopener noreferrer">Courses</a>
                        </li>
                        <li className='px-6 py-[6px] hover:bg-background transition ease-in-out duration-300 rounded-2xl cursor-pointer'>
                            <a href="https://neetcode.io/practice" target="_blank" rel="noopener noreferrer">Practice</a>
                        </li>
                        <li className='px-6 py-[6px] hover:bg-background bg-background transition ease-in-out duration-300 rounded-2xl cursor-pointer'>
                            <Link href="/">Roadmap</Link>
                        </li>
                        <li className='px-6 py-[6px] hover:bg-background transition ease-in-out duration-300 rounded-2xl cursor-pointer'>
                            <a href="https://neetcode.io/newsletter" target="_blank" rel="noopener noreferrer">Newsletter</a>
                        </li>
                    </ul>
                </div>

                {
                    userAuth ? 
                    (
                        <button
                            onClick={() => logout()} 
                            className='w-fit h-full flex items-center'>
                            <CustomButton bgColor={'var(--customPurpleBtn)'}>Logout</CustomButton>
                        </button>
                    )
                    :
                    (
                        <Link href="/register" className='w-fit h-full flex items-center'>
                            <CustomButton bgColor={'var(--customPurpleBtn)'}>Sign in</CustomButton>
                        </Link>
                    )
                }
            </nav>
        </header>
    )
}
