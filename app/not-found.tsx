"use client"

import { useRouter } from 'next/navigation';
import { Button } from 'antd'

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="w-screen flex flex-col justify-center items-center h-screen gap-2">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p>Désolé, la page que vous recherchez n&apos;existe pas.</p>
      <Button type="primary" onClick={() => router.push('/')}>
        Retour à la page d&apos;accueil
      </Button>
    </div>
  )
}