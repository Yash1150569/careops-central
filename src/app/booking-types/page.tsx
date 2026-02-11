'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

export default function BookingTypesPage(){
  const [types, setTypes] = useState([
    {name:"Initial Consultation", duration:30},
    {name:"Follow-up", duration:20}
  ]);

  const addType = ()=>{
    setTypes([...types, {name:"New Service", duration:15}]);
  };

  return (
    <div className="p-4 sm:p-10">
      <div className="flex justify-between items-start mb-8">
        <div>
            <h1 className="text-3xl font-bold mb-2">Booking Types</h1>
            <p className="text-muted-foreground">Define your service types, durations, and availability.</p>
        </div>
        <Button onClick={addType}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Booking Type
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {types.map((t,i)=>(
          <Card key={i}>
            <CardHeader>
                <CardTitle>{t.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Duration: {t.duration} mins</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
