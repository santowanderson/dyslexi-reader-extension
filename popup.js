document.addEventListener('DOMContentLoaded', () => {
  const fontToggle = document.getElementById('font-family');
  const fontSizeInput = document.getElementById('font-size');
  const lineHeightInput = document.getElementById('line-height');
  const letterSpacingInput = document.getElementById('letter-spacing');

  const fontSizeValue = document.getElementById('font-size-value');
  const lineHeightValue = document.getElementById('line-height-value');
  const letterSpacingValue = document.getElementById('letter-spacing-value');

  fontSizeInput.oninput = () => {
    fontSizeValue.textContent = fontSizeInput.value;
    updateStyles();
  };
  lineHeightInput.oninput = () => {
    lineHeightValue.textContent = lineHeightInput.value;
    updateStyles();
  };
  letterSpacingInput.oninput = () => {
    letterSpacingValue.textContent = letterSpacingInput.value;
    updateStyles();
  };
  fontToggle.onchange = updateStyles;

  async function updateStyles() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.id && tab.url && tab.url.startsWith('http')) {
      chrome.tabs.sendMessage(tab.id, {
        type: 'APPLY_STYLES',
        useOpenDyslexic: fontToggle.checked,
        fontSize: fontSizeInput.value,
        lineHeight: lineHeightInput.value,
        letterSpacing: letterSpacingInput.value
      });
    }
  }

  // Initial update
  updateStyles();
});
