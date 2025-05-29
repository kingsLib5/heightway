// Popup.jsx
import React from 'react'
import { AiOutlineClose } from "react-icons/ai"
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'

export default function Popup({
  isOpen,
  onClose,
  onProceed,
  proceedTo,
  goBackOnClose,
  children,
}) {
  const navigate = useNavigate()
  if (!isOpen) return null

  const handleClose = () => {
    if (onClose) return onClose()
    if (goBackOnClose) return navigate(-1)
  }

  const handleProceed = () => {
    // 1. Close the modal
    if (onClose) onClose()
    // 2. Custom callback?
    if (onProceed) return onProceed()
    // 3. Or navigate
    if (proceedTo) navigate(proceedTo)
  }

  return createPortal(
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
      /* transparent background, pointer-events-none lets clicks pass through outside modal */
    >
      <div className="bg-white shadow-2xl rounded-lg overflow-hidden w-10/12 max-w-xl pointer-events-auto">
        {/* Header */}
        <div className="flex justify-end p-4">
          <AiOutlineClose 
            size={24} 
            className="cursor-pointer text-gray-500 hover:text-gray-800" 
            onClick={handleClose} 
          />
        </div>
        {/* Body */}
        <div className="px-8 pb-8">
          {children ?? (
            <>
              <h2 className="text-3xl font-light mb-4">
                You are leaving the <br/> HSBC Korea <br/> banking website.
              </h2>
              <p className="text-sm mb-6 leading-snug">
                Please be aware that the external site policies will differ from our website<br/>
                terms and conditions and privacy policy. The next site will open in a new<br/>
                browser window or tab.
              </p>
            </>
          )}
          {/* Footer */}
          <div className="flex justify-between items-center mt-6">
            <button 
              className="text-sm underline"
              onClick={handleClose}
            >
              Go back
            </button>
            <button 
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors text-sm"
              onClick={handleProceed}
            >
              I understand, let's proceed
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
