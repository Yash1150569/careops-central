import { getInbox } from "@/lib/data";
import { InboxClient } from "./inbox-client";

export default async function InboxPage() {
    const conversations = await getInbox();
    
    return <InboxClient initialConversations={conversations} />;
}
