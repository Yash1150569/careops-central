import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PublicForm() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader className="text-center">
                <CardTitle className="text-3xl">Customer Intake Form</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <Input placeholder="Full Name" />
                    <Input type="email" placeholder="Email" />
                    <Textarea placeholder="Describe your issue" rows={5} />
                    <Button className="w-full">Submit Form</Button>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
