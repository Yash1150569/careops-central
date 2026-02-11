'use server';

import { z } from 'zod';
import { addContact, addBooking, getMessages, sendMessage, submitPublicForm as submitPublicFormToApi } from '@/lib/data';
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
        revalidatePath('/inbox');
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
        revalidatePath('/forms');
        return { success: true, message: 'Booking created successfully.' };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, message: error.errors.map(e => e.message).join(', ') };
        }
        console.error(error);
        return { success: false, message: 'An unexpected error occurred.' };
    }
}

export async function getMessagesAction(conversationId: number) {
    return getMessages(conversationId);
}

export async function sendMessageAction(conversationId: number, body: string) {
    const message = await sendMessage(conversationId, body);
    revalidatePath(`/inbox`); // This might not be enough, client-side state update is better
    return message;
}

const formResponseSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email." }),
    message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormResponseValues = z.infer<typeof formResponseSchema>;

export async function submitPublicForm(data: FormResponseValues) {
    try {
        const validatedData = formResponseSchema.parse(data);
        await submitPublicFormToApi(validatedData);
        revalidatePath('/forms');
        return { success: true, message: 'Form submitted successfully. Check your email for a confirmation.' };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, message: error.errors.map(e => e.message).join(', ') };
        }
        return { success: false, message: 'An unexpected error occurred.' };
    }
}
