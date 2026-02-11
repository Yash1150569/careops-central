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
  FormResponse,
} from "./definitions";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

async function apiFetch(endpoint: string, options: RequestInit = {}) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);
    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`API Error: ${response.status} ${response.statusText} for ${endpoint}. Body: ${errorBody}`);
      if (options.method === 'POST' || options.method === 'PUT' || options.method === 'DELETE') return { success: false, message: `API Error: ${response.statusText}` };
      return [];
    }
    if (response.status === 204) {
      return options.method === 'POST' ? { success: true } : [];
    }
    return response.json();
  } catch (error) {
    console.error(`Network Error calling ${endpoint}:`, error);
    if (options.method === 'POST' || options.method === 'PUT' || options.method === 'DELETE') return { success: false, message: 'Network Error' };
    return [];
  }
}

// --- Data Fetching Functions ---

export async function fetchDashboardData(workspaceId: number = 1) {
  // NOTE: Assuming dashboard data comes from individual endpoints.
  // A dedicated dashboard endpoint would be more efficient.
  const bookings = await apiFetch(`/bookings?workspace_id=${workspaceId}`);
  const contacts = await apiFetch(`/contacts?workspace_id=${workspaceId}`);
  const alerts = await apiFetch(`/alerts?workspace_id=${workspaceId}`);
  return {
    bookings: Array.isArray(bookings) ? bookings.length : 0,
    alerts: Array.isArray(alerts) ? alerts : [],
    contactsCount: Array.isArray(contacts) ? contacts.length : 0,
  };
}

export async function getContacts(workspaceId: number = 1) {
  return apiFetch(`/contacts?workspace_id=${workspaceId}`);
}

export async function getBookings(workspaceId: number = 1) {
  // NOTE: Assuming the backend can enrich booking data with contact and booking_type details.
  return apiFetch(`/bookings?workspace_id=${workspaceId}`);
}

export async function getBookingTypes(workspaceId: number = 1) {
  return apiFetch(`/booking-types?workspace_id=${workspaceId}`);
}

export async function getInventory(workspaceId: number = 1) {
  return apiFetch(`/inventory?workspace_id=${workspaceId}`);
}

export async function getAlerts(workspaceId: number = 1) {
  return apiFetch(`/alerts?workspace_id=${workspaceId}`);
}

export async function getInbox(workspaceId: number = 1) {
    const conversations = await apiFetch(`/inbox`);
    // The user-provided API for /inbox returns {id, name}. The UI expects more details.
    // I'm adapting the response here, but you may need to update your backend to send more complete contact info.
    if (!Array.isArray(conversations)) return [];
    return conversations.map((conv: { id: number; name: string }) => ({
        id: conv.id,
        contact: {
            id: conv.id, // Using conversation ID as a fallback for the avatar. This might not be correct.
            name: conv.name,
            email: 'Email not provided by API'
        }
    }));
}

export async function getMessages(conversationId: number) {
    return apiFetch(`/messages/${conversationId}`);
}

export async function getFormSubmissions(workspaceId: number = 1) {
    return apiFetch(`/form-submissions?workspace_id=${workspaceId}`);
}

// --- Data Mutation Functions ---

export async function addContact(contact: Omit<Contact, "id" | "workspace_id">) {
  const endpoint = `/public/contact?name=${encodeURIComponent(contact.name)}&email=${encodeURIComponent(contact.email)}`;
  return apiFetch(endpoint, { method: 'POST' });
}

export async function addBooking(booking: {
  contact_id: number;
  booking_type_id: number;
  scheduled_at: string;
}) {
  const endpoint = `/public/book?contact_id=${booking.contact_id}&booking_type_id=${booking.booking_type_id}&date=${encodeURIComponent(booking.scheduled_at)}`;
  return apiFetch(endpoint, { method: 'POST' });
}

export async function sendMessage(conversation_id: number, body: string) {
  const endpoint = `/send-message?conv_id=${conversation_id}&body=${encodeURIComponent(body)}`;
  return apiFetch(endpoint, { method: 'POST' });
}

export async function addFormResponse(response: { name: string; email: string; message: string; }) {
  const endpoint = `/submit-form?name=${encodeURIComponent(response.name)}&email=${encodeURIComponent(response.email)}&message=${encodeURIComponent(response.message)}`;
  return apiFetch(endpoint, { method: 'POST' });
}
