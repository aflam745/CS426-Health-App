import { useState, useEffect } from 'react';
import { Notification } from '../types/prescription';

export function useNotifications() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    // Check for notifications
    useEffect(() => {
    }, []);
    const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>): Notification => {
        const newNotification: Notification = {
            id: Date.now(),
            timestamp: new Date(),
            ...notification
        };
        setNotifications(prev => [...prev, newNotification]);
        return newNotification;
    };
    const dismissNotification = (id: number): void => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };
    const dismissAllNotifications = (): void => {
        setNotifications([]);
    };
    return {
        notifications,
        addNotification,
        dismissNotification,
        dismissAllNotifications
    };
}