"use client"

import { useMemo, useState } from 'react'
import Link from "next/link"
import type { MenuProps } from 'antd';
import { Menu } from 'antd'
import { House, Phone, BookCheck, CircleUserRound } from "lucide-react";
import { usePathname } from 'next/navigation';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    { 
        icon: <House size={15} />,
        key: "homepage",
        label: <Link href={'/'}>Accueil</Link>
        
    },
    {
        icon: <CircleUserRound size={15}/>,
        key: "profile",
        label: <Link href={'/profile'}>Profil</Link>
    },
    { 
        icon: <BookCheck size={15}/>,
        key: "experience",
        label: <Link href={'/experience'}>Expérience</Link>
        
    },
    { 
    icon: <Phone size={15}/>,
        key: "contact",
        label: <Link href={'/contact'}>Contact</Link> 

    }
];

export default function Layout({children}: {children: React.ReactNode}) {
    const [collapsed, setCollapsed] = useState<boolean>(true);
    const pathname = usePathname() ?? '/';

    const pathKey = useMemo(() => {
        if (pathname === '/' || pathname === '') return 'homepage';
        if (pathname.startsWith('/profile')) return 'profile';
        if (pathname.startsWith('/experience')) return 'experience';
        if (pathname.startsWith('/contact')) return 'contact';
        return 'homepage';
    }, [pathname]);
    
    return (
        <div className='border flex h-screen' >
                <div className='flex place-content-center place-items-center place w-40 ml-5'>
                    <Menu
                        className='rounded-sm'
                        mode="inline"
                        defaultSelectedKeys={[pathKey]}
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