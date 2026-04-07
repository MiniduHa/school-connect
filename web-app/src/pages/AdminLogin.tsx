import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Lock, Mail } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // --- TEMPORARY ROUTING LOGIC FOR TESTING ---
    // Later, this will fetch from your Node.js backend
    if (email === 'super@admin.com' && password === 'admin123') {
      navigate('/super-admin');
    } else if (email === 'school@admin.com' && password === 'admin123') {
      navigate('/school-admin');
    } else {
      setError('Invalid credentials. Try super@admin.com or school@admin.com');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftPanel}>
        <div style={styles.logoBox}>
          <GraduationCap size={48} color="#FFFFFF" />
        </div>
        <h1 style={styles.brandTitle}>School Connect</h1>
        <p style={styles.brandSubtitle}>Unified Education Management System</p>
      </div>

      <div style={styles.rightPanel}>
        <div style={styles.loginCard}>
          <h2 style={styles.loginTitle}>Admin Portal</h2>
          <p style={styles.loginSubtitle}>Sign in to manage your institution</p>

          {error && <div style={styles.errorBox}>{error}</div>}

          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <div style={styles.inputWrapper}>
                <Mail size={18} color="#9CA3AF" style={styles.inputIcon} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@school.edu"
                  style={styles.input}
                  required
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.inputWrapper}>
                <Lock size={18} color="#9CA3AF" style={styles.inputIcon} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={styles.input}
                  required
                />
              </div>
            </div>

            <button type="submit" style={styles.submitBtn}>
              Sign In to Dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// React Web inline styles (similar to React Native StyleSheet)
const styles = {
  container: { display: 'flex', height: '100vh', width: '100vw', fontFamily: 'system-ui, sans-serif' },
  leftPanel: { flex: 1, backgroundColor: '#2563EB', display: 'flex', flexDirection: 'column' as const, justifyContent: 'center', alignItems: 'center', color: 'white', padding: '2rem' },
  logoBox: { backgroundColor: 'rgba(255,255,255,0.2)', padding: '1.5rem', borderRadius: '1rem', marginBottom: '1.5rem' },
  brandTitle: { fontSize: '2.5rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' },
  brandSubtitle: { fontSize: '1.1rem', color: '#DBEAFE', margin: 0 },
  rightPanel: { flex: 1, backgroundColor: '#F8FAFC', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  loginCard: { backgroundColor: 'white', padding: '3rem', borderRadius: '1rem', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', width: '100%', maxWidth: '400px' },
  loginTitle: { fontSize: '1.75rem', fontWeight: 'bold', color: '#1E293B', margin: '0 0 0.5rem 0' },
  loginSubtitle: { color: '#64748B', marginBottom: '2rem', margin: 0 },
  errorBox: { backgroundColor: '#FEF2F2', color: '#EF4444', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1.5rem', fontSize: '0.875rem', border: '1px solid #FECACA' },
  form: { display: 'flex', flexDirection: 'column' as const, gap: '1.5rem' },
  inputGroup: { display: 'flex', flexDirection: 'column' as const, gap: '0.5rem' },
  label: { fontSize: '0.875rem', fontWeight: 600, color: '#475569' },
  inputWrapper: { display: 'flex', alignItems: 'center', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '0.5rem', padding: '0.75rem' },
  inputIcon: { marginRight: '0.5rem' },
  input: { border: 'none', backgroundColor: 'transparent', outline: 'none', width: '100%', fontSize: '0.95rem', color: '#1E293B' },
  submitBtn: { backgroundColor: '#2563EB', color: 'white', border: 'none', padding: '0.875rem', borderRadius: '0.5rem', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', marginTop: '0.5rem', transition: 'background-color 0.2s' }
};