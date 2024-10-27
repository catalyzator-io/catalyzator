
import React, { useState, useEffect } from 'react'
import { Zap, Mail, Cpu } from 'lucide-react'
import { motion } from 'framer-motion'
import { addDoc, collection } from 'firebase/firestore'
import toast, { Toaster } from 'react-hot-toast'
import db from '../firebase'
import { useNavigate } from 'react-router-dom';
export default function Header() {

  const navigate = useNavigate();
  return (
    <header className=" py-20 px-4 sm:px-6 lg:px-8 cyber-grid relative overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
      </motion.div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.3, type: 'spring' }}
        >
          <Zap className="h-16 w-16 text-crazy-orange mx-auto mb-2 glow" />
        </motion.div>
        <motion.h1
          className="text-6xl sm:text-6xl md:text-6xl font-bold tracking-tight mb-2 gradient-text py-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          Catalyzator.io
        </motion.h1>
        <motion.p
          className="text-2xl sm:text-2xl mb-2 text-crazy-orange"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <span className='font-bold'>The Catalyzator</span> For Your Ventures
        </motion.p>
        <motion.p
          className="text-ml mb-8 text-gray-700 p-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          Accelerate Funding with AI: Effortless Grants, Zero Hassle!
        </motion.p>
        <button className='btn btn-primary' onClick={() => navigate('/onboarding')}>
          Catalyzate Now!
        </button>
      </div>
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 1.5, type: 'spring' }}
      >
      </motion.div>
      <Toaster />
    </header>
  )
}