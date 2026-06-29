document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SPA Navigation ---
    const navLinks = document.querySelectorAll('#navbar a');
    const sections = document.querySelectorAll('.page-section');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navbar = document.getElementById('navbar');

    function switchSection(targetId) {
        sections.forEach(sec => sec.classList.add('hidden'));
        navLinks.forEach(link => link.classList.remove('active'));
        document.getElementById(targetId).classList.remove('hidden');
        document.querySelector(`[data-target="${targetId}"]`).classList.add('active');
        if(window.innerWidth <= 768) navbar.classList.remove('show');
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            switchSection(link.getAttribute('data-target'));
        });
    });

    mobileBtn.addEventListener('click', () => navbar.classList.toggle('show'));

    // --- 2. Password Analyzer ---
    const paInput = document.getElementById('pa-input');
    const paToggle = document.getElementById('pa-toggle');
    const paMeter = document.getElementById('pa-meter');
    const paEntropy = document.getElementById('pa-entropy');
    const paTime = document.getElementById('pa-time');
    const paSugg = document.getElementById('pa-suggestions');

    paToggle.addEventListener('click', () => {
        const type = paInput.getAttribute('type') === 'password' ? 'text' : 'password';
        paInput.setAttribute('type', type);
        paToggle.textContent = type === 'password' ? 'Show' : 'Hide';
    });

    paInput.addEventListener('input', () => {
        const val = paInput.value;
        let pool = 0;
        let suggs = [];
        
        if (val.length === 0) {
            paMeter.style.width = '0%';
            paEntropy.textContent = '0 bits';
            paTime.textContent = 'Instant';
            paSugg.innerHTML = '';
            return;
        }

        if (/[a-z]/.test(val)) pool += 26;
        else suggs.push('Add lowercase letters');
        
        if (/[A-Z]/.test(val)) pool += 26;
        else suggs.push('Add uppercase letters');
        
        if (/[0-9]/.test(val)) pool += 10;
        else suggs.push('Add numbers');
        
        if (/[^a-zA-Z0-9]/.test(val)) pool += 32;
        else suggs.push('Add special characters');
        
        if (val.length < 12) suggs.push('Make it at least 12 characters');

        // Entropy: E = L * log2(R)
        const entropy = Math.round(val.length * (Math.log(pool) / Math.log(2))) || 0;
        paEntropy.textContent = `${entropy} bits`;

        let width = Math.min((entropy / 100) * 100, 100);
        paMeter.style.width = `${width}%`;
        
        paMeter.className = 'progress-fill ' + 
            (entropy < 35 ? 'meter-red' : (entropy < 60 ? 'meter-yellow' : 'meter-green'));

        // Rough crack time est (assuming 10 billion guesses/sec)
        const guesses = Math.pow(2, entropy);
        const seconds = guesses / 10000000000;
        
        let timeStr = 'Instant';
        if (seconds > 3153600000) timeStr = 'Centuries';
        else if (seconds > 31536000) timeStr = `${Math.round(seconds/31536000)} Years`;
        else if (seconds > 86400) timeStr = `${Math.round(seconds/86400)} Days`;
        else if (seconds > 3600) timeStr = `${Math.round(seconds/3600)} Hours`;
        else if (seconds > 60) timeStr = 'Minutes';

        paTime.textContent = timeStr;
        paSugg.innerHTML = suggs.map(s => `<li>- ${s}</li>`).join('');
    });

    // --- 3. URL Phishing Detector ---
    document.getElementById('url-btn').addEventListener('click', () => {
        const url = document.getElementById('url-input').value.trim();
        const resBox = document.getElementById('url-result-box');
        const level = document.getElementById('url-risk-level');
        const score = document.getElementById('url-score');
        const details = document.getElementById('url-details');
        
        if(!url) return;
        resBox.classList.remove('hidden');
        
        let riskScore = 0;
        let reasons = [];

        if (!url.startsWith('https://')) { riskScore += 40; reasons.push('Uses unencrypted HTTP protocol.'); }
        if (/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(url)) { riskScore += 50; reasons.push('Uses IP address instead of domain name.'); }
        if (url.length > 75) { riskScore += 10; reasons.push('Unusually long URL.'); }
        if ((url.match(/\./g) || []).length > 3) { riskScore += 20; reasons.push('Contains multiple subdomains.'); }
        
        const keywords = ['login', 'verify', 'update', 'secure', 'account', 'banking', 'free'];
        keywords.forEach(kw => { if(url.toLowerCase().includes(kw)) { riskScore += 15; reasons.push(`Contains suspicious keyword: '${kw}'.`); } });

        if (riskScore >= 70) {
            resBox.style.borderColor = 'var(--danger)'; level.textContent = 'High Risk - Dangerous'; level.style.color = 'var(--danger)';
        } else if (riskScore >= 30) {
            resBox.style.borderColor = 'var(--warning)'; level.textContent = 'Medium Risk - Suspicious'; level.style.color = 'var(--warning)';
        } else {
            resBox.style.borderColor = 'var(--success)'; level.textContent = 'Low Risk - Safe'; level.style.color = 'var(--success)';
        }
        
        score.textContent = `Calculated Risk Score: ${Math.min(riskScore, 100)}/100`;
        details.innerHTML = reasons.length ? reasons.map(r => `<li>${r}</li>`).join('') : '<li>No common phishing indicators found. (Always remain vigilant)</li>';
    });

    // --- 4. Email Spam Detector ---
    document.getElementById('spam-btn').addEventListener('click', () => {
        const text = document.getElementById('spam-input').value.toLowerCase();
        const resBox = document.getElementById('spam-result-box');
        if(!text) return;
        
        resBox.classList.remove('hidden');
        const spamKeywords = ['winner', 'lottery', 'congratulations', 'prize', 'money', 'offer', 'urgent', 'verify', 'click here', 'account suspended', 'return'];
        
        let found = spamKeywords.filter(kw => text.includes(kw));
        let spamScore = Math.min(found.length * 20, 100);

        const level = document.getElementById('spam-risk-level');
        if (spamScore > 60) {
            level.textContent = 'Highly Likely Spam'; level.style.color = 'var(--danger)'; resBox.style.borderColor = 'var(--danger)';
        } else if (spamScore > 0) {
            level.textContent = 'Suspicious'; level.style.color = 'var(--warning)'; resBox.style.borderColor = 'var(--warning)';
        } else {
            level.textContent = 'Looks Clean'; level.style.color = 'var(--success)'; resBox.style.borderColor = 'var(--success)';
        }

        document.getElementById('spam-score').textContent = `Spam Confidence: ${spamScore}%`;
        document.getElementById('spam-keywords').textContent = found.length ? `Trigger words found: ${found.join(', ')}` : 'No common spam triggers found.';
        document.getElementById('spam-recommendation').textContent = spamScore > 60 ? "Do not click any links or download attachments from this email." : "Always verify the sender's actual email address.";
    });

    // --- 5. Password Generator ---
    const pgLen = document.getElementById('pg-length');
    const pgLenVal = document.getElementById('pg-length-val');
    const pgOut = document.getElementById('pg-output');
    
    pgLen.addEventListener('input', () => pgLenVal.textContent = pgLen.value);

    document.getElementById('pg-btn').addEventListener('click', () => {
        const len = +pgLen.value;
        const up = document.getElementById('pg-upper').checked;
        const low = document.getElementById('pg-lower').checked;
        const num = document.getElementById('pg-num').checked;
        const sym = document.getElementById('pg-sym').checked;

        const uppers = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowers = "abcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";
        const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

        let chars = "";
        if (up) chars += uppers;
        if (low) chars += lowers;
        if (num) chars += numbers;
        if (sym) chars += symbols;

        if (!chars) return pgOut.textContent = "Select at least one option";

        let pwd = "";
        for (let i = 0; i < len; i++) {
            pwd += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        pgOut.textContent = pwd;
    });

    document.getElementById('pg-copy').addEventListener('click', () => {
        if(pgOut.textContent !== "Click Generate" && pgOut.textContent !== "Select at least one option"){
            navigator.clipboard.writeText(pgOut.textContent);
            const btn = document.getElementById('pg-copy');
            btn.textContent = "Copied!";
            setTimeout(() => btn.textContent = "Copy", 2000);
        }
    });

    // --- 6. Learn Module ---
    const topics = [
        { title: 'Phishing', desc: 'Fraudulent attempts to obtain sensitive info by disguising as a trustworthy entity.', ex: 'Fake bank emails asking to reset passwords.', prev: 'Check sender address, never click suspicious links.' },
        { title: 'Malware', desc: 'Software intentionally designed to cause disruption or leak data.', ex: 'Trojans hidden in pirated software.', prev: 'Use trusted AV, keep OS updated.' },
        { title: 'Ransomware', desc: 'Malware that encrypts your files and demands payment.', ex: 'WannaCry locking hospital databases.', prev: 'Maintain offline backups of critical data.' },
        { title: 'VPN', desc: 'Virtual Private Network. Encrypts your internet traffic.', ex: 'Using a VPN on public airport WiFi.', prev: 'Always use a reputable VPN on public networks.' },
        { title: 'Firewall', desc: 'Network security system that monitors and controls traffic.', ex: 'Blocking unauthorized incoming connections.', prev: 'Enable OS firewalls and router hardware firewalls.' },
        { title: '2FA', desc: 'Two-Factor Authentication. Requires two methods to verify identity.', ex: 'Password + SMS Code.', prev: 'Enable on all critical accounts (email, bank, social).' },
        { title: 'SQL Injection', desc: 'Code injection technique to attack data-driven apps.', ex: "Entering `' OR 1=1--` in a login field.", prev: 'Use parameterized queries in development.' },
        { title: 'XSS', desc: 'Cross-Site Scripting. Injecting malicious scripts into web pages.', ex: 'Script tags in a forum comment.', prev: 'Sanitize and validate all user inputs.' },
        { title: 'Zero Trust', desc: 'Security framework: "Never trust, always verify".', ex: 'Requiring re-authentication for internal employees accessing new segments.', prev: 'Implement strict access controls.' },
        { title: 'Password Security', desc: 'Practices to create and protect login credentials.', ex: 'Using unique passwords for every site.', prev: 'Use a password manager, avoid dictionary words.' }
    ];

    const learnContainer = document.getElementById('learn-container');
    topics.forEach(t => {
        learnContainer.innerHTML += `
            <div class="glass-card topic-card">
                <h3>${t.title}</h3>
                <p><strong>What it is:</strong> ${t.desc}</p><br>
                <p><strong>Example:</strong> ${t.ex}</p><br>
                <p><strong>Prevention:</strong> ${t.prev}</p>
            </div>
        `;
    });

    // --- 7. Quiz Module ---
    const quizData = [
        { q: "What does 2FA stand for?", opts: ["Two-Face Authentication", "Two-Factor Authentication", "Two-File Access"], ans: 1 },
        { q: "Which of these is a strong password?", opts: ["password123", "Admin2023", "g7#K9$mP2!q"], ans: 2 },
        { q: "What is Phishing?", opts: ["A network attack", "Social engineering via fake emails", "A firewall type"], ans: 1 },
        { q: "What does a VPN do?", opts: ["Makes internet faster", "Encrypts internet traffic", "Blocks all viruses"], ans: 1 },
        { q: "Ransomware primarily aims to:", opts: ["Delete files", "Encrypt files for money", "Steal bandwidth"], ans: 1 },
        { q: "What is Zero Trust?", opts: ["Trusting no antivirus", "Never trust, always verify", "A type of malware"], ans: 1 },
        { q: "SQL Injection targets:", opts: ["Databases", "Hardware", "Monitors"], ans: 0 },
        { q: "Which protocol is secure for websites?", opts: ["HTTP", "HTTPS", "FTP"], ans: 1 },
        { q: "Public Wi-Fi is generally:", opts: ["Secure", "Encrypted", "Unsafe without a VPN"], ans: 2 },
        { q: "XSS attacks involve injecting:", opts: ["SQL queries", "Malicious scripts", "Hardware keyloggers"], ans: 1 }
    ];

    let currentQ = 0;
    let score = 0;

    const qSetup = document.getElementById('quiz-setup');
    const qActive = document.getElementById('quiz-active');
    const qResult = document.getElementById('quiz-result');
    const qText = document.getElementById('quiz-question');
    const qOpts = document.getElementById('quiz-options');
    const qProgText = document.getElementById('quiz-progress-text');
    const qProgFill = document.getElementById('quiz-progress-fill');

    document.getElementById('quiz-start').addEventListener('click', () => {
        qSetup.classList.add('hidden');
        qActive.classList.remove('hidden');
        currentQ = 0; score = 0;
        loadQuestion();
    });

    function loadQuestion() {
        if(currentQ >= quizData.length) {
            qActive.classList.add('hidden');
            qResult.classList.remove('hidden');
            document.getElementById('quiz-score-text').textContent = `You scored ${score} out of 10!`;
            return;
        }

        qProgText.textContent = `Question ${currentQ + 1} of 10`;
        qProgFill.style.width = `${((currentQ + 1) / 10) * 100}%`;
        qText.textContent = quizData[currentQ].q;
        
        qOpts.innerHTML = '';
        quizData[currentQ].opts.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-btn';
            btn.textContent = opt;
            btn.addEventListener('click', () => handleAnswer(idx));
            qOpts.appendChild(btn);
        });
    }

    function handleAnswer(idx) {
        if(idx === quizData[currentQ].ans) score++;
        currentQ++;
        loadQuestion();
    }

    document.getElementById('quiz-restart').addEventListener('click', () => {
        qResult.classList.add('hidden');
        qSetup.classList.remove('hidden');
    });

    // --- 8. Contact Form ---
    document.getElementById('contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const stat = document.getElementById('contact-status');
        stat.textContent = "Message simulated successfully! (Frontend Only)";
        stat.style.color = "var(--success)";
        stat.classList.remove('hidden');
        e.target.reset();
        setTimeout(() => stat.classList.add('hidden'), 3000);
    });
});