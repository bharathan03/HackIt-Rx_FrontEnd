'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Language, LANGUAGES } from '@/constants/languages'
import { BackIcon } from '@/components/BackIcon'
import { MultiLanguageIcon } from '@/components/MultiLanguageIcon'
import { CheckIcon } from '@/components/CheckIcon'

export default function LanguageSelectionPage() {
  const router = useRouter()
  const [selectedLanguages, setSelectedLanguages] = useState<Language[]>([LANGUAGES[0]]) // English selected by default

  const handleLanguageToggle = (language: Language) => {
    setSelectedLanguages(prev => {
      const isSelected = prev.some(lang => lang.code === language.code)
      
      if (isSelected) {
        // Don't allow removing if it's the only language
        if (prev.length === 1) return prev
        return prev.filter(lang => lang.code !== language.code)
      } else {
        // Don't allow more than 3 languages
        if (prev.length >= 3) return prev
        return [...prev, language]
      }
    })
  }

  const isLanguageSelected = (language: Language) => {
    return selectedLanguages.some(lang => lang.code === language.code)
  }

  const handleBack = () => {
    router.push('/')
  }

  const handleContinue = () => {
    console.log('Selected languages:', selectedLanguages)
    // Encode selected languages as URL params
    const languageCodes = selectedLanguages.map(lang => lang.code).join(',')
    router.push(`/photo-capture?languages=${encodeURIComponent(languageCodes)}`)
  }

  const getContinueButtonText = () => {
    const count = selectedLanguages.length
    if (count === 1) return 'Continue with 1 Language'
    return `Continue with ${count} Languages`
  }

  const handleKeyDown = (event: React.KeyboardEvent, language: Language) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleLanguageToggle(language)
    }
  }

  return (
    <div className="h-screen bg-blue-50 flex flex-col overflow-hidden">
      <div className="container mx-auto px-4 py-4 max-w-2xl h-full flex flex-col">
        {/* Title - Fixed at top */}
        <div className="text-center mb-4 flex-shrink-0">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Select Languages
          </h1>
          <p className="text-base text-gray-600">
            Choose up to 3 languages for your multilingual session
          </p>
        </div>

        {/* Multi-Language Support Info - Fixed */}
        <div className="bg-blue-100 border border-blue-200 rounded-xl p-4 mb-4 flex-shrink-0">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              <MultiLanguageIcon />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1 text-base">
                Multi-Language Support
              </h3>
              <p className="text-blue-700 text-sm">
                Select languages for different participants. The first language will be used for original content, and others for translations.
              </p>
            </div>
          </div>
        </div>

        {/* Selected Languages - Fixed */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm mb-4 flex-shrink-0">
          <h3 className="font-semibold text-gray-900 mb-3 text-base text-center">
            Selected Languages ({selectedLanguages.length}/3)
          </h3>
          
          <div className="space-y-2">
            {selectedLanguages.map((language, index) => (
              <div 
                key={language.code}
                className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3 transition-all duration-200"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{language.flag}</span>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{language.name}</div>
                    <div className="text-xs text-gray-600">{language.nativeName}</div>
                  </div>
                </div>
                {index === 0 && (
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                    Primary
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Available Languages - Scrollable with responsive grid */}
        <div className="flex-1 flex flex-col min-h-0">
          <h3 className="font-semibold text-gray-900 mb-3 text-base text-center flex-shrink-0">
            Available Languages
          </h3>
          
                     <div className="flex-1 overflow-y-auto">
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pb-4">
               {LANGUAGES.map((language) => {
                const isSelected = isLanguageSelected(language)
                
                return (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageToggle(language)}
                    onKeyDown={(e) => handleKeyDown(e, language)}
                    className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${
                      isSelected 
                        ? 'bg-green-50 border-green-300 ring-2 ring-green-200 shadow-md' 
                        : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md hover:bg-gray-50'
                    } ${!isSelected && selectedLanguages.length >= 3 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    disabled={!isSelected && selectedLanguages.length >= 3}
                    aria-pressed={isSelected}
                    aria-label={`${isSelected ? 'Deselect' : 'Select'} ${language.name} (${language.nativeName})`}
                    tabIndex={0}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{language.flag}</span>
                      <div className="text-left">
                        <div className="font-semibold text-gray-900 text-sm">{language.name}</div>
                        <div className="text-xs text-gray-600">{language.nativeName}</div>
                      </div>
                    </div>
                    
                    {isSelected && (
                      <div className="bg-green-500 rounded-full p-1 flex-shrink-0">
                        <CheckIcon />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Action Buttons and Helper Text - Fixed at bottom */}
        <div className="space-y-3 flex-shrink-0 mt-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleBack}
              className="flex items-center justify-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 shadow-sm hover:shadow-md text-base sm:w-auto w-full"
              aria-label="Go back"
            >
              <BackIcon />
              <span>Back</span>
            </button>
            
            <button
              onClick={handleContinue}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl text-base"
              disabled={selectedLanguages.length === 0}
            >
              {getContinueButtonText()}
            </button>
          </div>

          <p className="text-center text-gray-500 text-sm">
            You can select 1-3 languages. The first language will be the primary language.
          </p>
        </div>
      </div>
    </div>
  )
}
