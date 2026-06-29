export const passwordService = {
  calculateEntropy: (pwd) => {
    if (!pwd) return 0;
    let pool = 0;
    if (/[a-z]/.test(pwd)) pool += 26;
    if (/[A-Z]/.test(pwd)) pool += 26;
    if (/[0-9]/.test(pwd)) pool += 10;
    if (/[^a-zA-Z0-9]/.test(pwd)) pool += 32;
    return Math.round(pwd.length * Math.log2(pool));
  },

  getCrackTime: (entropy) => {
    if (entropy === 0) return '0 seconds';
    // બ્રુટ ફોર્સ સ્પીડ માની લઈએ: 10 billion guesses/sec
    const guesses = Math.pow(2, entropy);
    const seconds = guesses / 1e10;

    if (seconds < 1) return 'Instantly';
    if (seconds < 60) return `${Math.round(seconds)} seconds`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
    if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
    return `${(seconds / 31536000).toExponential(2)} years`;
  }
};