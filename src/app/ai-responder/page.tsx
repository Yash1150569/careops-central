import { getBookings } from '@/lib/data';
import { AiResponderClient } from './ai-responder-client';

export default async function AiResponderPage() {
    const bookings = await getBookings();
    
    return <AiResponderClient bookings={bookings} />;
}
