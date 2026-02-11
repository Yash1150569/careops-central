'use client';

import { createContact, createBooking } from "@/app/actions";
import { CreateContactDialog } from "@/components/create-contact-dialog";
import { CreateBookingDialog } from "@/components/create-booking-dialog";
import type { Contact } from "@/lib/definitions";

type QuickActionsProps = {
  contacts: Contact[];
};

export function QuickActions({ contacts }: QuickActionsProps) {
  return (
    <>
      <CreateContactDialog createContactAction={createContact} />
      <CreateBookingDialog
        createBookingAction={createBooking}
        contacts={contacts}
      />
    </>
  );
}
