'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Language, LANGUAGES } from '@/constants/languages'

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



// Upload Icon
const UploadIcon = () => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="text-blue-600"
  >
    <path 
      d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <polyline 
      points="7,10 12,5 17,10" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <line 
      x1="12" 
      y1="5" 
      x2="12" 
      y2="15" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
  </svg>
)

// Photo Placeholder Icon
const PhotoPlaceholderIcon = () => (
  <svg 
    width="80" 
    height="80" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="text-gray-400"
  >
    <rect 
      x="3" 
      y="3" 
      width="18" 
      height="18" 
      rx="2" 
      ry="2" 
      stroke="currentColor" 
      strokeWidth="2"
    />
    <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2"/>
    <polyline 
      points="21,15 16,10 5,21" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
)

// Remove/Close Icon
const RemoveIcon = () => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="text-white"
  >
    <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

interface UploadedPhoto {
  id: string
  file: File
  preview: string
  name: string
}

export default function PhotoCapturePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedPhoto[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<Language[]>([])
  const [isDragOver, setIsDragOver] = useState(false)

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
    router.push('/language-selection')
  }

  const handleUploadFromGallery = () => {
    // Create a hidden file input element
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.accept = 'image/*'
    fileInput.multiple = true
    
    fileInput.onchange = (event) => {
      const target = event.target as HTMLInputElement
      const files = target.files
      if (files) {
        handleFileUpload(Array.from(files))
      }
    }
    
    fileInput.click()
  }

  const handleFileUpload = (files: File[]) => {
    const newPhotos: UploadedPhoto[] = []
    
    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const preview = e.target?.result as string
          const newPhoto: UploadedPhoto = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            file,
            preview,
            name: file.name
          }
          newPhotos.push(newPhoto)
          
          // Update state when all files are processed
          if (newPhotos.length === files.length) {
            setUploadedPhotos(prev => [...prev, ...newPhotos])
          }
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const handleRemovePhoto = (photoId: string) => {
    setUploadedPhotos(prev => prev.filter(photo => photo.id !== photoId))
  }

  const handleProcessPhotos = () => {
    // Navigate to review translations page with selected languages and session_id
    const languageParam = selectedLanguages.map(lang => lang.code).join(',')
    router.push(`/review-translations?languages=${languageParam}&session_id=session_001`)
  }

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    handleFileUpload(files)
  }

  return (
    <div className="h-screen bg-blue-50 flex">
      {/* Left Panel */}
      <div className="w-1/2 p-8 flex flex-col">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 transition-colors duration-200 mb-4"
          >
            <BackIcon />
            <span className="text-lg font-medium">Back</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Upload Medicine Photos
          </h1>
          <p className="text-gray-600">
            Upload photos of all medicine labels from your device
          </p>
        </div>

        {/* Photo Upload Info */}
        <div className="bg-blue-100 rounded-2xl p-6 mb-8">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 mt-1">
              <UploadIcon />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-3 text-lg">
                Photo Upload
              </h3>
              <ul className="space-y-2 text-blue-700">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                  <span>Upload photos of all medicine labels at once</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                  <span>Ensure photos have good lighting and clear text</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                  <span>Labels should be flat and fully visible</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                  <span>Multiple file formats supported</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mb-8">
          <button
            onClick={handleUploadFromGallery}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center space-x-2"
          >
            <UploadIcon />
            <span>Upload from Device</span>
          </button>
        </div>

        {/* Selected Languages */}
        <div className="mt-auto">
          <h3 className="font-semibold text-gray-700 mb-3">Selected Languages:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedLanguages.map((language, index) => (
              <div 
                key={language.code}
                className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg px-3 py-2"
              >
                <span className="text-lg">{language.flag}</span>
                <span className="text-sm font-medium text-gray-700">{language.name}</span>
                {index === 0 && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                    Primary
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Photo Upload Area */}
      <div className="w-1/2 p-8">
        <div 
          className={`h-full border-2 border-dashed rounded-2xl bg-white flex flex-col transition-colors duration-200 ${
            isDragOver 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {uploadedPhotos.length === 0 ? (
            // Empty state
            <div className="flex-1 flex flex-col items-center justify-center space-y-6">
              <PhotoPlaceholderIcon />
              
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {isDragOver ? 'Drop photos here' : 'No photos uploaded yet'}
                </h3>
                <p className="text-gray-600 mb-8">
                  {isDragOver 
                    ? 'Release to upload your photos' 
                    : 'Click to upload or drag and drop photos here'
                  }
                </p>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleUploadFromGallery}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center space-x-2"
                >
                  <UploadIcon />
                  <span>Upload Photos</span>
                </button>
              </div>
            </div>
          ) : (
            // Photos uploaded state
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Uploaded Photos ({uploadedPhotos.length})
                </h3>
                <button
                  onClick={handleUploadFromGallery}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center space-x-2 text-sm"
                >
                  <UploadIcon />
                  <span>Add More</span>
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                <div className="grid grid-cols-2 gap-4">
                  {uploadedPhotos.map((photo) => (
                    <div key={photo.id} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                        <img
                          src={photo.preview}
                          alt={photo.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        onClick={() => handleRemovePhoto(photo.id)}
                        className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        title="Remove photo"
                      >
                        <RemoveIcon />
                      </button>
                      <p className="mt-2 text-xs text-gray-600 truncate" title={photo.name}>
                        {photo.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Process Photos Button */}
              <div className="p-4 border-t border-gray-200">
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600">
                    All photos will be processed and translated simultaneously into {selectedLanguages.length} language{selectedLanguages.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <button
                  onClick={handleProcessPhotos}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center space-x-2"
                >
                  <span>Process {uploadedPhotos.length} Photo{uploadedPhotos.length !== 1 ? 's' : ''}</span>
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                  >
                    <path 
                      d="M9 18L15 12L9 6" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
