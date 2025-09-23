import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Medicine extraction API
export interface ExtractMedicineRequest {
  filename: string
  languages: string[]
}

export interface Instruction {
  language: string
  text: string
}

export interface ExtractMedicineResponse {
  medicine_name: string
  dosage: string
  primary_language: string
  translations: string[]
  instructions: Instruction[]
}

// Session extraction API
export interface SessionExtractRequest {
  session_id: string
  languages: string[]
}

export interface Translation {
  language: string
  medicine_name_translation: string
  dosage_translation: string
}

export interface MedicineInfo {
  medicine_name: string
  dosage: string
  primary_language: string
  translations: Translation[]
  instructions: Instruction[]
}

export interface Medicine {
  filename: string
  medicine_info: MedicineInfo
}

export interface SessionExtractResponse {
  session_id: string
  medicines: Medicine[]
}

export const extractMedicineInfo = async (request: ExtractMedicineRequest): Promise<ExtractMedicineResponse> => {
  // Changing /extract to /upload 
  const response = await fetch(`${API_BASE_URL}/upload`, { 
  method: 'POST', 
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(request),
})

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export const extractSessionMedicines = async (request: SessionExtractRequest): Promise<SessionExtractResponse> => {
  const response = await fetch(`${API_BASE_URL}/session/extract`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(request),
})

  if (!response.ok) {
    throw new Error(`Session extract API request failed: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export const fetchMedicineImage = async (filename: string = 'test'): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/image/${filename}`, {
  method: 'GET',
})

  if (!response.ok) {
    throw new Error(`Image fetch failed: ${response.status} ${response.statusText}`)
  }

  // Convert the response to a blob and then to a data URL for display
  const blob = await response.blob()
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}
