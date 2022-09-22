export function removeAllChildren (element) {
  if (element instanceof HTMLElement) {
    while (element.firstChild) {
      element.removeChild(element.firstChild)
    }
  }
}

export async function convertToBase64URL (file) {
  const reader = new FileReader()

  reader.readAsDataURL(file)

  return new Promise((resolve) => {
    reader.onloadend = () => resolve(reader.result)
  }, (reject) => {
    reader.onerror = () => reject('Unable to load file')
  })
}
