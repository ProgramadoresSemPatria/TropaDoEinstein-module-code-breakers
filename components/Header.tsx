
import React from 'react';
import Image from 'next/image';
import logo from '../public/logo_horizontal_branco.webp';
import Link from 'next/link';
import CustomButton from './CustomButton';
 

export default function Header() {
  return (
    <header className="w-full h-16 bg-[#18063a] px-5 sm:px-10 border-b-[1px] border-purpleLogo text-white">
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
                <ul>
                    <li className='px-6 py-[6px] bg-background rounded-2xl cursor-pointer'>
                        <Link href="/">Roadmap</Link>
                    </li>
                </ul>
            </div>

            <div className='w-fit h-full flex items-center'>
                <CustomButton className="bg-greenLogo">Sign in</CustomButton>
            </div>
        </nav>
    </header>
  )
}