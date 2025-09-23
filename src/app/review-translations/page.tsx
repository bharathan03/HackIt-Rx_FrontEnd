'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Language, LANGUAGES } from '@/constants/languages'
import { useMedicineData } from './data'

// Back Arrow Icon
const BackIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="text-gray-700"
  >
    <path 
      d="M15 18L9 12L15 6" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
)

// Edit Icon
const EditIcon = () => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="text-gray-500"
  >
    <path 
      d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89783 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
)

// Translate Icon
const TranslateIcon = () => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="text-blue-600"
  >
    <path 
      d="M12.87 15.07L10.33 12.56L10.36 12.53C12.1 10.59 13.34 8.36 14.07 6H17V4H10V2H8V4H1V6H12.17C11.5 7.92 10.44 9.75 9 11.35C8.07 10.32 7.3 9.19 6.69 8H4.69C5.42 9.63 6.42 11.17 7.67 12.56L2.58 17.58L4 19L9 14L12.11 17.11L12.87 15.07ZM18.5 10H16.5L12 22H14L15.12 19H19.87L21 22H23L18.5 10ZM15.88 17L17.5 12.67L19.12 17H15.88Z" 
      fill="currentColor"
    />
  </svg>
)

export default function ReviewTranslationsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedLanguages, setSelectedLanguages] = useState<Language[]>([])
  
  // Use the custom hook for medicine data
  const { medicines, loading, error } = useMedicineData(selectedLanguages)

  // Get selected languages from URL params
  useEffect(() => {
    const languageParam = searchParams.get('languages')
    if (languageParam) {
      const languageCodes = languageParam.split(',')
      const languages = languageCodes.map(code => 
        LANGUAGES.find(lang => lang.code === code.trim())
      ).filter(Boolean) as Language[]
      setSelectedLanguages(languages)
    } else {
      // Fallback to English if no languages specified
      setSelectedLanguages([LANGUAGES[0]])
    }
  }, [searchParams])

  const handleBack = () => {
    router.push('/photo-capture')
  }

  const primaryLanguage = selectedLanguages[0] || LANGUAGES[0]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200" style={{ paddingLeft: '20vw', paddingRight: '20vw', paddingTop: '1rem', paddingBottom: '1rem' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              <BackIcon />
              <span className="font-medium">Back</span>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Review Translations</h1>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-lg">{primaryLanguage.flag}</span>
                <span className="text-sm text-gray-600">{primaryLanguage.name}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <TranslateIcon />
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-green-50 border border-green-200 mt-6 rounded-lg p-4" style={{ marginLeft: '20vw', marginRight: '20vw' }}>
        <p className="text-green-800 text-sm">
          Review the translations for all selected languages. Tap the edit icon to make changes if needed.
        </p>
      </div>

      {/* Content */}
      <div className="py-6" style={{ paddingLeft: '20vw', paddingRight: '20vw' }}>
        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Extracting medicine information...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Success State - Medicines Cards */}
        {!loading && !error && medicines.length > 0 && (
          <div className="space-y-6">
            {medicines.map((medicine, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">Medicine {index + 1}</h3>
                      <p className="text-sm text-gray-600 mt-1">File: {medicine.filename}</p>
                    </div>
                    <button className="p-2 hover:bg-white hover:bg-opacity-50 rounded-lg transition-colors duration-200">
                      <EditIcon />
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  {/* Medicine Content Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Medicine Image - Left Column */}
                    <div className="lg:col-span-1">
                      <div className="w-full h-48 bg-gradient-to-br from-blue-900 to-gray-700 rounded-lg overflow-hidden">
                        {medicine.imageUrl ? (
                          <img
                            src={medicine.imageUrl}
                            alt={`Medicine: ${medicine.medicine_name}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              console.error('Image failed to load:', medicine.imageUrl);
                              e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%23374151'/%3E%3Ctext x='200' y='100' text-anchor='middle' dy='.3em' fill='white' font-family='Arial' font-size='16'%3EImage Load Error%3C/text%3E%3C/svg%3E";
                            }}
                            onLoad={() => {
                              console.log('Medicine image loaded successfully:', medicine.medicine_name);
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-center text-white">
                              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto mb-2"></div>
                              <p className="text-xs">Loading...</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Medicine Details - Right Column */}
                    <div className="lg:col-span-2 space-y-6">
                      {/* Primary Language Section */}
                      <div className="border-l-4 border-blue-500 pl-4">
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="text-lg">🇬🇧</span>
                          <span className="text-sm font-medium text-gray-700 uppercase bg-blue-100 px-2 py-1 rounded">
                            {medicine.primary_language} (PRIMARY)
                          </span>
                        </div>
                        <h4 className="text-xl font-semibold text-gray-900 mb-2">
                          {medicine.medicine_name}
                        </h4>
                        <div className="inline-block bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                          Dosage: {medicine.dosage}
                        </div>
                      </div>

                      {/* Translations Section */}
                      {medicine.translations.length > 0 && (
                        <div>
                          <div className="text-sm font-medium text-gray-700 uppercase mb-3 border-b border-gray-200 pb-1">
                            TRANSLATIONS
                          </div>
                          <div className="space-y-3">
                            {medicine.translations.map((translation, transIndex) => (
                              <div key={transIndex} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border-l-4 border-green-500">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="text-lg">
                                    {translation.language === 'Mandarin Chinese (zh-CN)' ? '🇨🇳' : 
                                     translation.language === 'Indonesian' ? '🇮🇩' : '🌐'}
                                  </span>
                                  <span className="text-sm font-semibold text-gray-700">
                                    {translation.language}
                                  </span>
                                </div>
                                <div className="space-y-2">
                                  <div>
                                    <span className="text-xs text-gray-600 uppercase">Medicine Name:</span>
                                    <p className="text-gray-900 font-medium">{translation.medicine_name_translation}</p>
                                  </div>
                                  <div>
                                    <span className="text-xs text-gray-600 uppercase">Dosage:</span>
                                    <p className="text-gray-900">{translation.dosage_translation}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Instructions Section */}
                      <div>
                        <div className="text-sm font-medium text-gray-700 uppercase mb-3 border-b border-gray-200 pb-1">
                          INSTRUCTIONS
                        </div>
                        <div className="space-y-3">
                          {medicine.instructions.map((instruction, instrIndex) => (
                            <div key={instrIndex} className="bg-gray-50 rounded-lg p-4">
                              <div className="flex items-center space-x-2 mb-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-sm font-semibold text-gray-700">
                                  {instruction.language}
                                </span>
                                <span className="text-lg">
                                  {instruction.language.includes('Chinese') ? '🇨🇳' : 
                                   instruction.language === 'Indonesian' ? '🇮🇩' : 
                                   instruction.language === 'English' ? '🇬🇧' : '🌐'}
                                </span>
                              </div>
                              <p className="text-gray-900 leading-relaxed">
                                {instruction.text}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No medicines found */}
        {!loading && !error && medicines.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <p className="text-yellow-800">No medicine information could be extracted from the image.</p>
          </div>
        )}

        {/* Statistics */}
        {!loading && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-2xl font-bold text-gray-900">{medicines.length}</div>
                <div className="text-sm text-gray-600">Total medicines processed:</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{selectedLanguages.length}</div>
                <div className="text-sm text-gray-600">Languages supported:</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
