import React from 'react'

export default function PrerequisiteCard({ title, description }: { title: string, description: string}) {
  return (
    <div className="w-[225px] h-full flex flex-col gap-3 p-4 bg-background rounded-md">
        <div className="w-full flex items-center justify-between">
            <p>{title}</p>
            <input type="checkbox" name="" id="" />
        </div>
        <p className="text-[#d4d1ff] text-sm">{description}</p>
    </div>
  )
}
