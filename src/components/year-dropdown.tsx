"use client"

interface YearDropdownProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: number[]
  isOpen: boolean
  onToggle: () => void
  placeholder: string
  error?: string
  accentColor: string
}

export function YearDropdown({
  label,
  value,
  onChange,
  options,
  isOpen,
  onToggle,
  placeholder,
  error,
  accentColor,
}: YearDropdownProps) {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-black mb-2">{label}</label>
      <div
        data-dropdown
        className={`w-full px-4 py-3 bg-gray-50 rounded-lg border cursor-pointer transition-all ${
          error
            ? "border-red-300 focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-100"
            : `border-gray-200 focus-within:border-[${accentColor}] focus-within:ring-2 focus-within:ring-[${accentColor}]/20`
        }`}
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <span className={value ? "text-black" : "text-gray-400"}>{value || placeholder}</span>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
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
          {options.map((year) => (
            <div
              key={year}
              className={`px-4 py-3 cursor-pointer hover:bg-gray-50 ${
                value === year.toString() ? `bg-[${accentColor}]/10 text-[${accentColor}]` : "text-gray-700"
              }`}
              onClick={() => onChange(year.toString())}
            >
              {year}
            </div>
          ))}
        </div>
      )}

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  )
}
