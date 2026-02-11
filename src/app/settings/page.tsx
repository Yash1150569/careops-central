import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Integration({
  title,
  name,
  status,
  desc,
}: {
  title: string;
  name: string;
  status: string;
  desc: string;
}) {
  return (
    <div className="flex justify-between items-center mb-4 pb-4 border-b last:border-b-0 last:pb-0 last:mb-0">
      <div>
        <h3 className="font-bold">{title}</h3>
        <p className="text-sm">{name}</p>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
      <div className="text-green-600 font-bold">{status}</div>
    </div>
  );
}

export default function Settings() {
  return (
    <div className="p-4 sm:p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Workspace Settings</h1>
      <p className="text-muted-foreground mb-8">
        Manage integrations, booking setup, forms, and automation rules.
      </p>

      <Card className="mb-5">
        <CardHeader>
          <CardTitle>Integrations</CardTitle>
        </CardHeader>
        <CardContent>
          <Integration
            title="Email Provider"
            name="Gmail"
            status="Connected"
            desc="Used for confirmations, alerts, and customer communication."
          />
          <Integration
            title="SMS Provider"
            name="Twilio"
            status="Connected"
            desc="Used for reminders and short notifications."
          />
        </CardContent>
      </Card>

      <Card className="mb-5">
        <CardHeader>
          <CardTitle>Booking Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Define your service types, durations, and availability.
          </p>
          <Button>Manage Booking Types</Button>
        </CardContent>
      </Card>

      <Card className="mb-5">
        <CardHeader>
          <CardTitle>Post-Booking Forms</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Forms sent automatically after a booking is confirmed.
          </p>
          <Button>Manage Forms</Button>
        </CardContent>
      </Card>

      <Card className="mb-5">
        <CardHeader>
          <CardTitle>Automation Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>New contact → Welcome message</li>
            <li>Booking → Confirmation</li>
            <li>Before booking → Reminder</li>
            <li>Pending form → Reminder</li>
            <li>Staff reply → Automation stops</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
