function initTheme() {
  document.documentElement.dataset.theme =
    localStorage.getItem('typedoc-theme') || 'os'
  const element = document.getElementById('theme-select')
  element.onchange = () => {
    document.documentElement.dataset.theme = element.value
    localStorage.setItem('typedoc-theme', element.value)
  }
}

function listenToCopyButtonClicks() {
  const delay = 1000
  const copyButtons = document.querySelectorAll('pre button')
  for (const button of copyButtons) {
    const originalText = button.textContent
    let timeout
    button.onclick = () => {
      const codeElement = button.previousElementSibling
      const code = codeElement.innerText.trim()
      navigator.clipboard.writeText(code)
      button.textContent = 'Copied!'
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => (button.textContent = originalText), delay)
    }
  }
}

function main() {
  initTheme()
  listenToCopyButtonClicks()
}

main()
