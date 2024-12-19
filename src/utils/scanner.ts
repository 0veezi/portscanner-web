import { ScanResult, ScanConfig } from '../types/scanner';
import { portGroups } from './commonPorts';

export async function scanPort(ip: string, port: number, protocol: 'TCP' | 'UDP', config: ScanConfig): Promise<ScanResult> {
  // Simulate scanning delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 500));

  const status = Math.random() > 0.8 ? 'open' : (Math.random() > 0.5 ? 'closed' : 'filtered');
  const commonServices: Record<number, string> = {
    21: 'FTP',
    22: 'SSH',
    23: 'Telnet',
    25: 'SMTP',
    53: 'DNS',
    80: 'HTTP',
    443: 'HTTPS',
    3306: 'MySQL',
    5432: 'PostgreSQL',
    27017: 'MongoDB'
  };

  return {
    id: `${ip}-${port}-${protocol}-${Date.now()}`,
    timestamp: new Date(),
    target: ip,
    port,
    protocol,
    status,
    service: commonServices[port],
    responseTime: Math.floor(Math.random() * 100)
  };
}

export function getPortsToScan(config: ScanConfig): number[] {
  const group = portGroups.find(g => g.id === config.portGroup);
  return group ? group.ports : [];
}

export function exportToCSV(results: ScanResult[]): string {
  const headers = ['Timestamp', 'Target', 'Port', 'Protocol', 'Status', 'Service', 'Response Time'];
  const rows = results.map(result => [
    result.timestamp.toISOString(),
    result.target,
    result.port,
    result.protocol,
    result.status,
    result.service || '',
    result.responseTime
  ]);
  
  return [headers, ...rows].map(row => row.join(',')).join('\n');
}

export function exportToJSON(results: ScanResult[]): string {
  return JSON.stringify(results, null, 2);
}