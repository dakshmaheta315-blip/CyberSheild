import React, { useState } from 'react';
import { urlScannerService } from '../services/urlScannerService';

export default function UrlScanner() {
  const [targetUrl, setTargetUrl] = useState('');
  const [scanResult, setScanResult] = useState(null);

  const handleScan = (e) => {
    e.preventDefault();
    const result = urlScannerService.analyzeStructure(targetUrl);
    setScanResult(result);
  };

  return (
    <div className="ibm-glass" style={{ maxWidth: '700px', margin: '2rem auto', padding: '2.5rem' }}>
      <h2 style={{ margin: '0 0 1.5rem 0', color: 'var(--ibm-blue)' }}>🌐 Structural URL Security Scanner</h2>
      
      <form onSubmit={handleScan} style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          value={targetUrl}
          onChange={(e) => setTargetUrl(e.target.value)}
          placeholder="https://suspicious-link.com/login"
          style={{ flex: 1, padding: '12px', borderRadius: '6px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: 'white' }}
        />
        <button type="submit" style={{ background: 'var(--ibm-blue)', color: 'white', border: 'none', padding: '0 25px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
          Analyze Matrix
        </button>
      </form>

      {scanResult && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Security Score: <span style={{ color: scanResult.score > 70 ? 'var(--accent-success)' : 'var(--accent-danger)' }}>{scanResult.score}/100</span></h3>
          <p>Risk Profile Indicator: <strong>{scanResult.riskLevel}</strong></p>
          <div style={{ background: '#000', padding: '15px', borderRadius: '6px', fontFamily: 'monospace' }}>
            {scanResult.logs.map((log, idx) => (
              <div key={idx} style={{ marginBottom: '5px', fontSize: '13px' }}>{log}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}