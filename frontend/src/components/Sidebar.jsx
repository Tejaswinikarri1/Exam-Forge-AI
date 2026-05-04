import { Home, FilePlus, BookMarked, ClipboardList, BarChart2, FileText, LogOut, ChevronsLeft, ChevronsRight, Users } from 'lucide-react';
import { T } from './UI';

const TEACHER_NAV = [
  { id: 'dashboard',  label: 'Dashboard',    icon: Home         },
  { id: 'create',     label: 'Create Exam',  icon: FilePlus     },
  { id: 'tests',      label: 'Mock Tests',   icon: BookMarked   },
  { id: 'students',   label: 'Students',     icon: Users        },
  { id: 'analytics',  label: 'Analytics',    icon: BarChart2    },
  { id: 'reports',    label: 'Reports',      icon: FileText     },
];

const STUDENT_NAV = [
  { id: 'dashboard',  label: 'Dashboard',     icon: Home         },
  { id: 'tests',      label: 'Mock Tests',    icon: BookMarked   },
  { id: 'attempts',   label: 'Past Attempts', icon: ClipboardList },
  { id: 'analytics',  label: 'Analytics',     icon: BarChart2    },
];

const Sidebar = ({ open, setOpen, active, onNav, user }) => {
  const NAV = user?.role === 'Teacher' ? TEACHER_NAV : STUDENT_NAV;

  return (
    <aside style={{
      width: open ? 230 : 60,
      background: T.surface,
      borderRight: `1px solid ${T.border}`,
      position: 'fixed', top: 0, bottom: 0, left: 0,
      overflowX: 'hidden', overflowY: 'auto',
      transition: 'width .26s cubic-bezier(.4,0,.2,1)',
      zIndex: 200, display: 'flex', flexDirection: 'column'
    }}>
      <div style={{
        padding: open ? '18px 18px 6px' : '14px 0 6px',
        display: 'flex', alignItems: 'center',
        justifyContent: open ? 'space-between' : 'center',
        flexShrink: 0, minHeight: 64
      }}>
        {open ? (
          <>
            <div>
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: 20, fontWeight: 700, color: T.accent, lineHeight: 1 }}>ExamForge</div>
              <div style={{ fontSize: 11, color: T.textMuted, marginTop: 3 }}>
                Hi, {user?.name?.split(' ')[0]}
                <span style={{
                  marginLeft: 6, fontSize: 10, padding: '1px 6px',
                  borderRadius: 10, fontWeight: 600,
                  background: user?.role === 'Teacher' ? T.purple + '22' : T.accentDim,
                  color: user?.role === 'Teacher' ? T.purple : T.accent,
                  border: `1px solid ${user?.role === 'Teacher' ? T.purple + '44' : T.accent + '44'}`,
                  fontFamily: "'IBM Plex Mono',monospace"
                }}>
                  {user?.role || 'Student'}
                </span>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{ background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: 8, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: T.textMuted, transition: 'all .18s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.color = T.accent; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.textMuted; }}
            >
              <ChevronsLeft size={15} />
            </button>
          </>
        ) : (
          <button
            onClick={() => setOpen(true)}
            style={{ background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: T.textMuted, transition: 'all .18s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; }}
          >
            <ChevronsRight size={15} />
          </button>
        )}
      </div>

      <div style={{ height: 1, background: T.border, margin: open ? '0 16px 8px' : '0 10px 8px', flexShrink: 0 }} />

      <nav style={{ flex: 1, padding: open ? '0 10px' : '0 6px' }}>
        {NAV.map(item => {
          const Icon = item.icon;
          const isAct = active === item.id || (active === 'take-test' && item.id === 'tests');
          return (
            <div
              key={item.id}
              onClick={() => onNav(item.id)}
              title={!open ? item.label : undefined}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: open ? '10px 12px' : '10px 0',
                justifyContent: open ? 'flex-start' : 'center',
                marginBottom: 2, cursor: 'pointer', borderRadius: 9,
                borderLeft: open ? `2px solid ${isAct ? T.accent : 'transparent'}` : 'none',
                background: isAct ? T.accentDim : 'transparent',
                color: isAct ? T.accent : T.textMuted,
                fontWeight: isAct ? 600 : 400, fontSize: 13,
                transition: 'all .15s', whiteSpace: 'nowrap'
              }}
              onMouseEnter={e => { if (!isAct) e.currentTarget.style.background = T.surfaceHover; }}
              onMouseLeave={e => { if (!isAct) e.currentTarget.style.background = 'transparent'; }}
            >
              <Icon size={16} style={{ flexShrink: 0 }} />
              {open && item.label}
            </div>
          );
        })}
      </nav>

      <div style={{ padding: open ? '0 10px 16px' : '0 6px 16px', flexShrink: 0 }}>
        <div style={{ height: 1, background: T.border, marginBottom: 8 }} />
        <div
          onClick={() => onNav('__logout__')}
          style={{ display: 'flex', alignItems: 'center', gap: 12, padding: open ? '10px 12px' : '10px 0', justifyContent: open ? 'flex-start' : 'center', cursor: 'pointer', borderRadius: 9, color: T.danger, fontSize: 13, fontWeight: 500, transition: 'all .15s' }}
          onMouseEnter={e => e.currentTarget.style.background = T.dangerDim}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <LogOut size={16} style={{ flexShrink: 0 }} />
          {open && 'Logout'}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;