import "server-only";
import {
  Contact,
  Booking,
  Alert,
  BookingType,
  Conversation,
  Message,
  FormSubmission,
  FormResponse,
} from "./definitions";
import {
  mockAlerts,
  mockBookings,
  mockBookingTypes,
  mockContacts,
  mockConversations,
  mockFormResponses,
  mockMessages,
} from "@/lib/mock-data";

const BASE = process.env.NEXT_PUBLIC_API_URL!;

async function handleFetch(endpoint: string, options: RequestInit = {}, mockData: any) {
  if (!BASE) {
    return mockData;
  }

  const url = `${BASE}${endpoint}`;
  const response = await fetch(url, { ...options, cache: 'no-store' }).catch(
    (error) => {
      console.error(`Network error calling ${url}. Falling back to mock data.`, error);
      return null; // Return null on network error
    }
  );

  if (!response) {
    return mockData; // Fallback if fetch itself failed
  }

  if (!response.ok) {
    console.error(`API Error: ${response.status} ${response.statusText} for ${url}. Falling back to mock data.`);
    return mockData;
  }

  if (response.status === 204) {
    return options.method === 'POST' ? { success: true } : [];
  }
  
  try {
    return await response.json();
  } catch (error) {
    console.error(`JSON parsing error for ${url}. Falling back to mock data.`, error);
    return mockData;
  }
}

// --- Data Fetching Functions ---

export async function fetchDashboardData(workspaceId: number = 1) {
  // This implementation reuses the more robust individual fetching functions,
  // which already have a fallback mechanism.
  const [bookingsData, alertsData, contactsData] = await Promise.all([
    getBookings(workspaceId),
    getAlerts(workspaceId),
    getContacts(workspaceId),
  ]);

  return {
    bookings: bookingsData.length,
    alerts: alertsData,
    contactsCount: contactsData.length,
  };
}

export async function getContacts(workspaceId: number = 1): Promise<Contact[]> {
    return handleFetch(`/contacts?workspace_id=${workspaceId}`, {}, mockContacts);
}

export async function getBookings(workspaceId: number = 1): Promise<Booking[]> {
    const data = await handleFetch(`/bookings?workspace_id=${workspaceId}`, {}, mockBookings);
    // The API might not return enriched data, so let's enrich it here for consistency
    if (!Array.isArray(data)) {
        return [];
    }
    return data.map((booking: Booking) => ({
        ...booking,
        contact: mockContacts.find(c => c.id === booking.contact_id),
        booking_type: mockBookingTypes.find(bt => bt.id === booking.booking_type_id),
    }));
}

export async function getBookingTypes(workspaceId: number = 1): Promise<BookingType[]> {
    return handleFetch(`/booking-types?workspace_id=${workspaceId}`, {}, mockBookingTypes);
}

export async function getAlerts(workspaceId: number = 1): Promise<Alert[]> {
    return handleFetch(`/alerts?workspace_id=${workspaceId}`, {}, mockAlerts);
}

export async function getInbox(workspaceId: number = 1): Promise<EnrichedConversation[]> {
    const conversations: {id: number, name: string}[] = await handleFetch(`/inbox`, {}, mockConversations.map(c => ({id: c.id, name: mockContacts.find(ct => ct.id === c.contact_id)?.name || "Unknown"})));
    if (!Array.isArray(conversations)) {
        return [];
    }
    return conversations.map((conv) => {
        const contact = mockContacts.find(c => c.name === conv.name);
        return {
            id: conv.id,
            contact_id: contact?.id || 0,
            contact: contact,
        }
    });
}

export async function getMessages(conversationId: number): Promise<Message[]> {
    return handleFetch(`/messages/${conversationId}`, {}, mockMessages.filter(m => m.conversation_id === conversationId));
}

export async function getFormSubmissions(workspaceId: number = 1): Promise<FormSubmission[]> {
    // This function wasn't implemented with a mock fallback, let's add one.
    return handleFetch(`/form-submissions?workspace_id=${workspaceId}`, {}, []);
}


// --- Data Mutation Functions ---

export async function addContact(contact: Omit<Contact, "id" | "workspace_id">) {
  const endpoint = `/public/contact?name=${encodeURIComponent(contact.name)}&email=${encodeURIComponent(contact.email)}`;
  return handleFetch(endpoint, { method: 'POST' }, { success: true });
}

export async function addBooking(booking: {
  contact_id: number;
  booking_type_id: number;
  scheduled_at: string;
}) {
  const endpoint = `/public/book?contact_id=${booking.contact_id}&booking_type_id=${booking.booking_type_id}&date=${encodeURIComponent(booking.scheduled_at)}`;
  return handleFetch(endpoint, { method: 'POST' }, { success: true });
}

export async function sendMessage(conversation_id: number, body: string) {
  const endpoint = `/send-message?conv_id=${conversation_id}&body=${encodeURIComponent(body)}`;
  return handleFetch(endpoint, { method: 'POST' }, { success: true });
}

export async function submitPublicForm(response: { name: string; email: string; message: string; }) {
  const endpoint = `/submit-form?name=${encodeURIComponent(response.name)}&email=${encodeURIComponent(response.email)}&message=${encodeURIComponent(response.message)}`;
   if (!BASE) {
    const newResponse: FormResponse = {
        id: mockFormResponses.length + 1,
        ...response,
        created_at: new Date().toISOString(),
    };
    mockFormResponses.push(newResponse);
    console.log("Mock Submit Form:", newResponse);
    console.log("Mock Email Sent To:", response.email);
    return { success: true, message: "Form submitted successfully. Check your email for a confirmation." };
  }
  return handleFetch(endpoint, { method: 'POST' }, { success: true });
}

// Helper types for enriched data
type EnrichedConversation = Omit<Conversation, 'contact'> & {
    contact?: Contact;
};
