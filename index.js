function removeAllChildren(element) {
  if (element instanceof HTMLElement) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
}

function convertToBase64URL(file) {
  const reader = new FileReader();
  reader.onloadend = () => {
    const result = document.getElementById("result");
    removeAllChildren(result);
    result.value = reader.result;
    result.removeAttribute('disabled');
    result.setAttribute('readonly', true);
  }

  reader.readAsDataURL(file);
}

function fileChangedHandler(e) {
  const { files } = e.target;
  const loadButton = document.getElementById("load-button");

  const loadFileAction = () => convertToBase64URL(files[0]);

  if (files.length > 0) {
    loadButton.removeAttribute('disabled');
    loadButton.addEventListener('click', loadFileAction);
  } else {
    loadButton.setAttribute('disabled', true);
    loadButton.removeEventListener('click', loadFileAction);
  }
}

const fileElement = document.getElementById("image-input");
fileElement.addEventListener('input', fileChangedHandler);