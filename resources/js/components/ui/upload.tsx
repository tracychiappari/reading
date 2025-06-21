import * as Headless from '@headlessui/react'
import clsx from 'clsx'
import React, { forwardRef } from 'react'

export const Upload = forwardRef(function Upload(
  {
    className,
    ...props
  }: {
    className?: string
    accept?: string
    multiple?: boolean
  } & Omit<Headless.InputProps, 'as' | 'className' | 'type'>,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <span
      data-slot="control"
      className={clsx([
        className,
        // Basic layout
        'relative block w-full',
        // Background color + shadow applied to inset pseudo element
        'before:absolute before:inset-px before:rounded-[calc(var(--radius-lg)-1px)] before:bg-white before:shadow-sm',
        'dark:before:hidden',
        // Focus ring
        'after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-transparent after:ring-inset sm:focus-within:after:ring-2 sm:focus-within:after:ring-blue-500',
        // Disabled state
        'has-data-disabled:opacity-50 has-data-disabled:before:bg-zinc-950/5 has-data-disabled:before:shadow-none',
        // Invalid state
        'has-data-invalid:before:shadow-red-500/10',
      ])}
    >
      <Headless.Input
        ref={ref}
        type="file"
        {...props}
        className={clsx([
          // Basic layout
          'relative block w-full appearance-none rounded-lg px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(1.5)-1px)]',
          // Typography
          'text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white',
          // Border
          'border border-zinc-950/10 data-hover:border-zinc-950/20 dark:border-white/10 dark:data-hover:border-white/20',
          // Background color
          'bg-transparent dark:bg-white/5',
          // Hide default focus styles
          'focus:outline-hidden',
          // File input specific styles
          'file:mr-4 file:py-2 file:px-4',
          'file:rounded-lg file:border-0',
          'file:text-sm file:font-medium',
          'file:bg-zinc-50 file:text-zinc-700',
          'file:cursor-pointer',
          'dark:file:bg-zinc-700 dark:file:text-zinc-100',
          'hover:file:bg-zinc-100 dark:hover:file:bg-zinc-600',
          // Invalid state
          'data-invalid:border-red-500 data-invalid:data-hover:border-red-500 dark:data-invalid:border-red-500 dark:data-invalid:data-hover:border-red-500',
          // Disabled state
          'data-disabled:border-zinc-950/20 dark:data-disabled:border-white/15 dark:data-disabled:bg-white/2.5 dark:data-hover:data-disabled:border-white/15',
          // System dark mode
          'dark:scheme-dark',
        ])}
      />
    </span>
  )
})
