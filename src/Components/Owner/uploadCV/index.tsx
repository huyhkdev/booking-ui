import { Button } from 'antd'
import React, { useState } from 'react'

export interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & { files: FileList }
}

interface OwnerUploadCVProps {
  handleFileChange: (event: FileChangeEvent) => void
  handleSubmit: () => void
  setIsPopupVisible: (isVisible: boolean) => void
  isLoading?: boolean
}

export const OwnerUploadCV: React.FC<OwnerUploadCVProps> = ({
  handleFileChange,
  handleSubmit,
  setIsPopupVisible,
  isLoading
}) => {
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string>('')

  const onFileChange = (e: FileChangeEvent) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFileName(selectedFile.name)

      if (selectedFile.type === 'application/pdf') {
        const fileURL = URL.createObjectURL(selectedFile)
        setFilePreview(fileURL)
      } else {
        setFilePreview(null)
      }

      handleFileChange(e)
    }
  }

  return (
    <div className='fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
        <h2 className='text-xl font-bold mb-4'>Upload your CV</h2>

        <p className='text-sm text-gray-700 mb-4'>
          You need to upload your CV in order to register as an owner. Please upload a valid PDF to proceed.
        </p>

        <div>
          <label
            htmlFor='cvFile'
            className='cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md text-center w-full mb-4 flex justify-center items-center'
          >
            Select CV File
          </label>
          <input id='cvFile' type='file' accept='.pdf' onChange={onFileChange} className='hidden' />

          {fileName && <p className='text-sm mb-4'>{fileName}</p>}

          {filePreview && (
            <div className='mb-4'>
              <embed src={filePreview} width='100%' height='400px' type='application/pdf' />
            </div>
          )}

          <div className='flex justify-between items-center'>
            <Button loading={isLoading} onClick={handleSubmit} className='text-white px-4 py-2 rounded'>
              Upload
            </Button>
            <button
              type='button'
              onClick={() => setIsPopupVisible(false)}
              className='bg-gray-500 text-white px-4 py-2 rounded'
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
