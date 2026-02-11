import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function FormsPage() {
  return (
    <div className="p-4 sm:p-10">
      <h1 className="text-3xl font-bold mb-2">Post-Booking Forms</h1>
      <p className="text-muted-foreground mb-8">
        These forms are automatically sent to customers after booking.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Intake Form</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Status: Active</p>
            <p className="text-sm text-muted-foreground mb-4">
              Linked to: Initial Consultation
            </p>
            <Button>Preview Form</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Agreement Form</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Status: Active</p>
            <p className="text-sm text-muted-foreground mb-4">
              Linked to: All Booking Types
            </p>
            <Button>Preview Form</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
