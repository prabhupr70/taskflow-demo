import { useState } from 'react';
import WorkloadCard from './WorkloadCard';
import Modal from '../common/Modal';
import { formatDate } from '../../utils/format-date';
import Badge from '../common/Badge';

const detailContainerStyle = {
  padding: 'var(--space-4)',
  borderTop: '1px solid var(--color-border)',
  background: 'var(--color-bg)',
};

const taskRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 'var(--space-2) 0',
  borderBottom: '1px solid var(--color-border-light)',
  fontSize: 'var(--font-size-sm)',
};

function TaskList({ tasks }) {
  return (
    <div>
      <h4 style={{ fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>
        Active Tasks ({tasks.length})
      </h4>
      {tasks.map(task => (
        <div key={task.id} style={taskRowStyle}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'var(--font-weight-medium)' }}>{task.title}</div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
              Due {formatDate(task.due_date) || 'No date'} • {task.estimated_hours || 4}h
            </div>
          </div>
          <Badge variant={task.priority}>{task.priority}</Badge>
        </div>
      ))}
    </div>
  );
}

export default function WorkloadView({ members, variant }) {
  const [selectedId, setSelectedId] = useState(null);

  const selectedMember = members.find(m => m.id === selectedId);

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: 'var(--space-4)' 
      }}>
        {members.map((member) => (
          <div key={member.id}>
            <WorkloadCard 
              member={member} 
              onClick={() => setSelectedId(selectedId === member.id ? null : member.id)} 
            />
            
            {/* Variant 1: Expandable Row */}
            {variant === 'expandable' && selectedId === member.id && (
              <div style={detailContainerStyle}>
                <TaskList tasks={member.tasks} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Variant 2: Slide-Out Panel (Drawer) */}
      {variant === 'drawer' && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: selectedId ? 0 : '-400px',
          width: '400px',
          height: '100vh',
          background: 'var(--color-surface)',
          boxShadow: 'var(--shadow-lg)',
          transition: 'right 0.3s ease-in-out',
          zIndex: 1000,
          padding: 'var(--space-6)',
          overflowY: 'auto',
          borderLeft: '1px solid var(--color-border)',
        }}>
          <button 
            onClick={() => setSelectedId(null)}
            style={{ position: 'absolute', top: 'var(--space-4)', right: 'var(--space-4)', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.5rem' }}
          >
            &times;
          </button>
          {selectedMember && (
            <div>
              <h2 style={{ marginBottom: 'var(--space-1)' }}>{selectedMember.name}</h2>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>{selectedMember.role}</p>
              <TaskList tasks={selectedMember.tasks} />
            </div>
          )}
        </div>
      )}

      {/* Variant 3: Modal Deep-Dive */}
      <Modal 
        isOpen={variant === 'modal' && !!selectedId} 
        onClose={() => setSelectedId(null)}
        title={selectedMember?.name}
      >
        {selectedMember && (
          <div style={{ padding: 'var(--space-2)' }}>
            <TaskList tasks={selectedMember.tasks} />
          </div>
        )}
      </Modal>
    </div>
  );
}
