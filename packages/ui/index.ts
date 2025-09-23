import * as React from 'react';

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary'|'ghost' }) {
  const { className = '', variant = 'primary', ...rest } = props;
  const base = 'rounded-2xl px-4 py-2 font-semibold';
  const styles = variant === 'primary' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-transparent border border-gray-300';
  return <button className={`${base} ${styles} ${className}`} {...rest} />;
}
export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className='', ...p }) =>
  <div className={`rounded-2xl bg-white shadow ${className}`} {...p} />;
