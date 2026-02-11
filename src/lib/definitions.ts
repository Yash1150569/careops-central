export type Workspace = {
  id: number;
  name: string;
  email: string;
  timezone: string;
  is_active: boolean;
};

export type User = {
  id: number;
  workspace_id: number;
  name: string;
  email: string;
  role: "Owner" | "Staff";
};

export type Contact = {
  id: number;
  workspace_id: number;
  name: string;
  email: string;
  phone: string | null;
};

export type Conversation = {
  id: number;
  contact_id: number;
  contact?: Contact;
};

export type Message = {
  id: number;
  conversation_id: number;
  body: string;
  sender: string; // "staff" or contact name
  is_auto: boolean;
  created_at: string;
};

export type BookingType = {
  id: number;
  workspace_id: number;
  name: string;
  duration: number;
};

export type Booking = {
  id: number;
  booking_type_id: number;
  contact_id: number;
  status: "scheduled" | "completed" | "cancelled";
  scheduled_at: string;
  contact?: Contact;
  booking_type?: BookingType;
};

export type Form = {
  id: number;
  workspace_id: number;
  name: string;
};

export type FormSubmission = {
  id: number;
  form_id: number;
  contact_id: number;
  status: "pending" | "reviewed";
  form?: Form;
  contact?: Contact;
};


export type InventoryItem = {
  id: number;
  workspace_id: number;
  name: string;
  quantity: number;
  threshold: number;
};

export type Alert = {
  id: number;
  workspace_id: number;
  message: string;
  created_at: string;
};
