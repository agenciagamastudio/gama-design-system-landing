/**
 * Detecta cores dominantes em uma imagem
 * Usa média simples de pixels da imagem
 */

export interface ColorPalette {
  dominant: string
  secondary: string
  accent: string
  background: string
}

/**
 * Extrai cores dominantes de uma imagem
 */
export async function getColorPaletteFromImage(imageUrl: string): Promise<ColorPalette> {
  try {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Canvas não suportado')

    const img = new Image()
    img.crossOrigin = 'anonymous'

    return new Promise((resolve, reject) => {
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)

        const imageData = ctx.getImageData(0, 0, img.width, img.height)
        const colors = analyzePixels(imageData.data)

        resolve({
          dominant: colors.dominant,
          secondary: colors.secondary,
          accent: colors.accent,
          background: colors.background,
        })
      }

      img.onerror = () => reject(new Error('Erro ao carregar imagem'))

      img.src = imageUrl
    })
  } catch (error) {
    console.warn('Erro ao detectar cores, usando padrão:', error)
    return getDefaultPalette()
  }
}

/**
 * Analisa pixels e retorna cores dominantes
 */
function analyzePixels(
  data: Uint8ClampedArray
): { dominant: string; secondary: string; accent: string; background: string } {
  const colorMap = new Map<string, number>()

  // Amostra pixels (a cada 4 pixels pra performance)
  for (let i = 0; i < data.length; i += 16) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const a = data[i + 3]

    if (a > 128) {
      const color = rgbToHex(r, g, b)
      colorMap.set(color, (colorMap.get(color) || 0) + 1)
    }
  }

  // Ordena por frequência
  const sortedColors = Array.from(colorMap.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([color]) => color)

  return {
    dominant: sortedColors[0] || '#DC2626',
    secondary: sortedColors[1] || '#1F2937',
    accent: sortedColors[2] || '#F59E0B',
    background: '#000000',
  }
}

/**
 * Converte RGB para HEX
 */
function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('').toUpperCase()
}

/**
 * Paleta padrão (casamento clássico)
 */
export function getDefaultPalette(): ColorPalette {
  return {
    dominant: '#DC2626', // Vermelho
    secondary: '#1F2937', // Cinza escuro
    accent: '#F59E0B', // Dourado
    background: '#000000', // Preto
  }
}
