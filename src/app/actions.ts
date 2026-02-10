'use server';

import { z } from 'zod';
import { addContact, addBooking } from '@/lib/data';
import { revalidatePath } from 'next/cache';

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  phone: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export async function createContact(data: ContactFormValues) {
    try {
        const validatedData = contactSchema.parse(data);
        await addContact(validatedData);
        revalidatePath('/');
        revalidatePath('/contacts');
        return { success: true, message: 'Contact created successfully.' };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, message: error.errors.map(e => e.message).join(', ') };
        }
        return { success: false, message: 'An unexpected error occurred.' };
    }
}

const bookingSchema = z.object({
  contact_id: z.string({ required_error: "Please select a contact." }),
  booking_type_id: z.string({ required_error: "Please select a booking type." }),
  scheduled_at: z.date({ required_error: "A date is required." }),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export async function createBooking(data: BookingFormValues) {
    try {
        const validatedData = bookingSchema.parse(data);
        await addBooking({
            contact_id: parseInt(validatedData.contact_id),
            booking_type_id: parseInt(validatedData.booking_type_id),
            scheduled_at: validatedData.scheduled_at.toISOString(),
        });
        revalidatePath('/');
        revalidatePath('/bookings');
        return { success: true, message: 'Booking created successfully.' };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, message: error.errors.map(e => e.message).join(', ') };
        }
        console.error(error);
        return { success: false, message: 'An unexpected error occurred.' };
    }
}
