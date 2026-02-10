import { getBookings, getContacts } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateBookingDialog } from "@/components/create-booking-dialog";
import { createBooking } from "@/app/actions";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import type { Booking } from "@/lib/definitions";

export default async function BookingsPage() {
  const bookings = await getBookings();
  const contacts = await getContacts();

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "scheduled":
        return "default";
      case "completed":
        return "secondary";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Bookings
            </CardTitle>
            <CardDescription>
              Manage your bookings here.
            </CardDescription>
          </div>
          <CreateBookingDialog createBookingAction={createBooking} contacts={contacts} />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Contact</TableHead>
              <TableHead>Booking Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.length > 0 ? (
              bookings.map((booking: Booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.contact?.name}</TableCell>
                  <TableCell>{booking.booking_type?.name}</TableCell>
                  <TableCell>{format(new Date(booking.scheduled_at), "PPP")}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={getStatusVariant(booking.status) as any} className="capitalize">
                      {booking.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground"
                >
                  No bookings found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
