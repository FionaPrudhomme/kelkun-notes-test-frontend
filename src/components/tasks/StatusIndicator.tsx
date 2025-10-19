'use client';

import { FC } from 'react';
import { Dot } from 'lucide-react';
import clsx from 'clsx';

interface StatusIndicatorProps {
  status: string;
  size?: number;
  className?: string;
}

export const StatusIndicator: FC<StatusIndicatorProps> = ({ status, size = 12, className }) => {
  const colorClass = {
    'À faire': 'text-gray-400',
    'En cours': 'text-yellow-400',
    'Terminé': 'text-green-500',
  }[status];

  return (
    <div title={status} className={clsx('inline-flex items-center', className)}>
      <Dot
        size={size}
        strokeWidth={10}
        className={clsx(colorClass, 'transition-transform hover:scale-110')}
      />
    </div>
  );
};
