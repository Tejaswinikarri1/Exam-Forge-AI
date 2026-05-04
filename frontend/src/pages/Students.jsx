import { useState, useEffect } from 'react';
import { Users, Search, RefreshCw, TrendingUp, ClipboardList } from 'lucide-react';
import { T, Spin, Card, Btn, Badge, EmptyState } from '../components/UI';
import api from '../utils/api';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');

  const load = () => {
    setLoading(true);
    api.get('/admin/students')
      .then(r => { setStudents(r.data.students || []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(load, []);

  const filtered = students.filter(s =>
    !search ||
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300, gap: 12, color: T.textMuted }}>
      <Spin />Loading students...
    </div>
  );

  return (
    <div className='fu'>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
        <div>
          <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: 26, fontWeight: 600 }}>Students</h1>
          <p style={{ color: T.textMuted, fontSize: 13, marginTop: 4 }}>{students.length} registered students</p>
        </div>
        <Btn variant='surface' size='sm' onClick={load}><RefreshCw size={13} />Refresh</Btn>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 18, maxWidth: 320 }}>
        <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: T.textDim }} />
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder='Search by name or email...'
          style={{ background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: 8, padding: '7px 12px 7px 30px', color: T.textPrimary, fontSize: 13, width: '100%', outline: 'none' }}
        />
      </div>

      {filtered.length === 0 ? (
        <Card><EmptyState icon={Users} title='No students yet' sub='Students will appear here once they register.' /></Card>
      ) : (
        <Card>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                  {['Student', 'Email', 'Tests Taken', 'Avg Score', 'Last Active', 'Status'].map(h => (
                    <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: 10, color: T.textDim, fontFamily: "'IBM Plex Mono',monospace", letterSpacing: '.06em', fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => (
                  <tr
                    key={s._id || i}
                    style={{ borderBottom: `1px solid ${T.border}22`, transition: 'background .14s' }}
                    onMouseEnter={e => e.currentTarget.style.background = T.surfaceAlt}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: T.accentDim, border: `1.5px solid ${T.accent}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: T.accent, flexShrink: 0 }}>
                          {s.avatar || s.name?.slice(0, 2).toUpperCase()}
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 600 }}>{s.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px', fontSize: 12, color: T.textMuted, fontFamily: "'IBM Plex Mono',monospace" }}>{s.email}</td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <ClipboardList size={13} color={T.textDim} />
                        <span style={{ fontFamily: "'Fraunces',serif", fontSize: 18, fontWeight: 700, color: T.textPrimary }}>{s.totalAttempts || 0}</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        fontFamily: "'Fraunces',serif", fontSize: 18, fontWeight: 700,
                        color: (s.avgScore || 0) >= 75 ? T.accent : (s.avgScore || 0) >= 55 ? T.warn : T.danger
                      }}>
                        {s.avgScore || 0}%
                      </span>
                    </td>
                    <td style={{ padding: '12px', fontSize: 11, color: T.textDim, fontFamily: "'IBM Plex Mono',monospace" }}>
                      {s.lastActive ? new Date(s.lastActive).toISOString().split('T')[0] : '—'}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <Badge color={s.totalAttempts > 0 ? T.accent : T.textDim}>
                        {s.totalAttempts > 0 ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Students;