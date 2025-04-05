import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, Calendar } from 'lucide-react';
import { Prescription } from '../../types/prescription';

interface AlertsPanelProps {
    lowSupplyPrescriptions: Prescription[];
    upcomingRefills: Prescription[];
    onRequestRefill: (id: number) => void;
}

export function AlertsPanel({ 
    lowSupplyPrescriptions, 
    upcomingRefills, 
    onRequestRefill 
}: AlertsPanelProps): React.ReactElement {
    return (
        <div className="w-full lg:w-64">
        <h2 className="text-xl font-bold mb-4">Alerts</h2>
        {lowSupplyPrescriptions.length > 0 ? (
            <div className="space-y-3">
            {lowSupplyPrescriptions.map(prescription => (
                <Alert key={prescription.id} variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle className="text-sm font-medium">Low Supply</AlertTitle>
                <AlertDescription className="text-sm">
                    {prescription.name} ({prescription.supply} days left)
                    <div className="mt-2">
                    <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => onRequestRefill(prescription.id)}
                    >
                        Request Refill
                    </Button>
                    </div>
                </AlertDescription>
                </Alert>
            ))}
            </div>
        ) : (
            <Alert>
            <AlertDescription>No alerts at this time.</AlertDescription>
            </Alert>
        )}
        
        <div className="mt-4">
            <h2 className="text-xl font-bold mb-4">Upcoming Refills</h2>
            <Card>
            <CardContent className="pt-6">
                {upcomingRefills.length > 0 ? (
                upcomingRefills.map(prescription => (
                    <div key={prescription.id} className="flex items-center gap-3 mb-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                        <p className="text-sm font-medium">{prescription.name}</p>
                        <p className="text-xs text-muted-foreground">{prescription.refillDate}</p>
                    </div>
                    </div>
                ))
                ) : (
                <p className="text-sm text-muted-foreground">No upcoming refills</p>
                )}
            </CardContent>
            </Card>
        </div>
        </div>
    );
}