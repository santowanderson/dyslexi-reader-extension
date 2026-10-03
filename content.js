// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'APPLY_STYLES') {
    const { useOpenDyslexic, fontSize, lineHeight, letterSpacing } = request;
    applyStyles(useOpenDyslexic, fontSize, lineHeight, letterSpacing);
  }
});

function applyStyles(useOpenDyslexic, fontSize, lineHeight, letterSpacing) {
  const styleId = 'dyslexia-helper-styles';
  let styleTag = document.getElementById(styleId);
  
  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.id = styleId;
    document.head.appendChild(styleTag);
  }

  // Define the font face if we want to use OpenDyslexic
  let fontFace = '';
  if (useOpenDyslexic) {
    fontFace = `
      @font-face {
        font-family: 'OpenDyslexic';
        src: url('fonts/OpenDyslexic-Regular.otf');
      }
    `;
  }

  styleTag.innerHTML = `
    ${fontFace}
    * {
      font-family: ${useOpenDyslexic ? "'OpenDyslexic', sans-serif" : "inherit"} !important;
      font-size: ${fontSize}px !important;
      line-height: ${lineHeight} !important;
      letter-spacing: ${letterSpacing}px !important;
    }
  `;
}
