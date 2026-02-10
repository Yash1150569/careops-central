'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { draftPersonalizedResponse } from '@/ai/flows/automated-personalized-responses';
import type { Booking, Contact, BookingType } from '@/lib/definitions';
import { Bot, Clipboard, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const aiResponderSchema = z.object({
  bookingId: z.string().min(1, 'Please select a booking.'),
  specialInstructions: z.string().optional(),
});

type AiResponderFormValues = z.infer<typeof aiResponderSchema>;

type EnrichedBooking = Booking & {
    contact?: Contact;
    booking_type?: BookingType;
}

type AiResponderClientProps = {
    bookings: EnrichedBooking[];
}

export function AiResponderClient({ bookings }: AiResponderClientProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [emailDraft, setEmailDraft] = useState('');

  const form = useForm<AiResponderFormValues>({
    resolver: zodResolver(aiResponderSchema),
    defaultValues: {
      bookingId: '',
      specialInstructions: '',
    },
  });

  const onSubmit = async (data: AiResponderFormValues) => {
    setIsLoading(true);
    setEmailDraft('');
    const selectedBooking = bookings.find(b => String(b.id) === data.bookingId);
    if (!selectedBooking) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Selected booking not found.',
      });
      setIsLoading(false);
      return;
    }

    const bookingDetails = `Contact: ${selectedBooking.contact?.name}, Type: ${selectedBooking.booking_type?.name}, Time: ${format(new Date(selectedBooking.scheduled_at), 'PPP p')}`;

    try {
      const result = await draftPersonalizedResponse({
        bookingDetails,
        specialInstructions: data.specialInstructions,
      });
      setEmailDraft(result.emailDraft);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'AI Error',
        description: 'Failed to generate email draft.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(emailDraft);
        toast({
        title: 'Copied!',
        description: 'Email draft copied to clipboard.',
        });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            AI Email Responder
          </CardTitle>
          <CardDescription>
            Generate a personalized response for a booking.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="bookingId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Booking</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a booking" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {bookings.map(booking => (
                          <SelectItem key={booking.id} value={String(booking.id)}>
                            {booking.contact?.name} - {booking.booking_type?.name} on {format(new Date(booking.scheduled_at), 'MMM d, yyyy')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specialInstructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Instructions (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Mention the upcoming public holiday."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate Draft
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>Generated Draft</CardTitle>
          <CardDescription>Review the AI-generated email draft below.</CardDescription>
        </CardHeader>
        <CardContent className="relative flex-grow">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-card/80 backdrop-blur-sm rounded-lg">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          <div className="relative p-4 bg-muted rounded-lg min-h-[200px] h-full whitespace-pre-wrap text-sm">
            {emailDraft || <span className="text-muted-foreground">The generated email draft will appear here.</span>}
          </div>
        </CardContent>
        {emailDraft && (
            <CardFooter>
                <Button variant="outline" onClick={copyToClipboard}>
                    <Clipboard className="mr-2 h-4 w-4" />
                    Copy to Clipboard
                </Button>
            </CardFooter>
        )}
      </Card>
    </div>
  );
}
