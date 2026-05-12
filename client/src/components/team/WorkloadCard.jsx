import Badge from '../common/Badge';

const cardStyle = (isOverloaded) => ({
  background: 'var(--color-surface)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--border-radius-lg)',
  padding: 'var(--space-5)',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-4)',
  cursor: 'pointer',
  transition: 'var(--transition-base)',
  boxShadow: isOverloaded ? '0 0 0 2px var(--color-error)' : 'var(--shadow-sm)',
});

const avatarStyle = (color) => ({
  width: '40px',
  height: '40px',
  borderRadius: 'var(--border-radius-full)',
  background: color || 'var(--color-primary)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  fontWeight: 'var(--font-weight-semibold)',
  fontSize: 'var(--font-size-sm)',
  flexShrink: 0,
});

const barStyle = (percent, isOverloaded) => ({
  height: '8px',
  width: '100%',
  background: 'var(--color-border-light)',
  borderRadius: 'var(--border-radius-full)',
  overflow: 'hidden',
  marginTop: 'var(--space-2)',
});

const fillStyle = (percent, isOverloaded) => ({
  height: '100%',
  width: `${Math.min(percent, 100)}%`,
  background: isOverloaded ? 'var(--color-error)' : 'var(--color-success)',
  transition: 'width 0.5s ease-out',
});

export default function WorkloadCard({ member, onClick }) {
  const initials = member.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const hourPercent = (member.totalHours / 40) * 100;

  return (
    <div style={cardStyle(member.isOverloaded)} onClick={onClick}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <div style={avatarStyle(member.avatar_color)}>{initials}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 'var(--font-weight-semibold)', display: 'flex', justifyContent: 'space-between' }}>
            {member.name}
            {member.isOverloaded && <span style={{ color: 'var(--color-error)', fontSize: '1.2rem' }}>⚠️</span>}
          </div>
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>{member.role}</div>
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-xs)', marginBottom: 'var(--space-1)' }}>
          <span style={{ color: 'var(--color-text-secondary)' }}>Capacity Used</span>
          <span style={{ fontWeight: 'var(--font-weight-bold)', color: member.isOverloaded ? 'var(--color-error)' : 'var(--color-text)' }}>
            {Math.round(member.totalHours)}h / 40h
          </span>
        </div>
        <div style={barStyle()}>
          <div style={fillStyle(hourPercent, member.isOverloaded)} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-1)', flexWrap: 'wrap' }}>
        {Object.entries(member.priorityCounts).map(([priority, count]) => (
          count > 0 && (
            <Badge key={priority} variant={priority}>
              {count} {priority}
            </Badge>
          )
        ))}
      </div>
    </div>
  );
}
