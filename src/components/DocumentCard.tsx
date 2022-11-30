import React, { memo } from 'react'

interface Props {
    emoji: string
    title: string
    name: string
}

export const DocumentCard: React.FC<Props> = memo(({emoji, title, name}) => {
    return (
        <div>
          <span>{emoji}</span>
          <span>{title}</span>
          <span>{name}</span>
        </div>
    )
  })

