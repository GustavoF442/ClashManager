import React from 'react'

export default function LoadingSpinner({ text = "Carregando..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-amber-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-amber-600 animate-spin"></div>
      </div>
      <p className="mt-4 text-amber-700 font-semibold">{text}</p>
    </div>
  )
}
