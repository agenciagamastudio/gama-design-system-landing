'use client'

import { useState, useEffect } from 'react'
import { Play, Heart, ChevronDown } from 'lucide-react'

interface IntroScreenProps {
  onStart: () => void
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  const [isClicked, setIsClicked] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleStart = () => {
    setIsClicked(true)
    setTimeout(() => onStart(), 300)
  }

  return (
    <div className="w-full bg-gama-dark">
      {/* HERO SECTION - FULLSCREEN IMAGE CINEMATIC */}
      <section className="relative w-full h-screen flex items-end justify-center overflow-hidden">
        {/* Background image com overlay */}
        <div className="absolute inset-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=800&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            transform: `translateY(${scrollY * 0.5}px)`,
          }}>
          {/* Overlay escuro com gradiente */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Conteúdo - Texto elegante */}
        <div className="relative z-10 text-center text-white pb-12 md:pb-20 px-4 md:px-6 max-w-3xl">
          {/* Decoração minimalista */}
          <div className="mb-6 flex justify-center">
            <div className="w-12 h-px bg-gama-primary/60"></div>
          </div>

          {/* Título elegante e grande */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-poppins mb-3 md:mb-4 leading-none"
            style={{
              letterSpacing: '0.02em',
              textShadow: '0 4px 20px rgba(0,0,0,0.7)',
            }}>
            NOSSO DIA
          </h1>

          {/* Subtítulo elegante */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light font-poppins text-gama-primary mb-8 md:mb-12"
            style={{
              letterSpacing: '0.08em',
              textShadow: '0 2px 20px rgba(0,0,0,0.8)',
            }}>
            23 DE ABRIL • 3 ANOS
          </p>

          {/* Descrição minimalista */}
          <p className="text-base sm:text-lg md:text-lg font-light font-poppins mb-12 md:mb-16 px-4"
            style={{
              textShadow: '0 2px 20px rgba(0,0,0,0.8)',
              maxWidth: '500px',
            }}>
            Uma celebração dos momentos que nos definem.
            <br />
            <span className="text-gama-primary font-medium">Fotos que contam nossa história.</span>
          </p>

          {/* CTA Button elegante */}
          <button
            onClick={handleStart}
            disabled={isClicked}
            className="group inline-flex items-center gap-3 px-10 py-4 bg-gama-primary text-gama-dark font-black font-poppins rounded-lg hover:shadow-2xl hover:shadow-gama-primary/50 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            <Play size={20} fill="currentColor" className="group-hover:translate-x-1 transition-transform" />
            {isClicked ? 'Iniciando...' : 'VER APRESENTAÇÃO'}
          </button>

          {/* Scroll hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-6 h-6 text-gama-primary opacity-60" strokeWidth={1} />
          </div>
        </div>
      </section>

      {/* SECTION 2 - Info elegante */}
      <section className="relative py-16 md:py-32 px-4 md:px-6 bg-gama-dark">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black font-poppins text-gama-primary mb-8 md:mb-12 text-center">
            Nossa História
          </h2>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="space-y-4 md:space-y-6 text-gama-text font-poppins order-2 md:order-1">
              <p className="text-base md:text-lg leading-relaxed">
                Três anos de memórias, risadas e sonhos compartilhados.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                Este memorial celebra cada momento: desde o preparatório até o último beijo. Fotos que congelam sentimentos, sorrisos genuínos e a pureza de um dia inesquecível.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                <span className="text-gama-primary font-black">Bem-vindo à nossa jornada.</span>
              </p>
            </div>

            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl order-1 md:order-2">
              <div className="absolute inset-0"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1551632706-3fa3c1f531ca?w=600&h=600&fit=crop')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}>
                <div className="absolute inset-0 bg-gradient-to-t from-gama-dark/80 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 - Galeria Preview */}
      <section className="relative py-16 md:py-32 px-4 md:px-6 bg-gama-darker">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black font-poppins text-gama-primary mb-8 md:mb-16 text-center">
            A Galeria
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {/* Card 1 - Making Of */}
            <div className="group relative h-64 sm:h-72 md:h-80 rounded-2xl overflow-hidden cursor-pointer transform transition-all hover:scale-105"
              onClick={handleStart}>
              <div
                className="absolute inset-0 group-hover:scale-110 group-hover:brightness-75 transition-all duration-600"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=600&fit=crop')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-gama-dark/90 via-transparent to-transparent flex items-end">
                <div className="p-4 md:p-6 w-full">
                  <p className="text-xl md:text-2xl font-black font-poppins text-white">Making Of</p>
                  <p className="text-gama-primary text-xs md:text-sm font-light">Beleza & Preparação</p>
                </div>
              </div>
            </div>

            {/* Card 2 - Cerimônia */}
            <div className="group relative h-64 sm:h-72 md:h-80 rounded-2xl overflow-hidden cursor-pointer transform transition-all hover:scale-105"
              onClick={handleStart}>
              <div
                className="absolute inset-0 group-hover:scale-110 group-hover:brightness-75 transition-all duration-600"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1606011334315-50a3f1f1f8ce?w=600&h=600&fit=crop')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-gama-dark/90 via-transparent to-transparent flex items-end">
                <div className="p-4 md:p-6 w-full">
                  <p className="text-xl md:text-2xl font-black font-poppins text-white">Cerimônia</p>
                  <p className="text-gama-primary text-xs md:text-sm font-light">Vows & Alianças</p>
                </div>
              </div>
            </div>

            {/* Card 3 - Recepção */}
            <div className="group relative h-64 sm:h-72 md:h-80 rounded-2xl overflow-hidden cursor-pointer transform transition-all hover:scale-105"
              onClick={handleStart}>
              <div
                className="absolute inset-0 group-hover:scale-110 group-hover:brightness-75 transition-all duration-600"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1537633552985-87a049fb3e1f?w=600&h=600&fit=crop')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-gama-dark/90 via-transparent to-transparent flex items-end">
                <div className="p-4 md:p-6 w-full">
                  <p className="text-xl md:text-2xl font-black font-poppins text-white">Recepção</p>
                  <p className="text-gama-primary text-xs md:text-sm font-light">Dança & Celebração</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12 md:mt-16">
            <button
              onClick={handleStart}
              className="inline-flex items-center gap-2 md:gap-3 px-6 md:px-10 py-3 md:py-4 bg-gama-primary text-gama-dark font-black font-poppins rounded-lg hover:shadow-2xl hover:shadow-gama-primary/50 transition-all duration-300 hover:scale-105 active:scale-95 text-sm md:text-base"
            >
              <Heart className="w-4 md:w-5 h-4 md:h-5" fill="currentColor" />
              Ver Apresentação
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 md:py-12 px-4 md:px-6 bg-gama-dark border-t border-gama-primary/20">
        <div className="max-w-4xl mx-auto text-center">
          <Heart className="w-5 md:w-6 h-5 md:h-6 text-gama-primary mx-auto mb-3 md:mb-4" fill="currentColor" />
          <p className="text-gama-text-secondary font-poppins text-sm md:text-base">
            Memorial do Casamento • 23 de Abril de 2026
          </p>
          <p className="text-xs md:text-sm text-gama-text-secondary/50 mt-2">
            Com amor ✦
          </p>
        </div>
      </footer>
    </div>
  )
}
