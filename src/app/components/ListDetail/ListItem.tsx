'use client'

import * as React from 'react'
import { dateHelper } from '@/app/lib/utils'

interface Props {
  title?: string
  href: string
  description?: string | React.ReactElement | null
  byline: string | React.ReactElement
  leadingAccessory?: React.ReactElement
  onClick?: (e: any) => void
  active?: boolean
}

export function ListItem({
  title,
  description,
  byline,
  href,
  leadingAccessory,
  onClick,
  active,
}: Props) {
  const { day, month } = dateHelper({ timestamp: byline as string })
  return (
    <a href={href}>
      <span
        onClick={onClick && onClick}
        className={`flex space-x-3 border-b border-gray-100 px-3.5 py-3 text-sm  hover:rounded-md hover:bg-slate-100 lg:rounded-sm lg:border-none lg:py-2 ${active ? 'bg-slate-100' : ''}`}
      >
        {leadingAccessory && <>{leadingAccessory}</>}
        <div
          className={`${byline && typeof byline === 'string'
            ? 'flex justify-between space-x-5 space-y-1'
            : 'flex flex-col justify-center'
            }`}
        >
          {byline && typeof byline === 'string' ? (
            <>
              <div className=" w-18 flex flex-col justify-center rounded-md border-2 border-slate-900 bg-slate-100 bg-opacity-25 text-center text-opacity-80 hover:no-underline">
                <div className="w-12 pt-2 text-xs text-slate-900">{month}</div>
                <div className="w-12 pb-2 text-2xl font-semibold text-slate-900">
                  {day}
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="line-clamp-1 font-medium">{title}</div>
                {description && (
                  <div className="line-clamp-1 text-opacity-80">
                    {description}
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col justify-center">
                <div className="line-clamp-1 font-medium">{title}</div>
                {description && (
                  <div className="line-clamp-1 text-opacity-60">
                    {description}
                  </div>
                )}
                <div className="line-clamp-1  text-opacity-40">{byline}</div>
              </div>
            </>
          )}
        </div>
      </span>
    </a>
  )
}
