import { getFormSubmissions } from "@/lib/data";
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
import { Badge } from "@/components/ui/badge";
import { FolderKanban } from "lucide-react";
import type { FormSubmission } from "@/lib/definitions";

export default async function FormsPage() {
  const submissions = await getFormSubmissions();

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "pending":
        return "default";
      case "reviewed":
        return "secondary";
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
              <FolderKanban className="h-5 w-5" />
              Form Submissions
            </CardTitle>
            <CardDescription>
              Track and review form submissions from your contacts.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Contact</TableHead>
              <TableHead>Form</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.length > 0 ? (
              submissions.map((sub: FormSubmission) => (
                <TableRow key={sub.id}>
                  <TableCell className="font-medium">{sub.contact?.name}</TableCell>
                  <TableCell>{sub.form?.name}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={getStatusVariant(sub.status) as any} className="capitalize">
                      {sub.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="h-24 text-center text-muted-foreground"
                >
                  No form submissions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
