
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  image_url: string;
  technologies: string[];
  live_url: string;
  github_url: string;
  featured: boolean;
  order_index: number;
  created_at: string;
}

export const usePortfolioProjects = () => {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();

    // Set up real-time subscription
    const channel = supabase
      .channel('portfolio_projects')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'portfolio_projects',
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setProjects(prev => [...prev, payload.new as PortfolioProject]);
          } else if (payload.eventType === 'UPDATE') {
            setProjects(prev => 
              prev.map(p => p.id === payload.new.id ? payload.new as PortfolioProject : p)
            );
          } else if (payload.eventType === 'DELETE') {
            setProjects(prev => 
              prev.filter(p => p.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await supabase.functions.invoke('portfolio-projects');
      
      if (response.data?.projects) {
        setProjects(response.data.projects);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    projects,
    loading,
    refetch: fetchProjects,
  };
};
