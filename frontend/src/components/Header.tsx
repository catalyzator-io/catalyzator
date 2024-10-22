
import React, { useState, useEffect } from 'react'
import { Zap, Mail, Cpu } from 'lucide-react'
import { motion } from 'framer-motion'
import { addDoc, collection } from 'firebase/firestore'
import toast, { Toaster } from 'react-hot-toast'
import db from '../firebase'

export default function Header() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await addDoc(collection(db, "emails"), {
        email: email,
        timestamp: new Date()
      })
      toast.success('Email submitted successfully!')
      setEmail('')
    } catch (error) {
      console.error("Error submitting email: ", error)
      toast.error('An error occurred. Please try again.')
    }
    setIsLoading(false)
  }

  return (
    <header className=" py-16 px-4 sm:px-6 lg:px-8 cyber-grid relative overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-pale-pink rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      </motion.div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: 'spring' }}
        >
          <Zap className="h-16 w-16 text-crazy-orange mx-auto mb-6 glow" />
        </motion.div>
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 gradient-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Catalyzator.io
        </motion.h1>
        <motion.p
          className="text-xl sm:text-2xl mb-2 text-crazy-orange"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <span className='font-bold'>The Catalyzator</span> For Your Ventures
        </motion.p>
        <motion.p
          className="text-ml mb-8 text-crazy-orange p-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          Accelerate Funding with AI: Effortless Grants, Zero Hassle!
        </motion.p>
        <motion.form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="flex items-center border-2 border-neon-purple rounded-full overflow-hidden bg-white neon-border">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="appearance-none bg-transparent border-none w-full text-cool-purple mr-3 py-2 px-4 leading-tight focus:outline-none"
              required
            />
            <button
              type="submit"
              className="btn btn-primary flex items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <Cpu className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                <Mail className="h-5 w-5 mr-2" />
              )}
              Catalyze!
            </button>
          </div>
        </motion.form>
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