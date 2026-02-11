"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import type { Contact } from "@/lib/definitions";

const bookingSchema = z.object({
  contact_id: z.string({ required_error: "Please select a contact." }),
  booking_type_id: z.string({ required_error: "Please select a booking type." }),
  scheduled_at: z.date({ required_error: "A date is required." }),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

type CreateBookingFormProps = {
  createBookingAction: (data: BookingFormValues) => Promise<{ success: boolean; message: string }>;
  contacts: Contact[];
};

export function CreateBookingForm({ createBookingAction, contacts }: CreateBookingFormProps) {
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingFormValues) => {
    const result = await createBookingAction(data);
    if (result.success) {
      toast({
        title: "Booking Confirmed!",
        description: result.message,
      });
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="contact_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a contact" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {contacts.map((contact) => (
                      <SelectItem key={contact.id} value={String(contact.id)}>
                        {contact.name}
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
            name="booking_type_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Booking Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Initial Consultation</SelectItem>
                    <SelectItem value="2">Follow-up</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="scheduled_at"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Scheduled Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
            {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {form.formState.isSubmitting ? "Booking..." : "Book Appointment"}
          </Button>
      </form>
    </Form>
  );
}
