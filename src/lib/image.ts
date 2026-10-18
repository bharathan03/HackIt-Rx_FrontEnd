// Downscale an image file to a small JPEG data URL so it can be kept in
// sessionStorage (≈5 MB limit) without ever being sent to a server.
// Resolves to '' if the image can't be decoded, so callers can treat it as optional.
export function createThumbnail(file: File, maxSize = 400, quality = 0.7): Promise<string> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file)
    const img = new Image()

    img.onload = () => {
      const scale = Math.min(1, maxSize / Math.max(img.width, img.height))
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(img.width * scale)
      canvas.height = Math.round(img.height * scale)

      const ctx = canvas.getContext('2d')
      if (!ctx) {
        URL.revokeObjectURL(url)
        resolve('')
        return
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      URL.revokeObjectURL(url)
      resolve(canvas.toDataURL('image/jpeg', quality))
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      resolve('')
    }

    img.src = url
  })
}
