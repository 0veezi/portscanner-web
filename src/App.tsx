import React, { useState } from 'react';
import { ScanForm } from './components/ScanForm';
import { ScanProgress } from './components/ScanProgress';
import { ScanResults } from './components/ScanResults';
import { scanPort, exportToCSV, exportToJSON, getPortsToScan } from './utils/scanner';
import type { ScanConfig, ScanResult } from './types/scanner';
import { Shield } from 'lucide-react';
import toast from 'react-hot-toast';

function App() {
  const [results, setResults] = useState<ScanResult[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  const handleStartScan = async (config: ScanConfig) => {
    if (isScanning) return;
    if (config.protocols.length === 0) {
      toast.error('Please select at least one protocol');
      return;
    }

    setIsScanning(true);
    setResults([]);
    
    const portsToScan = getPortsToScan(config);
    const totalScans = portsToScan.length * config.protocols.length;
    setProgress({ current: 0, total: totalScans });

    try {
      for (const port of portsToScan) {
        for (const protocol of config.protocols) {
          const result = await scanPort(config.target, port, protocol, config);
          setResults(prev => [...prev, result]);
          setProgress(prev => ({ ...prev, current: prev.current + 1 }));
        }
      }
      toast.success('Scan completed successfully');
    } catch (error) {
      toast.error('Error during scan');
      console.error('Scan error:', error);
    } finally {
      setIsScanning(false);
    }
  };

  const handleExport = (format: 'csv' | 'json') => {
    const data = format === 'csv' ? exportToCSV(results) : exportToJSON(results);
    const blob = new Blob([data], { type: format === 'csv' ? 'text/csv' : 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scan-results.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setResults([]);
    toast.success('Results cleared');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Port Scanner</h1>
            </div>
          </div>

          <div className="space-y-6">
            <ScanForm
              onStartScan={handleStartScan}
              onSaveProfile={(config) => {
                toast.success('Profile saved');
              }}
            />

            {(isScanning || results.length > 0) && (
              <ScanProgress
                current={progress.current}
                total={progress.total}
                isScanning={isScanning}
              />
            )}

            {results.length > 0 && (
              <ScanResults
                results={results}
                onExport={handleExport}
                onClear={handleClear}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;