import { useState, useEffect } from 'react';
import { Prescription } from '../types/prescription';

const STORAGE_KEY = 'prescription-data';

export function usePrescriptions() {
    const mockData: Prescription[] = [
        {
            id: 1,
            name: "Placeholder1",
            dosage: "40mcg",
            frequency: "Twice daily",
            supply: 7,
            refillDate: '2025-04-15',
            doctor: 'Dr. Placeholder',
            instructions: '',
            pharmacy: 'CVS',
            lastFilled: '2025-03-15',
        },
        {
            id: 2,
            name: 'Placeholder2',
            dosage: '500mg',
            frequency: "Once weekly",
            supply: 3,
            refillDate: '2025-04-10',
            doctor: 'Dr. Placeholder',
            instructions: 'Take with meals',
            pharmacy: 'CVS',
            lastFilled: '2025-03-25',
        },
    ]
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        try {
            const savedData = localStorage.getItem(STORAGE_KEY);
            if (savedData) {
                setPrescriptions(JSON.parse(savedData));
            } else {
            setPrescriptions(mockData);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(mockData));
        }
        } catch (err) {
            setError('Failed to load prescription data');
            console.log(err);
            setPrescriptions(mockData);
        } finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        if (prescriptions.length > 0 && !loading) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(prescriptions));
        }
    }, [prescriptions, loading]);
        const getLowSupplyPrescriptions = (threshold = 4): Prescription[] => {
            return prescriptions.filter(p => p.supply < threshold);
        };
    const getUpcomingRefills = (days = 7): Prescription[] => {
        const today = new Date();
        const futureDate = new Date();
        futureDate.setDate(today.getDate() + days);
        return prescriptions
            .filter(p => {
                const refillDate = new Date(p.refillDate);
                return refillDate >= today && refillDate <= futureDate;
            })
            .sort((a, b) => new Date(a.refillDate).getTime() - new Date(b.refillDate).getTime());
        };

  // Add a new prescription
    const addPrescription = (prescription: Omit<Prescription, 'id'>): Prescription => {
        const newPrescription: Prescription = {
            ...prescription,
            id: Date.now(),
        };
        setPrescriptions(prev => [...prev, newPrescription]);
        return newPrescription;
    };

  // Update an existing prescription
    const updatePrescription = (id: number, updates: Partial<Prescription>): void => {
        setPrescriptions(prev => 
            prev.map(p => (p.id === id ? { ...p, ...updates } : p))
        );
    };

  // Delete a prescription
    const deletePrescription = (id: number): void => {
        setPrescriptions(prev => prev.filter(p => p.id !== id));
    };

  // Request a refill for a prescription
    const requestRefill = (id: number): void => {
        console.log(`Requesting refill for prescription ${id}`);
        updatePrescription(id, { refillRequested: true });
    };

  // Decrement supply
    const decrementSupply = (id: number): void => {
        setPrescriptions(prev => 
            prev.map(p => (p.id === id ? { ...p, supply: Math.max(0, p.supply - 1) } : p))
        );
    };

    return {
        prescriptions,
        loading,
        error,
        getLowSupplyPrescriptions,
        getUpcomingRefills,
        addPrescription,
        updatePrescription,
        deletePrescription,
        requestRefill,
        decrementSupply
    };
}