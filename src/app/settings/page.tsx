import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Settings as SettingsIcon } from "lucide-react";

export default function SettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SettingsIcon />
          Settings
        </CardTitle>
        <CardDescription>Manage your integrations and settings.</CardDescription>
      </CardHeader>
      <CardContent>
        <h2 className="text-lg font-semibold mb-4">Integrations</h2>
        <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-sm text-muted-foreground">Gmail</p>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Connected</span>
                </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                    <h3 className="font-medium">SMS</h3>
                    <p className="text-sm text-muted-foreground">Twilio</p>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Connected</span>
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
