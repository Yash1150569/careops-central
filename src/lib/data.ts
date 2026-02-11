import "server-only";
import {
  Contact,
  Booking,
  Alert,
  BookingType,
  InventoryItem,
  Conversation,
  Message,
  Form,
  FormSubmission,
} from "./definitions";

// Simulate a database
let mockContacts: Contact[] = [
  {
    id: 1,
    workspace_id: 1,
    name: "John Doe",
    email: "john@test.com",
    phone: "123-456-7890",
  },
  {
    id: 2,
    workspace_id: 1,
    name: "Jane Smith",
    email: "jane@test.com",
    phone: "098-765-4321",
  },
];

let mockBookingTypes: BookingType[] = [
  { id: 1, workspace_id: 1, name: "Initial Consultation", duration: 60 },
  { id: 2, workspace_id: 1, name: "Follow-up", duration: 30 },
];

let mockBookings: Booking[] = [
  {
    id: 1,
    booking_type_id: 1,
    contact_id: 1,
    status: "scheduled",
    scheduled_at: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    booking_type_id: 2,
    contact_id: 2,
    status: "scheduled",
    scheduled_at: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

let mockAlerts: Alert[] = [
  {
    id: 1,
    workspace_id: 1,
    message: "Inventory for 'Gauze Pads' is low.",
    created_at: new Date().toISOString(),
  },
];

let mockInventory: InventoryItem[] = [
  { id: 1, workspace_id: 1, name: "Gauze Pads", quantity: 15, threshold: 20 },
  { id: 2, workspace_id: 1, name: "Syringes", quantity: 150, threshold: 50 },
];

let mockConversations: Conversation[] = [
  { id: 1, contact_id: 1 },
  { id: 2, contact_id: 2 },
];

let mockMessages: Message[] = [
    { id: 1, conversation_id: 1, body: "Hi John, this is a reminder for your appointment.", sender: "staff", is_auto: true, created_at: new Date(Date.now() - 60000 * 5).toISOString() },
    { id: 2, conversation_id: 1, body: "Thanks!", sender: "John Doe", is_auto: false, created_at: new Date(Date.now() - 60000 * 2).toISOString() },
    { id: 3, conversation_id: 2, body: "Hi Jane, looking forward to our meeting.", sender: "staff", is_auto: false, created_at: new Date(Date.now() - 60000 * 10).toISOString() },
];

let mockForms: Form[] = [
    { id: 1, workspace_id: 1, name: "New Patient Intake" }
];

let mockFormSubmissions: FormSubmission[] = [];


const simulateDelay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// --- Data Fetching Functions ---

export async function fetchDashboardData(workspaceId: number = 1) {
  await simulateDelay(500);
  return {
    bookings: mockBookings.length,
    alerts: mockAlerts,
    contactsCount: mockContacts.length,
  };
}

export async function getContacts(workspaceId: number = 1) {
  await simulateDelay(300);
  return [...mockContacts];
}

export async function getBookings(workspaceId: number = 1) {
  await simulateDelay(400);
  const bookingsWithDetails = mockBookings.map((booking) => ({
    ...booking,
    contact: mockContacts.find((c) => c.id === booking.contact_id),
    booking_type: mockBookingTypes.find(
      (bt) => bt.id === booking.booking_type_id
    ),
  }));
  return bookingsWithDetails;
}

export async function getBookingTypes(workspaceId: number = 1) {
  await simulateDelay(100);
  return [...mockBookingTypes];
}

export async function getInventory(workspaceId: number = 1) {
  await simulateDelay(600);
  return [...mockInventory];
}

export async function getAlerts(workspaceId: number = 1) {
  await simulateDelay(200);
  return [...mockAlerts];
}

export async function getInbox(workspaceId: number = 1) {
    await simulateDelay(200);
    const conversationsWithContact = mockConversations.map(conv => ({
        ...conv,
        contact: mockContacts.find(c => c.id === conv.contact_id)
    }));
    return conversationsWithContact;
}

export async function getMessages(conversationId: number) {
    await simulateDelay(150);
    return mockMessages.filter(m => m.conversation_id === conversationId);
}

export async function getFormSubmissions(workspaceId: number = 1) {
    await simulateDelay(300);
    const submissionsWithDetails = mockFormSubmissions.map(sub => ({
        ...sub,
        form: mockForms.find(f => f.id === sub.form_id),
        contact: mockContacts.find(c => c.id === sub.contact_id),
    }));
    return submissionsWithDetails;
}

// --- Data Mutation Functions ---

export async function addContact(
  contact: Omit<Contact, "id" | "workspace_id">
) {
  await simulateDelay(500);
  const newId = (mockContacts[mockContacts.length - 1]?.id || 0) + 1;
  const newContact: Contact = {
    id: newId,
    workspace_id: 1,
    ...contact,
    phone: contact.phone || null,
  };
  mockContacts.push(newContact);
  
  const newConvId = (mockConversations[mockConversations.length - 1]?.id || 0) + 1;
  const newConversation: Conversation = {
      id: newConvId,
      contact_id: newId,
  };
  mockConversations.push(newConversation);

  console.log(`[API SIM] Contact created:`, newContact);
  console.log(`[API SIM] Conversation created:`, newConversation);
  return newContact;
}

export async function addBooking(booking: {
  contact_id: number;
  booking_type_id: number;
  scheduled_at: string;
}) {
  await simulateDelay(500);
  const newId = (mockBookings[mockBookings.length - 1]?.id || 0) + 1;
  const newBooking: Booking = {
    id: newId,
    status: "scheduled",
    ...booking,
  };
  mockBookings.push(newBooking);

  const newFormSubId = (mockFormSubmissions[mockFormSubmissions.length - 1]?.id || 0) + 1;
  const newFormSubmission: FormSubmission = {
      id: newFormSubId,
      form_id: 1, // Default to form 1
      contact_id: booking.contact_id,
      status: 'pending',
  };
  mockFormSubmissions.push(newFormSubmission);

  console.log(`[API SIM] Booking created:`, newBooking);
  console.log(`[API SIM] Form Submission created:`, newFormSubmission);
  return newBooking;
}

export async function sendMessage(conversation_id: number, body: string) {
    await simulateDelay(100);
    const newId = (mockMessages[mockMessages.length - 1]?.id || 0) + 1;
    const newMessage: Message = {
        id: newId,
        conversation_id,
        body,
        sender: 'staff',
        is_auto: false,
        created_at: new Date().toISOString(),
    };
    mockMessages.push(newMessage);
    console.log("Automation stopped for this conversation");
    console.log(`[API SIM] Message sent:`, newMessage);
    return newMessage;
}
