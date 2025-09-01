"use client"

interface MultiSelectDropdownProps {
  label: string
  options: string[]
  selectedValues: string[]
  onSelect: (value: string) => void
  onRemove: (value: string) => void
  isOpen: boolean
  onToggle: () => void
  placeholder: string
  error?: string
  accentColor: string
}

export function MultiSelectDropdown({
  label,
  options,
  selectedValues,
  onSelect,
  onRemove,
  isOpen,
  onToggle,
  placeholder,
  error,
  accentColor,
}: MultiSelectDropdownProps) {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-black mb-2">{label}</label>
      <div
        data-dropdown
        className={`w-full min-h-[48px] px-4 py-3 bg-gray-50 rounded-lg border cursor-pointer transition-all ${
          error
            ? "border-red-300 focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-100"
            : `border-gray-200 focus-within:border-[${accentColor}] focus-within:ring-2 focus-within:ring-[${accentColor}]/20`
        }`}
        onClick={onToggle}
      >
        <div className="flex flex-wrap gap-2 items-center">
          {selectedValues.length > 0 ? (
            selectedValues.map((value) => (
              <span
                key={value}
                className={`inline-flex items-center gap-1 px-2 py-1 bg-[${accentColor}]/20 text-[${accentColor}] text-sm rounded-md border border-[${accentColor}]/30`}
              >
                {value}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    onRemove(value)
                  }}
                  className={`ml-1 text-[${accentColor}] hover:text-[${accentColor}]/70`}
                >
                  ×
                </button>
              </span>
            ))
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
          <svg
            className={`ml-auto w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          data-dropdown
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {options.map((option) => (
            <div
              key={option}
              className={`px-4 py-3 cursor-pointer hover:bg-gray-50 flex items-center justify-between ${
                selectedValues.includes(option) ? `bg-[${accentColor}]/10 text-[${accentColor}]` : "text-gray-700"
              }`}
              onClick={() => onSelect(option)}
            >
              <span>{option}</span>
              {selectedValues.includes(option) && (
                <svg className={`w-5 h-5 text-[${accentColor}]`} fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
      )}

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  )
}
