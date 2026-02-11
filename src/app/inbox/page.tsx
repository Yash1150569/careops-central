import { getInbox } from "@/lib/data";
import { InboxClient } from "./inbox-client";
import { unstable_noStore as noStore } from 'next/cache';


export default async function InboxPage() {
    noStore();
    const conversations = await getInbox();
    
    return <InboxClient initialConversations={conversations} />;
}
