import { useState, useEffect, useRef } from 'react';
import { useToast } from "@/hooks/use-toast";

interface ScreenTimeData {
  todayTotal: number; // in minutes
  blueLightLevel: 'Low' | 'Medium' | 'High';
  protectionScore: number;
  isActive: boolean;
  blueFilterEnabled: boolean;
  breakRemindersEnabled: boolean;
}

export function useScreenTime() {
  const { toast } = useToast();
  const [screenTime, setScreenTime] = useState<ScreenTimeData>({
    todayTotal: 0,
    blueLightLevel: 'Low',
    protectionScore: 100,
    isActive: false,
    blueFilterEnabled: false,
    breakRemindersEnabled: true
  });

  const startTime = useRef<number>(Date.now());
  const sessionStartRef = useRef<number>(Date.now());
  const initialStoredTimeRef = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout>();
  const breakReminderRef = useRef<NodeJS.Timeout>();
  const lastBreakNotification = useRef<number>(Date.now());

  const calculateBlueLightLevel = (totalMinutes: number, currentHour: number): 'Low' | 'Medium' | 'High' => {
    // Higher blue light exposure during day hours and with more screen time
    const isDayTime = currentHour >= 6 && currentHour <= 18;
    const isEveningTime = currentHour >= 19 && currentHour <= 23;

    if (totalMinutes > 480) { // More than 8 hours
      return isDayTime ? 'High' : 'Medium';
    } else if (totalMinutes > 240) { // More than 4 hours
      return isDayTime ? 'Medium' : isEveningTime ? 'High' : 'Low';
    } else {
      return isEveningTime ? 'Medium' : 'Low';
    }
  };

  const calculateProtectionScore = (totalMinutes: number, blueLightLevel: string): number => {
    let baseScore = Math.max(0, 100 - (totalMinutes / 10)); // Decrease by usage

    if (blueLightLevel === 'High') baseScore -= 20;
    else if (blueLightLevel === 'Medium') baseScore -= 10;

    return Math.max(10, Math.min(100, Math.round(baseScore)));
  };

  const updateScreenTime = (shouldPersist = false) => {
    const currentSessionMs = Date.now() - sessionStartRef.current;
    const totalMs = initialStoredTimeRef.current + currentSessionMs;
    const totalMinutes = totalMs / 60000;
    const currentHour = new Date().getHours();

    const blueLightLevel = calculateBlueLightLevel(totalMinutes, currentHour);
    const protectionScore = calculateProtectionScore(totalMinutes, blueLightLevel);

    setScreenTime(prev => ({
      ...prev,
      todayTotal: totalMinutes,
      blueLightLevel,
      protectionScore,
      isActive: true
    }));

    // Update stored data occasionally or on demand
    if (shouldPersist) {
      const today = new Date().toDateString();
      localStorage.setItem('glareGuard_screenTime', JSON.stringify({
        date: today,
        totalMinutes
      }));
    }
  };

  useEffect(() => {
    // Initialize with stored data
    const stored = localStorage.getItem('glareGuard_screenTime');
    const today = new Date().toDateString();

    if (stored) {
      const data = JSON.parse(stored);
      if (data.date === today) {
        // Convert stored minutes back to ms for consistency if we want, or just use it
        // Depending on legacy, assume totalMinutes is accurate.
        initialStoredTimeRef.current = data.totalMinutes * 60000;

        const currentHour = new Date().getHours();
        const blueLightLevel = calculateBlueLightLevel(data.totalMinutes, currentHour);
        const protectionScore = calculateProtectionScore(data.totalMinutes, blueLightLevel);

        setScreenTime(prev => ({
          ...prev,
          todayTotal: data.totalMinutes,
          blueLightLevel,
          protectionScore,
          isActive: true
        }));
      } else {
        // New day, reset
        initialStoredTimeRef.current = 0;
      }
    }

    sessionStartRef.current = Date.now();

    // Start tracking - update UI every second
    intervalRef.current = setInterval(() => updateScreenTime(false), 1000);

    // Persist every 30 seconds
    const persistInterval = setInterval(() => updateScreenTime(true), 30000);

    // Handle visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        updateScreenTime(true);
      } else {
        // When coming back, we don't reset total, but we reset session start
        // Wait, if we reset session start, we need to update initialStoredTimeRef
        // to incude the time from the previous session segment.
        // Actually, easier logic:
        // On hidden/unload: save current total to localStorage.
        // On visible: read from localStorage into initialStoredTimeRef, reset sessionStartRef.

        const stored = localStorage.getItem('glareGuard_screenTime');
        if (stored) {
          const data = JSON.parse(stored);
          if (data.date === new Date().toDateString()) {
            initialStoredTimeRef.current = data.totalMinutes * 60000;
          }
        }
        sessionStartRef.current = Date.now();
      }
    };

    const handleBeforeUnload = () => {
      updateScreenTime(true);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      clearInterval(persistInterval);
      updateScreenTime(true);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const formatTime = (minutes: number): string => {
    const totalSeconds = Math.floor(minutes * 60);
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}h ${mins}m ${secs}s`;
    }
    return `${mins}m ${secs}s`;
  };

  const toggleBlueFilter = (enabled: boolean) => {
    setScreenTime(prev => ({ ...prev, blueFilterEnabled: enabled }));
    localStorage.setItem('glareGuard_blueFilter', enabled.toString());

    if (enabled) {
      document.documentElement.style.filter = 'sepia(0.1) saturate(0.9) hue-rotate(15deg)';
    } else {
      document.documentElement.style.filter = '';
    }
  };

  const toggleBreakReminders = (enabled: boolean) => {
    setScreenTime(prev => ({ ...prev, breakRemindersEnabled: enabled }));
    localStorage.setItem('glareGuard_breakReminders', enabled.toString());

    if (enabled) {
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }

      // Reset timer when enabling so it doesn't fire immediately if it was 0
      lastBreakNotification.current = Date.now();

      if (!breakReminderRef.current) {
        breakReminderRef.current = setInterval(() => {
          const now = Date.now();
          if (now - lastBreakNotification.current >= 20 * 60 * 1000) { // 20 minutes
            lastBreakNotification.current = now;

            // Try system notification
            if (Notification.permission === 'granted') {
              new Notification('Eye Break Reminder', {
                body: 'Take a 20-second break! Look at something 20 feet away.',
                icon: '/placeholder.svg'
              });
            }

            // Always show Toast as fallback or supplementary reminder
            toast({
              title: "Eye Break Reminder 👁️",
              description: "Time to rest your eyes! Follow the 20-20-20 rule.",
              duration: 10000,
            });
          }
        }, 60000); // Check every minute
      }
    } else if (!enabled && breakReminderRef.current) {
      clearInterval(breakReminderRef.current);
      breakReminderRef.current = undefined;
    }
  };

  // Initialize settings on mount
  useEffect(() => {
    const blueFilter = localStorage.getItem('glareGuard_blueFilter') === 'true';
    const breakReminders = localStorage.getItem('glareGuard_breakReminders') !== 'false';

    setScreenTime(prev => ({
      ...prev,
      blueFilterEnabled: blueFilter,
      breakRemindersEnabled: breakReminders
    }));

    if (blueFilter) {
      document.documentElement.style.filter = 'sepia(0.1) saturate(0.9) hue-rotate(15deg)';
    }

    // Check permissions and start interval if enabled
    if (breakReminders) {
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }
      // Ensure the interval is running
      toggleBreakReminders(true);
    }

    return () => {
      if (breakReminderRef.current) clearInterval(breakReminderRef.current);
    };
  }, []);

  return {
    ...screenTime,
    formattedTime: formatTime(screenTime.todayTotal),
    toggleBlueFilter,
    toggleBreakReminders
  };
}