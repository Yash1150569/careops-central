import { getContacts } from "@/lib/data";
import { CreateBookingDialog } from "@/components/create-booking-dialog";
import { createBooking } from "@/app/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateBookingForm } from "./booking-form";

export default async function PublicBookingPage() {
    const contacts = await getContacts();
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
             <Card className="w-full max-w-lg mx-auto">
                <CardHeader>
                    <CardTitle>Book an Appointment</CardTitle>
                    <CardDescription>Fill out the form below to schedule your appointment.</CardDescription>
                </CardHeader>
                <CardContent>
                    <CreateBookingForm createBookingAction={createBooking} contacts={contacts} />
                </CardContent>
            </Card>
        </div>
    );
}
