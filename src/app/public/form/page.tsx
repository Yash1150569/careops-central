import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function PublicForm() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-lg mx-auto">
          <CardHeader className="text-center">
              <CardTitle className="text-2xl">Customer Intake Form</CardTitle>
              <CardDescription>Please fill out the details below.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
              <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" />
              </div>
              <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" />
              </div>
              <div className="grid gap-2">
                  <Label htmlFor="issue">Describe your issue</Label>
                  <Textarea id="issue" placeholder="Please describe your issue in detail..."/>
              </div>
              <Button className="w-full">Submit Form</Button>
          </CardContent>
      </Card>
    </div>
  );
}
