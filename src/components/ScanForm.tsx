import React, { useState } from 'react';
import { Play, Save } from 'lucide-react';
import type { ScanConfig } from '../types/scanner';
import { portGroups } from '../utils/commonPorts';

interface ScanFormProps {
  onStartScan: (config: ScanConfig) => void;
  onSaveProfile: (config: ScanConfig) => void;
}

export function ScanForm({ onStartScan, onSaveProfile }: ScanFormProps) {
  const [config, setConfig] = useState<ScanConfig>({
    target: '',
    portGroup: 'web',
    protocols: ['TCP'],
    timeout: 1000,
    threads: 10,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartScan(config);
  };

  const handleProtocolChange = (protocol: 'TCP' | 'UDP') => {
    setConfig(prev => ({
      ...prev,
      protocols: prev.protocols.includes(protocol)
        ? prev.protocols.filter(p => p !== protocol)
        : [...prev.protocols, protocol]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label className="block text-sm font-medium text-gray-700">Target IP/Range</label>
        <input
          type="text"
          value={config.target}
          onChange={(e) => setConfig({ ...config, target: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="192.168.1.1 or 192.168.1.1-255"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Port Group</label>
        <select
          value={config.portGroup}
          onChange={(e) => setConfig({ ...config, portGroup: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {portGroups.map(group => (
            <option key={group.id} value={group.id}>
              {group.name} ({group.ports.length} ports)
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Protocols</label>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={config.protocols.includes('TCP')}
              onChange={() => handleProtocolChange('TCP')}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <span className="ml-2">TCP</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={config.protocols.includes('UDP')}
              onChange={() => handleProtocolChange('UDP')}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <span className="ml-2">UDP</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Timeout (ms)</label>
          <input
            type="number"
            value={config.timeout}
            onChange={(e) => setConfig({ ...config, timeout: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Threads</label>
          <input
            type="number"
            value={config.threads}
            onChange={(e) => setConfig({ ...config, threads: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Play className="h-4 w-4 mr-2" />
          Start Scan
        </button>
        <button
          type="button"
          onClick={() => onSaveProfile(config)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Profile
        </button>
      </div>
    </form>
  );
}