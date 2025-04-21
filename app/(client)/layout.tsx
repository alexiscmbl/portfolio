"use client"
import { useState } from 'react'
import Link from "next/link"
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd'
import { House, Phone, BookCheck, CircleUserRound } from "lucide-react";

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    { 
        icon: <House size={15} />,
        key: "accueil",
        label: <Link href={'/'}>Accueil</Link>
        
    },
    {
        icon: <CircleUserRound size={15}/>,
        key: "profile",
        label: <Link href={'/profile'}>Profile</Link>
    },
    { 
        icon: <BookCheck size={15}/>,
        key: "experience",
        label: <Link href={'/experience'}>Experience</Link>
        
    },
    { 
    icon: <Phone size={15}/>,
        key: "contact",
        label: <Link href={'/contact'}>Contact</Link> 

    }
];

export default function Layout({children}: {children: React.ReactNode}) {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <div className='border flex h-screen' >
                <div className='flex place-content-center place-items-center place w-40 ml-5'>
                    <Menu
                        className='rounded-sm'
                        defaultSelectedKeys={['accueil']}
                        defaultOpenKeys={['accueil']}
                        mode="inline"
                        theme="light"
                        inlineCollapsed={collapsed}
                        onMouseEnter={() => setCollapsed(false)}
                        onMouseLeave={() => setCollapsed(true)}
                        items={items}
                        style={{ width: 200 }}
                    />
                </div>
            <div className='border'>
                {children}
            </div>
        </div>
    )
}