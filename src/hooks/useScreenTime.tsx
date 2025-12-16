import { useState, useEffect, useRef } from 'react';

interface ScreenTimeData {
  todayTotal: number; // in minutes
  blueLightLevel: 'Low' | 'Medium' | 'High';
  protectionScore: number;
  isActive: boolean;
  blueFilterEnabled: boolean;
  breakRemindersEnabled: boolean;
}

export function useScreenTime() {
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
  const intervalRef = useRef<NodeJS.Timeout>();
  const breakReminderRef = useRef<NodeJS.Timeout>();
  const lastBreakNotification = useRef<number>(0);

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

  const updateScreenTime = () => {
    const stored = localStorage.getItem('glareGuard_screenTime');
    const today = new Date().toDateString();
    let data = stored ? JSON.parse(stored) : {};
    
    if (data.date !== today) {
      data = { date: today, totalMinutes: 0 };
    }
    
    const currentSessionMinutes = Math.floor((Date.now() - sessionStartRef.current) / 60000);
    const totalMinutes = data.totalMinutes + currentSessionMinutes;
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
    
    // Update stored data
    localStorage.setItem('glareGuard_screenTime', JSON.stringify({
      date: today,
      totalMinutes
    }));
    
    sessionStartRef.current = Date.now();
  };

  useEffect(() => {
    // Initialize with stored data
    const stored = localStorage.getItem('glareGuard_screenTime');
    const today = new Date().toDateString();
    
    if (stored) {
      const data = JSON.parse(stored);
      if (data.date === today) {
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
      }
    }

    // Start tracking
    intervalRef.current = setInterval(updateScreenTime, 30000); // Update every 30 seconds

    // Handle visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        updateScreenTime();
      } else {
        sessionStartRef.current = Date.now();
      }
    };

    const handleBeforeUnload = () => {
      updateScreenTime();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      updateScreenTime();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}.${Math.round(mins / 6)}h` : `${mins}m`;
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
    
    if (enabled && !breakReminderRef.current) {
      breakReminderRef.current = setInterval(() => {
        const now = Date.now();
        if (now - lastBreakNotification.current >= 20 * 60 * 1000) { // 20 minutes
          lastBreakNotification.current = now;
          if (Notification.permission === 'granted') {
            new Notification('Eye Break Reminder', {
              body: 'Take a 20-second break and look at something 20 feet away!',
              icon: '/placeholder.svg'
            });
          }
        }
      }, 60000); // Check every minute
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
    
    // Request notification permission
    if (breakReminders && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return {
    ...screenTime,
    formattedTime: formatTime(screenTime.todayTotal),
    toggleBlueFilter,
    toggleBreakReminders
  };
}