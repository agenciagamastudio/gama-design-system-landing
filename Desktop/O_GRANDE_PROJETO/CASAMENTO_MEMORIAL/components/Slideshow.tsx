'use client'

import { useEffect, useState } from 'react'
import type { DrivePhoto } from '@/lib/fetchPhotos'
import { fetchDrivePhotos } from '@/lib/fetchPhotos'

interface SlideshowProps {
  onComplete: () => void
}

export default function Slideshow({ onComplete }: SlideshowProps) {
  const [photos, setPhotos] = useState<DrivePhoto[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadPhotos() {
      const loadedPhotos = await fetchDrivePhotos()
      setPhotos(loadedPhotos)
      setIsLoading(false)
    }
    loadPhotos()
  }, [])

  useEffect(() => {
    if (!isAutoPlay || photos.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev === photos.length - 1) {
          onComplete()
          return prev
        }
        return prev + 1
      })
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlay, photos.length, onComplete])

  if (isLoading) {
    return (
      <div className="w-full h-screen bg-gama-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gama-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-gama-text-secondary font-poppins">Carregando apresentação...</p>
          <p className="text-xs text-gama-text-secondary/60 mt-2">Preparando seus momentos especiais</p>
        </div>
      </div>
    )
  }

  if (photos.length === 0) {
    return (
      <div className="w-full h-screen bg-gama-dark flex items-center justify-center">
        <div className="text-center px-6">
          <p className="text-gama-error font-poppins mb-2">Nenhuma foto encontrada</p>
          <p className="text-gama-text-secondary text-sm">Verifique se a pasta do Google Drive está compartilhada publicamente</p>
        </div>
      </div>
    )
  }

  const currentPhoto = photos[currentIndex]

  const nextSlide = () => {
    if (currentIndex === photos.length - 1) {
      onComplete()
    } else {
      setCurrentIndex((prev) => prev + 1)
    }
    setIsAutoPlay(false)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1))
    setIsAutoPlay(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlay(false)
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gama-dark">
      {/* Slides com fade-in elegante */}
      {photos.map((photo, index) => (
        <div
          key={photo.id}
          className={`absolute inset-0 transition-opacity duration-1200 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <img
            src={photo.url}
            alt={photo.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=800&fit=crop'
            }}
          />

          {/* Overlay gradient elegante */}
          <div className="absolute inset-0 bg-gradient-to-t from-gama-dark/80 via-transparent to-gama-dark/20"></div>

          {/* Section label com estilo */}
          <div className="absolute bottom-24 left-0 right-0 text-center pointer-events-none">
            <p className="text-gama-text-secondary text-base font-poppins font-light tracking-widest">
              ✦ {photo.section.toUpperCase()} ✦
            </p>
          </div>
        </div>
      ))}

      {/* Controles */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center gap-4 pb-8 z-20 pointer-events-none">
        {/* Indicadores com design melhorado */}
        <div className="flex gap-1.5 flex-wrap justify-center max-w-xl pointer-events-auto">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-gama-primary w-8 h-2'
                  : 'bg-gama-text-secondary/40 w-2 h-2 hover:bg-gama-text-secondary/60'
              }`}
              aria-label={`Ir para foto ${index + 1}`}
            ></button>
          ))}
        </div>

        {/* Contador elegante */}
        <p className="text-gama-text-secondary/70 text-xs font-poppins tracking-wide pointer-events-auto">
          {currentIndex + 1} / {photos.length}
        </p>

        {/* Botão próxima com estilo gama */}
        {currentIndex === photos.length - 1 && (
          <button
            onClick={onComplete}
            className="mt-2 px-8 py-3 bg-gama-primary text-gama-dark font-black font-poppins rounded-lg hover:shadow-xl hover:shadow-gama-primary/40 transition-all duration-300 hover:scale-105 active:scale-95 pointer-events-auto"
          >
            Ver Galeria Completa
          </button>
        )}
      </div>

      {/* Navegação setas com design melhorado */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 text-gama-text opacity-50 hover:opacity-100 hover:text-gama-primary transition-all text-2xl font-light"
        aria-label="Foto anterior"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 text-gama-text opacity-50 hover:opacity-100 hover:text-gama-primary transition-all text-2xl font-light"
        aria-label="Próxima foto"
      >
        ❯
      </button>
    </div>
  )
}
