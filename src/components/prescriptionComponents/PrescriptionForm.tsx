import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { Switch } from "@/components/ui/switch";
import { PrescriptionFormValues } from '../../types/prescription';
import { usePrescriptionForm } from '../../hooks/usePrescriptionForm';

interface PrescriptionFormProps {
  onSubmit: (values: PrescriptionFormValues & { smsReminders?: boolean; phoneNumber?: string | null }) => Promise<void>;
  onCancel: () => void;
  initialValues?: Partial<PrescriptionFormValues>;
}

export function PrescriptionForm({ onSubmit, onCancel, initialValues = {} }: PrescriptionFormProps): React.ReactElement {
  const [enableSmsReminders, setEnableSmsReminders] = React.useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    reset
  } = usePrescriptionForm(initialValues, async (formValues) => {
    // Add SMS notification details to prescription data
    const prescriptionData = {
      ...formValues,
      smsReminders: enableSmsReminders,
      phoneNumber: enableSmsReminders ? phoneNumber : null
    };
    
    await onSubmit(prescriptionData);
    reset();
    setEnableSmsReminders(false);
    setPhoneNumber("");
  });

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}>
      <div className="grid gap-4 py-4">
        {/* Name field */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name*
          </Label>
          <div className="col-span-3">
            <Input
              id="name"
              value={values.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Medication name"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
        </div>
        
        {/* Dosage field */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="dosage" className="text-right">
            Dosage*
          </Label>
          <div className="col-span-3">
            <Input
              id="dosage"
              value={values.dosage}
              onChange={(e) => handleChange('dosage', e.target.value)}
              placeholder="e.g., 10mg"
              className={errors.dosage ? "border-red-500" : ""}
            />
            {errors.dosage && <p className="text-red-500 text-sm mt-1">{errors.dosage}</p>}
          </div>
        </div>
        
        {/* Frequency field */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="frequency" className="text-right">
            Frequency*
          </Label>
          <div className="col-span-3">
            <Input
              id="frequency"
              value={values.frequency}
              onChange={(e) => handleChange('frequency', e.target.value)}
              placeholder="e.g., Once daily"
              className={errors.frequency ? "border-red-500" : ""}
            />
            {errors.frequency && <p className="text-red-500 text-sm mt-1">{errors.frequency}</p>}
          </div>
        </div>
        
        {/* Supply field */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="supply" className="text-right">
            Supply*
          </Label>
          <div className="col-span-3">
            <Input
              id="supply"
              type="number"
              value={values.supply.toString()}
              onChange={(e) => handleChange('supply', parseInt(e.target.value) || 0)}
              placeholder="Number of pills/doses"
              className={errors.supply ? "border-red-500" : ""}
            />
            {errors.supply && <p className="text-red-500 text-sm mt-1">{errors.supply}</p>}
          </div>
        </div>
        
        {/* Refill Date field */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="refillDate" className="text-right">
            Refill Date
          </Label>
          <Input
            id="refillDate"
            type="date"
            className="col-span-3"
            value={values.refillDate}
            onChange={(e) => handleChange('refillDate', e.target.value)}
          />
        </div>
        
        {/* Doctor field */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="doctor" className="text-right">
            Doctor
          </Label>
          <Input
            id="doctor"
            className="col-span-3"
            value={values.doctor}
            onChange={(e) => handleChange('doctor', e.target.value)}
            placeholder="Prescribing doctor"
          />
        </div>
        
        {/* Instructions field */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="instructions" className="text-right">
            Instructions
          </Label>
          <Input
            id="instructions"
            className="col-span-3"
            value={values.instructions}
            onChange={(e) => handleChange('instructions', e.target.value)}
            placeholder="Special instructions"
          />
        </div>
        
        {/* Pharmacy field */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="pharmacy" className="text-right">
            Pharmacy
          </Label>
          <Input
            id="pharmacy"
            className="col-span-3"
            value={values.pharmacy}
            onChange={(e) => handleChange('pharmacy', e.target.value)}
            placeholder="Pharmacy name"
          />
        </div>
        
        {/* Last Filled field */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="lastFilled" className="text-right">
            Last Filled
          </Label>
          <Input
            id="lastFilled"
            type="date"
            className="col-span-3"
            value={values.lastFilled}
            onChange={(e) => handleChange('lastFilled', e.target.value)}
          />
        </div>
        
        {/* SMS Reminders toggle */}
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
      </div>
      
      <div className="flex justify-end gap-4 mt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Prescription"}
        </Button>
      </div>
    </form>
  );
}