import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import React, { useState } from 'react';
import { usePrescriptions } from '../../hooks/usePrescriptions';
import { PrescriptionList } from './PrescriptionList';
import { AlertsPanel } from './AlertsPanel';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { PrescriptionForm } from './PrescriptionForm';
import { PrescriptionFormValues } from '../../types/prescription';

export function PrescriptionsPage(): React.ReactElement {
    const { 
        prescriptions, 
        loading, 
        error,
        getLowSupplyPrescriptions,
        getUpcomingRefills,
        requestRefill,
        addPrescription
    } = usePrescriptions();
    
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const lowSupplyThreshold = 4;
    const upcomingRefillsDays = 7;
    const lowSupplyPrescriptions = getLowSupplyPrescriptions(lowSupplyThreshold);
    const upcomingRefills = getUpcomingRefills(upcomingRefillsDays);
    
    const handleRequestRefill = (id: number): void => {
        requestRefill(id);
    };
    
    const handleSetReminder = (id: number): void => {
        console.log(`Setting reminder for prescription ${id}`);
    };
    
    const handleCloseModal = () => {
        setShowAddModal(false);
    };
    
    const handleFormSubmit = async (formData: PrescriptionFormValues & { 
        smsReminders?: boolean; 
        phoneNumber?: string | null 
    }) => {
        await addPrescription(formData);
        setShowAddModal(false);
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
                <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                        <DialogTitle>Add New Prescription</DialogTitle>
                        <DialogDescription>
                            Enter the details of your new prescription below.
                        </DialogDescription>
                    </DialogHeader>
                    
                    <PrescriptionForm 
                        onSubmit={handleFormSubmit}
                        onCancel={handleCloseModal}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}
