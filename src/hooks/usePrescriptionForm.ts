import { useState } from 'react';
import { PrescriptionFormValues, FormErrors } from '../types/prescription';

type FormSubmitHandler = (values: PrescriptionFormValues) => Promise<void> | void;

export function usePrescriptionForm(
    initialValues: Partial<PrescriptionFormValues> = {}, 
    onSubmit: FormSubmitHandler
) {
    const defaultValues: PrescriptionFormValues = {
        name: '',
        dosage: '',
        frequency: '',
        supply: 0,
        refillDate: '',
        doctor: '',
        instructions: '',
        pharmacy: '',
        lastFilled: '',
        ...initialValues
    };
    const [values, setValues] = useState<PrescriptionFormValues>(defaultValues);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const handleChange = (field: keyof PrescriptionFormValues, value: string | number): void => {
        setValues(prev => ({
            ...prev,
            [field]: value
        }));
    // Clear error
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: undefined
            }));
        }
    };
    const validate = (): boolean => {
        const newErrors: FormErrors = {};
        // Required fields
        (['name', 'dosage', 'frequency', 'supply'] as const).forEach(field => {
            if (!values[field]) {
                newErrors[field] = 'This field is required';
            }
        });
        if (values.supply && isNaN(Number(values.supply))) {
            newErrors.supply = 'Supply must be a number';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e?: React.FormEvent): Promise<void> => {
        if (e) e.preventDefault();
        if (!validate()) return;
        setIsSubmitting(true);
        try {
            await onSubmit(values);
            setValues(defaultValues); // Reset form after successful submission
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };
    const reset = (): void => {
        setValues(defaultValues);
        setErrors({});
    };
    return {
        values,
        errors,
        isSubmitting,
        handleChange,
        handleSubmit,
        reset
    };
}