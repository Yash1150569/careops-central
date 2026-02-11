import {
  Contact,
  Booking,
  Alert,
  BookingType,
  Conversation,
  Message,
  Form,
  FormSubmission,
  FormResponse,
} from "./definitions";

export const mockContacts: Contact[] = [
  { id: 1, workspace_id: 1, name: "Alice Johnson", email: "alice@example.com", phone: "111-222-3333" },
  { id: 2, workspace_id: 1, name: "Bob Williams", email: "bob@example.com", phone: "444-555-6666" },
  { id: 3, workspace_id: 1, name: "Charlie Brown", email: "charlie@example.com", phone: null },
];

export const mockBookingTypes: BookingType[] = [
  { id: 1, workspace_id: 1, name: "Initial Consultation", duration: 60 },
  { id: 2, workspace_id: 1, name: "Follow-up", duration: 30 },
];

export const mockBookings: Booking[] = [
  { id: 1, contact_id: 1, booking_type_id: 1, scheduled_at: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), status: "scheduled" },
  { id: 2, contact_id: 2, booking_type_id: 2, scheduled_at: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), status: "scheduled" },
  { id: 3, contact_id: 1, booking_type_id: 2, scheduled_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), status: "completed" },
];

export const mockAlerts: Alert[] = [
  { id: 1, workspace_id: 1, message: "Inventory for 'Gauze Pads' is low.", created_at: new Date().toISOString() },
  { id: 2, workspace_id: 1, message: "A new contact 'Charlie Brown' was created.", created_at: new Date().toISOString() },
];

export const mockConversations: Conversation[] = [
    { id: 1, contact_id: 1 },
    { id: 2, contact_id: 2 },
    { id: 3, contact_id: 3 },
];

export const mockMessages: Message[] = [
    { id: 1, conversation_id: 1, body: "Hi, I'd like to reschedule my appointment.", sender: "Alice Johnson", is_auto: false, created_at: new Date(Date.now() - 60000 * 10).toISOString() },
    { id: 2, conversation_id: 1, body: "Of course, Alice. When works for you?", sender: "staff", is_auto: false, created_at: new Date(Date.now() - 60000 * 9).toISOString() },
    { id: 3, conversation_id: 2, body: "Thanks for the follow-up information.", sender: "Bob Williams", is_auto: false, created_at: new Date(Date.now() - 60000 * 5).toISOString() },
];

export const mockFormResponses: FormResponse[] = [
    { id: 1, name: 'Existing User', email: 'user@example.com', message: 'This is a test submission.', created_at: new Date().toISOString() }
];
