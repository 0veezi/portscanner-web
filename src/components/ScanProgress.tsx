import React from 'react';
import { Loader } from 'lucide-react';

interface ScanProgressProps {
  current: number;
  total: number;
  isScanning: boolean;
}

export function ScanProgress({ current, total, isScanning }: ScanProgressProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Scan Progress</span>
        <span className="text-sm text-gray-500">{`${current} / ${total} ports`}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {isScanning && (
        <div className="flex items-center justify-center mt-2 text-sm text-gray-500">
          <Loader className="animate-spin h-4 w-4 mr-2" />
          Scanning in progress...
        </div>
      )}
    </div>
  );
}