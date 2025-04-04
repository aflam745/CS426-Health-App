import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from 'react';
import { usePrescriptions } from '../../hooks/usePrescriptions';
import { PrescriptionList } from './PrescriptionList';
import { AlertsPanel } from './AlertsPanel';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch'
import { Plus } from 'lucide-react';

export function PrescriptionsPage(): React.ReactElement {
    const { 
        prescriptions, 
        loading, 
        error,
        getLowSupplyPrescriptions,
        getUpcomingRefills,
        requestRefill
    } = usePrescriptions();
    
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const lowSupplyThreshold = 4;
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const upcomingRefillsDays = 7;
    const lowSupplyPrescriptions = getLowSupplyPrescriptions(lowSupplyThreshold);
    const upcomingRefills = getUpcomingRefills(upcomingRefillsDays);
    const [enableSmsReminders, setEnableSmsReminders] = useState<boolean>(false);
    
    const handleRequestRefill = (id: number): void => {
        requestRefill(id);
    };
    
    const handleSetReminder = (id: number): void => {
        console.log(`Setting reminder for prescription ${id}`);
    };
    
    if (loading) {
        return <div className="flex justify-center items-center h-64">Loading prescriptions...</div>;
    }
    
    if (error) {
        return (
        <div className="text-center text-red-500 p-4">
            Error: {error}
        </div>
        );
    }
    return (
        <div className="flex flex-col lg:flex-row gap-6 p-6 max-w-6xl mx-auto">
            <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">My Prescriptions</h1>
                <Button onClick={() => setShowAddModal(true)}>
                <Plus className="h-4 w-4 mr-2" /> Add Prescription
                </Button>
            </div>
            <PrescriptionList 
                prescriptions={prescriptions} 
                onRequestRefill={handleRequestRefill} 
                onSetReminder={handleSetReminder} 
                lowSupplyThreshold={lowSupplyThreshold} 
            />
            </div>
            <AlertsPanel 
            lowSupplyPrescriptions={lowSupplyPrescriptions} 
            upcomingRefills={upcomingRefills} 
            onRequestRefill={handleRequestRefill} 
            />
            
            <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Add New Prescription</DialogTitle>
                <DialogDescription>
                    Enter the details of your new prescription below.
                </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                    Name
                    </Label>
                    <Input
                    id="name"
                    className="col-span-3"
                    placeholder="Medication name"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="dosage" className="text-right">
                    Dosage
                    </Label>
                    <Input
                    id="dosage"
                    className="col-span-3"
                    placeholder="e.g., 10mg"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="supply" className="text-right">
                    Supply
                    </Label>
                    <Input
                    id="supply"
                    type="number"
                    className="col-span-3"
                    placeholder="Number of pills/doses"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="sms-reminders" className="text-right">
                    SMS Reminders
                    </Label>
                    <div className="flex items-center space-x-2 col-span-3">
                        <Switch
                            id="sms-reminders"
                            checked={enableSmsReminders}
                            onCheckedChange={setEnableSmsReminders}
                        />
                        <Label htmlFor="sms-reminders">
                            {enableSmsReminders ? "Enabled" : "Disabled"}
                        </Label>
                    </div>
                </div>
                {enableSmsReminders && (
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phone-number" className="text-right">
                        Phone Number
                        </Label>
                        <Input
                        id="phone-number"
                        className="col-span-3"
                        placeholder="(123) 456-7890"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                )}
                </div>
                
                <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>
                    Cancel
                </Button>
                <Button type="button" onClick={() => {
                    setShowAddModal(false);
                }}>
                    Add Prescription
                </Button>
                </DialogFooter>
            </DialogContent>
            </Dialog>
        </div>
    );
}