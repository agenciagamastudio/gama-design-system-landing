'use client'

import { useEffect, useState } from 'react'
import Slideshow from '@/components/Slideshow'
import Gallery from '@/components/Gallery'
import IntroScreen from '@/components/IntroScreen'

export default function Home() {
  const [currentPhase, setCurrentPhase] = useState<'intro' | 'slideshow' | 'gallery'>('intro')

  const handlePhaseChange = (phase: typeof currentPhase) => {
    setCurrentPhase(phase)
  }

  return (
    <main className="w-full h-screen bg-black overflow-hidden">
      {currentPhase === 'intro' && (
        <IntroScreen onStart={() => handlePhaseChange('slideshow')} />
      )}
      {currentPhase === 'slideshow' && (
        <Slideshow onComplete={() => handlePhaseChange('gallery')} />
      )}
      {currentPhase === 'gallery' && (
        <Gallery onBack={() => handlePhaseChange('slideshow')} />
      )}
    </main>
  )
}
