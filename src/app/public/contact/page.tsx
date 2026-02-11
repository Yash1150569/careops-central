'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createContact } from '@/app/actions';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  phone: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function PublicContactPage() {
    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: { name: '', email: '', phone: '' },
    });

    const { formState: { isSubmitting } } = form;

    const onSubmit = async (data: ContactFormValues) => {
        const result = await createContact(data);
        if (result.success) {
            toast({
                title: "Contact Received",
                description: "Thank you! We will be in touch shortly.",
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
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
             <Card className="w-full max-w-lg mx-auto">
                <CardHeader>
                    <CardTitle>Contact Us</CardTitle>
                    <CardDescription>Fill out the form below and we'll get back to you.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="john.doe@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone (Optional)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="123-456-7890" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={isSubmitting} className="w-full">
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
