'use client'

import { useRouter } from 'next/navigation'
import { PillIcon } from '@/components/PillIcon'
import { CameraIcon } from '@/components/CameraIcon'
import { GlobeIcon } from '@/components/GlobeIcon'
import { SyncIcon } from '@/components/SyncIcon'
import { ShieldIcon } from '@/components/ShieldIcon'

export default function Home() {
  const router = useRouter()

  const handleStartExplanation = () => {
    router.push('/language-selection')
  }

  return (
    <main className="h-screen bg-blue-50 flex flex-col overflow-y-auto">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="max-w-4xl w-full space-y-12">
          {/* Logo and Header */}
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-teal-600 rounded-2xl flex items-center justify-center">
                <svg 
                  width="40" 
                  height="40" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" fill="currentColor"/>
                </svg>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              Medicine Label Explainer
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Bridge language barriers in healthcare by creating multilingual medicine explanations 
              that help pharmacists, patients, and caregivers communicate clearly about medication 
              instructions.
            </p>
          </div>

          {/* Main Action Card */}
          <div className="flex justify-center max-w-4xl mx-auto">
            {/* Start New Session Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6 max-w-lg w-full">
              <div className="space-y-4">
                <CameraIcon />
                <h2 className="text-2xl font-bold text-gray-900">
                  Start New Session
                </h2>
                <p className="text-gray-600">
                  For pharmacists and healthcare providers to create multilingual medicine explanations
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Capture photos of medicine labels</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Generate translations in multiple languages</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Share with patients and caregivers</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Guided explanation session</span>
                </div>
              </div>
              
              <button
                onClick={handleStartExplanation}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Start Session
              </button>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto pt-8">
            {/* 10+ Languages */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <GlobeIcon />
              </div>
              <h3 className="text-xl font-bold text-gray-900">11+ Languages</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Support for English, Spanish, French, Mandarin, Indonesian, Arabic, Portuguese, Hindi, Russian, Korean, and Japanese
              </p>
            </div>

            {/* Real-time Sync */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <SyncIcon />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Real-time Sync</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Synchronized sessions between pharmacists and patients for clear, guided explanations
              </p>
            </div>

            {/* No Account Required */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <ShieldIcon />
              </div>
              <h3 className="text-xl font-bold text-gray-900">No Account Required</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Start using immediately with temporary sessions - no registration or personal data storage
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
