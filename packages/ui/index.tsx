'use client';
import * as React from 'react';

type Variant = 'default' | 'ghost' | 'outline';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  className?: string; // garante a prop mesmo se os tipos não carregarem
}

const base = 'rounded-2xl px-4 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2';
const variants: Record<Variant, string> = {
  default: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600',
  ghost: 'bg-transparent text-blue-700 hover:bg-blue-50 focus:ring-blue-600',
  outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-600',
};

export function Button({ className = '', variant = 'default', ...rest }: ButtonProps) {
  return <button className={`${base} ${variants[variant]} ${className}`} {...rest} />;
}

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', ...p }) =>
  <div className={`rounded-2xl bg-white shadow ${className}`} {...p} />;
