import React from 'react'
import { GrammarlyEditorPlugin } from '@grammarly/editor-sdk-react'

function GrammarlyEditor() {
  return (
    <GrammarlyEditorPlugin clientId="client_SKxFWvk1mCTeM6UPmf9L8d">
      <textarea />
    </GrammarlyEditorPlugin>
  )
}
export default GrammarlyEditor;