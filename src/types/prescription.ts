export interface Prescription {
    id: number;
    name: string;
    dosage: string;
    frequency: string;
    supply: number;
    refillDate: string;
    doctor: string;
    instructions: string;
    pharmacy: string;
    lastFilled: string;
    refillRequested?: boolean;
}

export interface PrescriptionFormValues {
    name: string;
    dosage: string;
    frequency: string;
    supply: number;
    refillDate: string;
    doctor: string;
    instructions: string;
    pharmacy: string;
    lastFilled: string;
}

export interface Notification {
    id: number;
    type: 'low-supply' | 'refill-reminder' | 'info';
    message: string;
    prescriptionId?: number;
    timestamp: Date;
    read?: boolean;
}

export interface FormErrors {
    [key: string]: string | undefined;
}