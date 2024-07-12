"use client"
import React, { useEffect } from 'react'
import { useAudioInput } from "@/lib/pitch"



const Analyzer = () => {
  const frequency = useAudioInput();


  return (
    <div><h1>{frequency}</h1></div>
  )
}

export default Analyzer