/**
 * Carrega fotos direto do Google Drive
 * Sem precisar de API key (usa compartilhamento público)
 */

export interface DrivePhoto {
  id: string
  name: string
  url: string
  section: 'Making Of' | 'Cerimônia' | 'Recepção' | 'Outros'
}

const FOLDER_ID = '1q9cf1DyW4F6jGEFvY8brOcg_4DyRz1QN'

/**
 * Carrega metadados das fotos do Google Drive
 */
export async function fetchDrivePhotos(): Promise<DrivePhoto[]> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY

    // Usa o endpoint public do Drive
    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=trashed=false%20and%20'${FOLDER_ID}'%20in%20parents&fields=files(id,name,mimeType,createdTime)&orderBy=createdTime&key=${apiKey}`,
      { next: { revalidate: 300 } } // cache 5 min
    )

    if (!response.ok) {
      console.warn('Drive API falhou, usando fotos demo')
      return getDemoPhotos()
    }

    const data = await response.json()

    if (!data.files || data.files.length === 0) {
      console.warn('Nenhuma foto encontrada, usando demo')
      return getDemoPhotos()
    }

    // Filtra só imagens
    const photos = data.files
      .filter((file: any) => file.mimeType.startsWith('image/'))
      .map((file: any, index: number) => ({
        id: file.id,
        name: file.name,
        url: `https://lh3.googleusercontent.com/d/${file.id}?w=1200`,
        section: detectSection(file.name, index, data.files.length),
      }))

    console.log(`Carregadas ${photos.length} fotos do Google Drive`)
    return photos
  } catch (error) {
    console.error('Erro ao carregar fotos:', error)
    return getDemoPhotos()
  }
}

/**
 * Detecta seção baseado no nome da foto
 */
function detectSection(
  filename: string,
  index: number,
  total: number
): 'Making Of' | 'Cerimônia' | 'Recepção' | 'Outros' {
  const lower = filename.toLowerCase()

  // Keywords
  if (
    lower.includes('making') ||
    lower.includes('makeup') ||
    lower.includes('prep') ||
    lower.includes('noiva') ||
    lower.includes('noivo')
  ) {
    return 'Making Of'
  }

  if (
    lower.includes('cerimônia') ||
    lower.includes('ceremony') ||
    lower.includes('altar') ||
    lower.includes('troca') ||
    lower.includes('aliança') ||
    lower.includes('beijo') ||
    lower.includes('entrada')
  ) {
    return 'Cerimônia'
  }

  if (
    lower.includes('recepção') ||
    lower.includes('reception') ||
    lower.includes('festa') ||
    lower.includes('dança') ||
    lower.includes('buffet') ||
    lower.includes('mesa')
  ) {
    return 'Recepção'
  }

  // Fallback: divide em seções iguais
  const percentual = index / total
  if (percentual < 0.33) return 'Making Of'
  if (percentual < 0.66) return 'Cerimônia'
  return 'Recepção'
}

/**
 * Fotos demo (fallback)
 */
export function getDemoPhotos(): DrivePhoto[] {
  return [
    {
      id: '1',
      name: 'Noiva Pronta',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=800&fit=crop',
      section: 'Making Of',
    },
    {
      id: '2',
      name: 'Cerimônia',
      url: 'https://images.unsplash.com/photo-1551632706-3fa3c1f531ca?w=1200&h=800&fit=crop',
      section: 'Cerimônia',
    },
    {
      id: '3',
      name: 'Troca de Alianças',
      url: 'https://images.unsplash.com/photo-1606011334315-50a3f1f1f8ce?w=1200&h=800&fit=crop',
      section: 'Cerimônia',
    },
    {
      id: '4',
      name: 'Primeiro Beijo',
      url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&h=800&fit=crop',
      section: 'Cerimônia',
    },
    {
      id: '5',
      name: 'Festa',
      url: 'https://images.unsplash.com/photo-1537633552985-87a049fb3e1f?w=1200&h=800&fit=crop',
      section: 'Recepção',
    },
  ]
}
