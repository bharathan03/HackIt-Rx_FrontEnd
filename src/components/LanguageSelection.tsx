'use client'

import { useState } from 'react'
import { Language, LANGUAGES } from '@/constants/languages'
import { BackIcon } from '@/components/BackIcon'
import { MultiLanguageIcon } from '@/components/MultiLanguageIcon'
import { CheckIcon } from '@/components/CheckIcon'

interface LanguageSelectionProps {
  onBack: () => void
  onContinue: (selectedLanguages: Language[]) => void
}

export default function LanguageSelection({ onBack, onContinue }: LanguageSelectionProps) {
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

  const isPrimaryLanguage = (language: Language) => {
    return selectedLanguages[0]?.code === language.code
  }

  const getContinueButtonText = () => {
    const count = selectedLanguages.length
    if (count === 1) return 'Continue with 1 Language'
    return `Continue with ${count} Languages`
  }

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 overflow-y-auto">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6 pt-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all duration-200"
          >
            <BackIcon />
          </button>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Select Languages
          </h1>
          <p className="text-gray-600">
            Choose up to 3 languages for the session
          </p>
        </div>

        {/* Multi-Language Support Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
          <div className="flex items-start space-x-3">
            <MultiLanguageIcon />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">
                Multi-Language Support
              </h3>
              <p className="text-sm text-blue-700">
                Select languages for different participants. The first language will be used for original content, and others for translations.
              </p>
            </div>
          </div>
        </div>

        {/* Selected Languages */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">
            Selected Languages ({selectedLanguages.length}/3)
          </h3>
          
          {selectedLanguages.map((language, index) => (
            <div 
              key={language.code}
              className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl p-3 mb-2 last:mb-0"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{language.flag}</span>
                <div>
                  <div className="font-medium text-gray-900">{language.name}</div>
                  <div className="text-sm text-gray-600">{language.nativeName}</div>
                </div>
              </div>
              {index === 0 && (
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                  Primary Language
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Available Languages */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">
            Available Languages
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {LANGUAGES.map((language) => {
              const isSelected = isLanguageSelected(language)
              const isPrimary = isPrimaryLanguage(language)
              
              return (
                <button
                  key={language.code}
                  onClick={() => handleLanguageToggle(language)}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 ${
                    isSelected 
                      ? 'bg-green-50 border-green-500' 
                      : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{language.flag}</span>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">{language.name}</div>
                      <div className="text-sm text-gray-600">{language.nativeName}</div>
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

        {/* Continue Button */}
        <button
          onClick={() => onContinue(selectedLanguages)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-4"
        >
          {getContinueButtonText()}
        </button>

        {/* Helper Text */}
        <p className="text-center text-sm text-gray-500">
          You can select 1-3 languages. The first language will be the primary language.
        </p>
      </div>
    </div>
  )
}
