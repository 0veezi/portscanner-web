export interface ScanConfig {
  target: string;
  portGroup: string;
  protocols: ('TCP' | 'UDP')[];
  timeout: number;
  threads: number;
}

export interface ScanResult {
  id: string;
  timestamp: Date;
  target: string;
  port: number;
  protocol: 'TCP' | 'UDP';
  status: 'open' | 'closed' | 'filtered';
  service?: string;
  responseTime: number;
}