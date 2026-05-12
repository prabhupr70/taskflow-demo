import { isOverdue } from '../../utils/format-date';

const statCardStyle = (color) => ({
  background: 'var(--color-surface)',
  border: '1px solid var(--color-border)',
  borderTop: `4px solid ${color || 'var(--color-border)'}`,
  borderRadius: 'var(--border-radius-lg)',
  padding: 'var(--space-5)',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-2)',
  boxShadow: 'var(--shadow-sm)',
  transition: 'var(--transition-base)',
});

const labelContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
};

const labelStyle = {
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text-secondary)',
  fontWeight: 'var(--font-weight-medium)',
};

const valueStyle = {
  fontSize: 'var(--font-size-3xl)',
  fontWeight: 'var(--font-weight-bold)',
  color: 'var(--color-text)',
  lineHeight: 1,
};

const Icon = ({ path, color }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
);

export default function Stats({ tasks, projects }) {
  const totalTasks = tasks?.length || 0;
  const completedTasks = tasks?.filter((t) => t.status === 'done').length || 0;
  const inProgress = tasks?.filter((t) => t.status === 'in-progress').length || 0;
  const overdueTasks = tasks?.filter((t) => t.status !== 'done' && isOverdue(t.due_date)).length || 0;

  const stats = [
    { 
      label: 'Total Tasks', 
      value: totalTasks, 
      color: 'var(--color-text)',
      icon: <path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
    },
    { 
      label: 'Completed', 
      value: completedTasks, 
      color: 'var(--color-success)',
      icon: <><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>
    },
    { 
      label: 'In Progress', 
      value: inProgress, 
      color: 'var(--color-info)',
      icon: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>
    },
    { 
      label: 'Overdue', 
      value: overdueTasks, 
      color: 'var(--color-error)',
      icon: <><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></>
    },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)' }}>
      {stats.map((stat) => (
        <div key={stat.label} style={statCardStyle(stat.color)}>
          <div style={labelContainerStyle}>
            <Icon path={stat.icon} color={stat.color} />
            <span style={labelStyle}>{stat.label}</span>
          </div>
          <span style={valueStyle}>{stat.value}</span>
        </div>
      ))}
    </div>
  );
}
