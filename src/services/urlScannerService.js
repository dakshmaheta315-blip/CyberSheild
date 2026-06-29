export const urlScannerService = {
  analyzeStructure: (url) => {
    let score = 100;
    const logs = [];

    if (!url.startsWith('https://')) {
      score -= 40;
      logs.push('🚨 Missing HTTPS Protocol (No SSL Detected)');
    } else {
      logs.push('🔒 Valid HTTPS Protocol Detected');
    }

    const suspTerms = ['login', 'verify', 'bank', 'update-password', 'free', 'gift'];
    suspTerms.forEach(term => {
      if (url.toLowerCase().includes(term)) {
        score -= 20;
        logs.push(`⚠️ Suspicious Phishing Keyword Found: "${term}"`);
      }
    });

    if ((url.match(/\./g) || []).length > 3) {
      score -= 15;
      logs.push('⚠️ High Subdomain Count (Common Phishing Technique)');
    }

    return {
      score: Math.max(0, score),
      logs,
      riskLevel: score > 75 ? 'LOW' : score > 45 ? 'MEDIUM' : 'HIGH'
    };
  }
};