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

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('medicineResults')
      if (!raw) {
        setError('No medicine data found. Please go back and upload photos.')
        setLoading(false)
        return
      }

      const results = JSON.parse(raw) as Array<{
        filename: string
        original_text: string
        translations: Record<string, string>
      }>

      const processed: MedicineTranslation[] = results.map((result) => ({
        filename: result.filename,
        medicine_name: result.original_text,
        dosage: '',
        primary_language: 'English',
        translations: Object.entries(result.translations).map(([lang, text]) => ({
          language: lang,
          medicine_name_translation: text,
          dosage_translation: ''
        })),
        instructions: []
      }))

      setMedicines(processed)
    } catch (err) {
      setError('Failed to load medicine data.')
    } finally {
      setLoading(false)
    }
  }, [])

  return { medicines, loading, error }
}
