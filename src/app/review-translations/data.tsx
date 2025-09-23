'use client'

import { useState, useEffect } from 'react'
import { Language } from '@/constants/languages'
import { extractSessionMedicines, fetchMedicineImage, Medicine, Translation } from '@/lib/api'

export interface Instruction {
  language: string
  text: string
}

export interface MedicineTranslation {
  filename: string
  medicine_name: string
  dosage: string
  primary_language: string
  translations: Translation[]
  instructions: Instruction[]
  imageUrl?: string
}

export interface UseMedicineDataReturn {
  medicines: MedicineTranslation[]
  loading: boolean
  error: string | null
}

export function useMedicineData(selectedLanguages: Language[]): UseMedicineDataReturn {
  const [medicines, setMedicines] = useState<MedicineTranslation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Call API to extract medicine information
  useEffect(() => {
    const fetchMedicineData = async () => {
      setLoading(true)
      setError(null)

      try {
        // Call the session extract API with hardcoded values
        const sessionResponse = await extractSessionMedicines({
          session_id: 'session_001',
          languages: ['zh-CN', 'id']
        })

        // Process each medicine and add image URLs
        const processedMedicines: MedicineTranslation[] = await Promise.all(
          sessionResponse.medicines.map(async (medicine: Medicine) => {
            try {
              // Try to fetch the image for each medicine
              const imageUrl = await fetchMedicineImage(medicine.filename.replace(/\.[^/.]+$/, '')) // Remove extension
              return {
                filename: medicine.filename,
                medicine_name: medicine.medicine_info.medicine_name,
                dosage: medicine.medicine_info.dosage,
                primary_language: medicine.medicine_info.primary_language,
                translations: medicine.medicine_info.translations,
                instructions: medicine.medicine_info.instructions,
                imageUrl
              }
            } catch (imageError) {
              console.warn(`Failed to load image for ${medicine.filename}:`, imageError)
              // Return medicine data without image
              return {
                filename: medicine.filename,
                medicine_name: medicine.medicine_info.medicine_name,
                dosage: medicine.medicine_info.dosage,
                primary_language: medicine.medicine_info.primary_language,
                translations: medicine.medicine_info.translations,
                instructions: medicine.medicine_info.instructions
              }
            }
          })
        )

        setMedicines(processedMedicines)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to extract medicine information')
        console.error('Error extracting medicine info:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMedicineData()
  }, []) // Remove dependency on selectedLanguages since we're using hardcoded languages

  return {
    medicines,
    loading,
    error
  }
}
