
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  created_at: string;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, session } = useAuth();

  useEffect(() => {
    if (!user || !session) {
      setNotifications([]);
      setLoading(false);
      return;
    }

    // Fetch initial notifications
    fetchNotifications();

    // Set up real-time subscription
    const channel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newNotification = payload.new as Notification;
            setNotifications(prev => [newNotification, ...prev]);
            // Show toast for new notifications
            toast(newNotification.title, {
              description: newNotification.message,
            });
          } else if (payload.eventType === 'UPDATE') {
            setNotifications(prev => 
              prev.map(n => n.id === payload.new.id ? payload.new as Notification : n)
            );
          } else if (payload.eventType === 'DELETE') {
            setNotifications(prev => 
              prev.filter(n => n.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, session]);

  const fetchNotifications = async () => {
    if (!session) return;

    try {
      const response = await supabase.functions.invoke('notifications', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (response.data?.notifications) {
        setNotifications(response.data.notifications);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    if (!session) return;

    try {
      await supabase.functions.invoke('notifications', {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        body: { id, read: true },
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const createNotification = async (title: string, message: string, type: string = 'info') => {
    if (!session) return;

    try {
      await supabase.functions.invoke('notifications', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        body: { title, message, type },
      });
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  };

  return {
    notifications,
    loading,
    markAsRead,
    createNotification,
    refetch: fetchNotifications,
  };
};
