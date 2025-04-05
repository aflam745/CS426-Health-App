import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Prescription } from '../../types/prescription';

interface PrescriptionCardProps {
    prescription: Prescription;
    isExpanded: boolean;
    onToggleExpand: (id: number) => void;
    onRequestRefill: (id: number) => void;
    onSetReminder: (id: number) => void;
    lowSupplyThreshold?: number;
}

export function PrescriptionCard({ 
    prescription, 
    isExpanded, 
    onToggleExpand,
    onRequestRefill,
    onSetReminder,
    lowSupplyThreshold = 4 
}: PrescriptionCardProps): React.ReactElement {
    const isLowSupply = prescription.supply < lowSupplyThreshold;
    return (
        <Card className="w-full">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>{prescription.name}</CardTitle>
                        <CardDescription>{prescription.dosage}, {prescription.frequency}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        {isLowSupply && (
                            <Badge variant="destructive" className="mr-2">
                                Low Supply: {prescription.supply} days
                            </Badge>
                        )}
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => onToggleExpand(prescription.id)}
                            className="h-8 w-8 p-0"
                        >
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </Button>
                    </div>
                </div>
            </CardHeader>
            {isExpanded && (
                <>
                <CardContent className="pt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="font-medium">Dosage</p>
                            <p>{prescription.dosage}</p>
                        </div>
                        <div>
                            <p className="font-medium">Frequency</p>
                            <p>{prescription.frequency}</p>
                        </div>
                        <div>
                            <p className="font-medium">Supply Remaining</p>
                            <p>{prescription.supply} days</p>
                        </div>
                        <div>
                            <p className="font-medium">Next Refill Date</p>
                            <p>{prescription.refillDate}</p>
                        </div>
                        <div>
                            <p className="font-medium">Prescribing Doctor</p>
                            <p>{prescription.doctor}</p>
                        </div>
                        <div>
                            <p className="font-medium">Pharmacy</p>
                            <p>{prescription.pharmacy}</p>
                        </div>
                        <div className="md:col-span-2">
                            <p className="font-medium">Instructions</p>
                            <p>{prescription.instructions}</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                    <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onRequestRefill(prescription.id)}
                    >
                        Request Refill
                    </Button>
                    <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onSetReminder(prescription.id)}
                    >
                        Set Reminder
                    </Button>
                </CardFooter>
                </>
            )}
        </Card>
    );
}