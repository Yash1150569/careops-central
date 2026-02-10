'use server';

/**
 * @fileOverview An AI agent for drafting personalized email responses based on booking details.
 *
 * - draftPersonalizedResponse - A function that generates personalized email responses.
 * - PersonalizedResponseInput - The input type for the draftPersonalizedResponse function.
 * - PersonalizedResponseOutput - The return type for the draftPersonalizedResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedResponseInputSchema = z.object({
  bookingDetails: z.string().describe('Details of the booking, including contact name, booking type, and scheduled time.'),
  specialInstructions: z.string().optional().describe('Any special instructions related to the booking.'),
});
export type PersonalizedResponseInput = z.infer<typeof PersonalizedResponseInputSchema>;

const PersonalizedResponseOutputSchema = z.object({
  emailDraft: z.string().describe('A personalized email draft for the booking.'),
});
export type PersonalizedResponseOutput = z.infer<typeof PersonalizedResponseOutputSchema>;

export async function draftPersonalizedResponse(input: PersonalizedResponseInput): Promise<PersonalizedResponseOutput> {
  return draftPersonalizedResponseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedResponsePrompt',
  input: {schema: PersonalizedResponseInputSchema},
  output: {schema: PersonalizedResponseOutputSchema},
  prompt: `You are an AI assistant designed to draft personalized email responses for bookings.
  Based on the booking details and any special instructions, create a professional and friendly email draft.

  Booking Details: {{{bookingDetails}}}
  Special Instructions: {{{specialInstructions}}}

  Email Draft:`,
});

const draftPersonalizedResponseFlow = ai.defineFlow(
  {
    name: 'draftPersonalizedResponseFlow',
    inputSchema: PersonalizedResponseInputSchema,
    outputSchema: PersonalizedResponseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
