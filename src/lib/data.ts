import "server-only";
import {
  Contact,
  Booking,
  Alert,
  BookingType,
  InventoryItem,
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
  console.log(`[API SIM] Contact created:`, newContact);
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
  console.log(`[API SIM] Booking created:`, newBooking);
  return newBooking;
}
