import React, { useState } from 'react';
import { passwordService } from '../services/passwordService';

export default function PasswordAnalyzer() {
  const [pwd, setPwd] = useState('');
  const entropy = passwordService.calculateEntropy(pwd);
  const crackTime = passwordService.getCrackTime(entropy);

  return (
    <div className="ibm-glass" style={{ maxWidth: '600px', margin: '2rem auto', padding: '2.5rem' }}>
      <h2 style={{ margin: '0 0 1.5rem 0', color: 'var(--ibm-blue)' }}>🔑 Advanced Password Cryptanalyzer</h2>
      
      <input 
        type="text" 
        value={pwd} 
        onChange={(e) => setPwd(e.target.value)}
        placeholder="Enter payload password to check entropy..."
        style={{
          width: '100%', padding: '12px', borderRadius: '6px', background: 'rgba(0,0,0,0.3)',
          border: '1px solid var(--glass-border)', color: 'white', fontSize: '1rem', boxSizing: 'border-box'
        }}
      />

      {pwd && (
        <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <span style={{ color: 'var(--text-secondary)' }}>Information Entropy:</span>
            <strong style={{ marginLeft: '10px', color: 'var(--ibm-blue)' }}>{entropy} Bits</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-secondary)' }}>Estimated Brute-Force Time:</span>
            <strong style={{ marginLeft: '10px', color: entropy > 60 ? 'var(--accent-success)' : 'var(--accent-danger)' }}>{crackTime}</strong>
          </div>
        </div>
      )}
    </div>
  );
}