import { removeAllChildren, convertToBase64URL } from './Util.js'

function App () {
  const app = document.getElementById('app')

  if (!app) {
    throw new Error('No div#app element found')
  }

  const appContainer = document.createElement('div')
  appContainer.className = 'app-container d-flex vw-100 vh-100 align-items-center justify-content-center'

  const card = document.createElement('div')
  card.className = 'card d-flex flex-column gap-3 p-3'

  const title = document.createElement('h3')
  title.appendChild(document.createTextNode('Convert image to Base64'))

  const convertButton = document.createElement('button')
  convertButton.id = 'convert-button'
  convertButton.setAttribute('disabled', true)
  convertButton.appendChild(document.createTextNode('Convert'))

  convertButton.className = 'btn btn-primary'

  const fileInput = document.createElement('input')
  fileInput.type = 'file'
  fileInput.id = 'image-input'
  fileInput.accept = '*.jpg,*.jpeg,*.png'
  fileInput.className = 'form-control'

  const resultInputGroup = document.createElement('div')
  resultInputGroup.className = 'input-group mb-3'

  const resultField = document.createElement('input')
  resultField.type = 'text'
  resultField.id = 'result'
  resultField.placeholder = 'Base64 data URL'
  resultField.setAttribute('disabled', true)
  resultField.className = 'form-control'

  const resultCopyBtn = document.createElement('button')
  const icon = document.createElement('i')
  resultCopyBtn.className = 'btn btn-outline-primary'
  icon.className = 'bi bi-clipboard-fill'

  resultCopyBtn.setAttribute('disabled', true)
  resultCopyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(resultField.value)
    resultCopyBtn.className = 'btn btn-outline-secondary'
    icon.className = 'bi bi-clipboard-check'
  })

  resultCopyBtn.appendChild(icon)

  resultInputGroup.append(resultField, resultCopyBtn)

  const onConvertDone = result => {
    removeAllChildren(resultField)

    resultField.value = result
    resultField.removeAttribute('disabled')
    resultField.setAttribute('readonly', true)

    resultCopyBtn.removeAttribute('disabled')
  }

  const onError = err => {
    alert(err)
    console.error(err)
  }

  const fileChangedHandler = function (e) {
    const { files } = e.target

    const loadFileAction = () => {
      convertToBase64URL(files[0])
        .then(onConvertDone)
        .catch(onError)
    }

    if (files.length > 0) {
      convertButton.removeAttribute('disabled')
      convertButton.addEventListener('click', loadFileAction)

      resultCopyBtn.className = 'btn btn-outline-primary'
      icon.className = 'bi bi-clipboard-fill'

      resultField.value = ''
      resultField.setAttribute('disabled', true)
      resultCopyBtn.setAttribute('disabled', true)
    } else {
      convertButton.setAttribute('disabled', true)
      convertButton.removeEventListener('click', loadFileAction)
    }
  }
  fileInput.addEventListener('change', fileChangedHandler)

  card.append(title, fileInput, convertButton, resultInputGroup)
  appContainer.appendChild(card)
  app.appendChild(appContainer)
}

export default App
