"use client"

import React from "react";
import { Card } from 'antd';

export default function Contact() {
    return (
        <div className="w-screen h-screen flex justify-start items-start p-10">
            <Card title="Fiche de Contact" className="border border-gray-500 w-96 shadow-lg p-4">
                <p className="mb-2"><strong>Nom :</strong> Cesmat-Belliard</p>
                <p className="mb-2"><strong>Prénom :</strong> Alexis</p>
                <p className="mb-2"><strong>Email :</strong> alexis.cesmat.belliard18@gmail.com</p>
                <p className="mb-2"><strong>Téléphone :</strong> +33 7 72 55 11 86</p>
                <p className="mb-2"><strong>Adresse :</strong> 5 rue Antonio Vivaldi, 44590 Derval, France</p>
            </Card>
        </div>
    )
}