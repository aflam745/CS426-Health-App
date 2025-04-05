import React, { useState } from 'react';
import { PrescriptionCard } from './PrescriptionCard';
import { Prescription } from '../../types/prescription';

interface PrescriptionListProps {
    prescriptions: Prescription[];
    onRequestRefill: (id: number) => void;
    onSetReminder: (id: number) => void;
    lowSupplyThreshold?: number;
}

export function PrescriptionList({ 
    prescriptions, 
    onRequestRefill, 
    onSetReminder,
    lowSupplyThreshold = 4 
}: PrescriptionListProps): React.ReactElement {
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const handleToggleExpand = (id: number): void => {
        setExpandedId(expandedId === id ? null : id);
    };
    return (
        <div className="space-y-4">
        {prescriptions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
            No prescriptions found
            </div>
        ) : (
            prescriptions.map((prescription) => (
            <PrescriptionCard
                key={prescription.id}
                prescription={prescription}
                isExpanded={expandedId === prescription.id}
                onToggleExpand={handleToggleExpand}
                onRequestRefill={onRequestRefill}
                onSetReminder={onSetReminder}
                lowSupplyThreshold={lowSupplyThreshold}
            />
            ))
        )}
        </div>
    );
}
