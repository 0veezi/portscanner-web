export const commonPorts = {
  web: [80, 443, 8080, 8443],
  database: [1433, 3306, 5432, 27017, 6379],
  mail: [25, 110, 143, 465, 587, 993],
  file: [20, 21, 22, 69, 115, 139, 445],
  dns: [53, 853],
  monitoring: [161, 162, 389, 636],
  gaming: [3074, 3478, 3479, 3480],
  remote: [3389, 5900, 5938]
};

export const portGroups = [
  { id: 'all', name: 'All Common Ports', ports: Object.values(commonPorts).flat() },
  { id: 'web', name: 'Web Services', ports: commonPorts.web },
  { id: 'database', name: 'Databases', ports: commonPorts.database },
  { id: 'mail', name: 'Mail Services', ports: commonPorts.mail },
  { id: 'file', name: 'File Transfer', ports: commonPorts.file },
  { id: 'dns', name: 'DNS Services', ports: commonPorts.dns },
  { id: 'monitoring', name: 'Monitoring', ports: commonPorts.monitoring },
  { id: 'gaming', name: 'Gaming', ports: commonPorts.gaming },
  { id: 'remote', name: 'Remote Access', ports: commonPorts.remote }
];
