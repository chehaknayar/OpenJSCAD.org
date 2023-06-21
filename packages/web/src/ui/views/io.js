const html = require('nanohtml')
const FileSaver = require('file-saver')

const io = (state, i18n) => {
  const formatsList = state.io.availableExportFormats
    .map(({ name, displayName }) => {
      displayName = i18n.translate(displayName)
      const selected = state.io.exportFormat ? state.io.exportFormat.toLowerCase() === name.toLowerCase() : undefined
      return html`<option value=${name} selected='${selected}'>
      ${displayName}
    </option>`
    })

  const exportAvailable = state.io.availableExportFormats.length > 0
  const saveFile = () => {
    const blob = new Blob([require('./editor').getEditorSourceCode()], { type: 'text/javascript;charset=utf-8' })
    FileSaver.saveAs(blob, 'sourcecode.js')
  }
  return html`

  <span id='io'>
      <span id='exports' style='visibility:${exportAvailable ? 'visible' : 'hidden'}'>
        <button id='save' aria-label='save' onclick=${saveFile}>Save Code</button>
        <select id='exportFormats'>
        ${formatsList}
        </select>
        <input type='button' value="${i18n`Export Model`}" id="exportBtn"/>
       
      </span>
    </span>
   `
}

module.exports = io
