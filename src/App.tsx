import React, { useState } from 'react'
import { AvatarUploadStateMachine } from './packages/StateMachine'
import { FileWithPreview } from './types/Files'

function App(): React.ReactElement {
  const [files, setFiles] = useState<FileWithPreview[]>([])

  return <AvatarUploadStateMachine files={files} setFiles={setFiles} />
}

export default App
