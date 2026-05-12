import { useState, useEffect } from 'react';
import { useTeam } from './useTeam';
import { api } from '../utils/api-client';

export function useWorkload() {
  const { data: members, loading: teamLoading } = useTeam();
  const [workloadData, setWorkloadData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!members) return;

    async function fetchWorkload() {
      try {
        setLoading(true);
        // Parallel fetch for all members
        const promises = members.map(async (member) => {
          const tasks = await api.get(`/team/${member.id}/tasks`);
          
          // Logic from spec: 40h threshold, 4h tax for unestimated
          let totalHours = 0;
          const priorityCounts = { urgent: 0, high: 0, medium: 0, low: 0 };
          
          tasks.forEach(task => {
            totalHours += task.estimated_hours || 4;
            if (priorityCounts[task.priority] !== undefined) {
              priorityCounts[task.priority]++;
            }
          });

          return {
            ...member,
            tasks,
            totalHours,
            priorityCounts,
            isOverloaded: totalHours > 40
          };
        });

        const results = await Promise.all(promises);
        setWorkloadData(results);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch workload:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchWorkload();
  }, [members]);

  return { data: workloadData, loading: teamLoading || loading, error, refetch: () => setWorkloadData(null) };
}
