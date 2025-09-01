interface ToastProps {
    message: string
    visible: boolean
    isVisible: boolean
  }
  
  export function Toast({ message, visible, isVisible }: ToastProps) {
    if (!visible) return null
  
    return (
      <div
        className={`fixed top-4 right-4 z-50 bg-[#A0E4D0] text-black px-6 py-3 rounded-lg shadow-lg transition-all duration-300 ease-in-out ${
          isVisible ? "animate-in slide-in-from-top-2 opacity-100 translate-y-0" : "opacity-0 translate-y-[-8px] scale-95"
        }`}
      >
        {message}
      </div>
    )
  }
  