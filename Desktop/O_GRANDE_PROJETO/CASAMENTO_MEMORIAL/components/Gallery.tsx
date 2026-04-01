'use client'

import { useEffect, useState, useCallback } from 'react'
import { X, ChevronLeft, Download } from 'lucide-react'
import type { DrivePhoto } from '@/lib/fetchPhotos'
import { fetchDrivePhotos } from '@/lib/fetchPhotos'

interface GalleryProps {
  onBack?: () => void
}

export default function Gallery({ onBack }: GalleryProps) {
  const [photos, setPhotos] = useState<DrivePhoto[]>([])
  const [selectedPhoto, setSelectedPhoto] = useState<DrivePhoto | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [visiblePhotos, setVisiblePhotos] = useState<Set<string>>(new Set())

  useEffect(() => {
    async function loadPhotos() {
      const loadedPhotos = await fetchDrivePhotos()
      setPhotos(loadedPhotos)
      setIsLoading(false)
    }
    loadPhotos()
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPhoto(null)
      }
      if (e.key === 'ArrowRight' && selectedPhoto) {
        const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id)
        if (currentIndex < photos.length - 1) {
          setSelectedPhoto(photos[currentIndex + 1])
        }
      }
      if (e.key === 'ArrowLeft' && selectedPhoto) {
        const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id)
        if (currentIndex > 0) {
          setSelectedPhoto(photos[currentIndex - 1])
        }
      }
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [selectedPhoto, photos])

  // Lazy load observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisiblePhotos(prev => new Set([...prev, entry.target.id]))
        }
      })
    }, { rootMargin: '100px' })

    document.querySelectorAll('.gallery-photo').forEach(el => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [photos])

  if (isLoading) {
    return (
      <div className="w-full h-screen bg-gama-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gama-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-gama-text-secondary font-poppins">Carregando galeria...</p>
          <p className="text-xs text-gama-text-secondary/60 mt-2">{photos.length} fotos</p>
        </div>
      </div>
    )
  }

  const sections = ['Making Of', 'Cerimônia', 'Recepção', 'Outros'] as const

  return (
    <div className="w-full min-h-screen bg-gama-dark overflow-y-auto">
      {/* Header com botão voltar */}
      <div className="sticky top-0 z-30 bg-gradient-to-b from-gama-dark via-gama-dark to-transparent pt-8 pb-6 px-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <h1 className="text-5xl md:text-6xl font-black text-gama-text mb-2 font-poppins">Galeria</h1>
            <p className="text-gama-text-secondary font-poppins">{photos.length} fotos • Explore cada momento ✦</p>
          </div>
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 text-gama-text hover:text-gama-primary transition-colors font-poppins text-sm"
              title="Voltar (ESC)"
            >
              <ChevronLeft size={20} />
              <span className="hidden sm:inline">Voltar</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid de fotos por seção */}
      <div className="px-4 md:px-6 pb-20 max-w-7xl mx-auto">
        {sections.map((section) => {
          const sectionPhotos = photos.filter((p) => p.section === section)
          if (sectionPhotos.length === 0) return null

          return (
            <div key={section} className="mb-20">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-3xl md:text-4xl font-black text-gama-primary font-poppins">
                  {section}
                </h2>
                <div className="flex-1 h-px bg-gama-primary/30"></div>
                <span className="text-gama-text-secondary text-sm font-poppins">{sectionPhotos.length} fotos</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {sectionPhotos.map((photo) => (
                  <button
                    key={photo.id}
                    id={photo.id}
                    className="gallery-photo group relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-gama-surface"
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    {visiblePhotos.has(photo.id) ? (
                      <>
                        <img
                          src={photo.url}
                          alt={photo.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop'
                          }}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                          <span className="text-gama-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-poppins font-semibold">
                            ✦ Expandir ✦
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gama-surface to-gama-darker animate-pulse"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal Lightbox elegante */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-gama-dark/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative w-full max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Imagem */}
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.name}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=800&fit=crop'
              }}
            />

            {/* Info & Controles */}
            <div className="w-full mt-6 flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-gama-text font-poppins font-semibold">{selectedPhoto.name}</p>
                <p className="text-gama-text-secondary text-sm font-poppins">{selectedPhoto.section}</p>
              </div>
              <a
                href={selectedPhoto.url}
                download
                className="p-2 text-gama-primary hover:bg-gama-surface rounded-full transition-colors"
                title="Baixar foto (⌘S ou Ctrl+S)"
              >
                <Download size={24} />
              </a>
            </div>

            {/* Botão fechar */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 text-gama-text hover:text-gama-primary transition-colors bg-gama-dark/70 hover:bg-gama-dark/90 rounded-full p-3 backdrop-blur-sm"
              title="Fechar (ESC)"
            >
              <X size={24} />
            </button>

            {/* Dica de navegação */}
            <p className="absolute bottom-4 left-4 text-gama-text-secondary/50 text-xs font-poppins">
              ← → para navegar | ESC para fechar
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
