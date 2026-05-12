import { useState } from 'react';
import { useTeam } from '../hooks/useTeam';
import { useWorkload } from '../hooks/useWorkload';
import MemberList from '../components/team/MemberList';
import WorkloadView from '../components/team/WorkloadView';
import Spinner from '../components/common/Spinner';
import Button from '../components/common/Button';

export default function Team() {
  const { data: members, loading: teamLoading } = useTeam();
  const { data: workload, loading: workloadLoading } = useWorkload();
  const [view, setView] = useState('list'); // 'list' or 'workload'
  const [variant, setVariant] = useState('expandable'); // 'expandable', 'drawer', 'modal'

  const loading = teamLoading || (view === 'workload' && workloadLoading);
  if (loading) return <Spinner />;

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Team</h1>
          <p>Your project team members</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <Button 
            variant={view === 'list' ? 'secondary' : 'ghost'} 
            size="small" 
            onClick={() => setView('list')}
          >
            List
          </Button>
          <Button 
            variant={view === 'workload' ? 'secondary' : 'ghost'} 
            size="small" 
            onClick={() => setView('workload')}
          >
            Workload
          </Button>
        </div>
      </div>

      {view === 'workload' && (
        <div style={{ 
          display: 'flex', 
          gap: 'var(--space-4)', 
          marginBottom: 'var(--space-6)',
          borderBottom: '1px solid var(--color-border)',
          paddingBottom: 'var(--space-2)'
        }}>
          {['expandable', 'drawer', 'modal'].map(v => (
            <button
              key={v}
              onClick={() => setVariant(v)}
              style={{
                background: 'none',
                border: 'none',
                padding: 'var(--space-2) var(--space-1)',
                cursor: 'pointer',
                fontSize: 'var(--font-size-sm)',
                fontWeight: variant === v ? 'var(--font-weight-bold)' : 'var(--font-weight-normal)',
                color: variant === v ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                borderBottom: variant === v ? '2px solid var(--color-primary)' : '2px solid transparent',
                textTransform: 'capitalize'
              }}
            >
              {v.replace('-', ' ')}
            </button>
          ))}
        </div>
      )}

      {view === 'list' ? (
        <MemberList members={members} />
      ) : (
        <WorkloadView members={workload} variant={variant} />
      )}
    </div>
  );
}

