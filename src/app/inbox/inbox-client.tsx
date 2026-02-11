'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getMessagesAction, sendMessageAction } from '@/app/actions';
import type { Conversation, Message, Contact } from '@/lib/definitions';
import { Send, Loader2, MessageSquare, Menu } from 'lucide-react';
import { format, isToday } from 'date-fns';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/components/ui/sidebar';

type EnrichedConversation = Conversation & {
    contact?: Contact;
}

type InboxClientProps = {
    initialConversations: EnrichedConversation[];
}

export function InboxClient({ initialConversations }: InboxClientProps) {
    const [conversations, setConversations] = useState(initialConversations);
    const [selectedConversation, setSelectedConversation] = useState<EnrichedConversation | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const { isMobile } = useSidebar();
    const [isListVisible, setIsListVisible] = useState(!isMobile);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsListVisible(!isMobile);
    }, [isMobile]);

    useEffect(() => {
        if(messages.length > 0 && scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight });
        }
    }, [messages]);

    const handleSelectConversation = async (conversation: EnrichedConversation) => {
        setSelectedConversation(conversation);
        if (isMobile) {
            setIsListVisible(false);
        }
        setIsLoadingMessages(true);
        setMessages([]);
        const fetchedMessages = await getMessagesAction(conversation.id);
        setMessages(fetchedMessages);
        setIsLoadingMessages(false);
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim() || !selectedConversation) return;
        setIsSending(true);
        const sentMessage = {
            id: Math.random(),
            conversation_id: selectedConversation.id,
            body: newMessage,
            sender: 'staff',
            is_auto: false,
            created_at: new Date().toISOString()
        };
        setMessages(prev => [...prev, sentMessage]);
        setNewMessage("");
        
        await sendMessageAction(selectedConversation.id, newMessage);
        const updatedMessages = await getMessagesAction(selectedConversation.id);
        setMessages(updatedMessages);
        setIsSending(false);
    };

    return (
        <Card className="h-[calc(100vh-8rem)] w-full overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] h-full">
                <div className={cn("flex flex-col border-r", isMobile && !isListVisible && "hidden")}>
                    <div className="p-4 border-b">
                        <h2 className="text-xl font-bold flex items-center gap-2"><MessageSquare /> Inbox</h2>
                        <p className="text-sm text-muted-foreground">{conversations.length} conversations</p>
                    </div>
                    <ScrollArea className="flex-1">
                        <div className="flex flex-col">
                        {conversations.map(conv => (
                            <button key={conv.id} onClick={() => handleSelectConversation(conv)} className={cn('w-full text-left p-4 border-b', selectedConversation?.id === conv.id ? 'bg-muted' : 'hover:bg-muted/50')}>
                                <p className="font-semibold">{conv.contact?.name}</p>
                            </button>
                        ))}
                        </div>
                    </ScrollArea>
                </div>
                <div className={cn("flex flex-col h-full", isMobile && isListVisible && "hidden")}>
                    {selectedConversation ? (
                        <>
                            <div className="p-4 border-b flex items-center gap-3">
                                {isMobile && (
                                    <Button variant="ghost" size="icon" onClick={() => setIsListVisible(true)}>
                                        <Menu />
                                    </Button>
                                )}
                                <Avatar>
                                    <AvatarImage src={`https://picsum.photos/seed/${selectedConversation.contact?.id}/100/100`} />
                                    <AvatarFallback>{selectedConversation.contact?.name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-semibold">{selectedConversation.contact?.name}</h3>
                                    <p className="text-sm text-muted-foreground">{selectedConversation.contact?.email}</p>
                                </div>
                            </div>
                            <ScrollArea className="flex-1 p-4 bg-muted/20" ref={scrollAreaRef}>
                                <div className="space-y-6">
                                {isLoadingMessages ? (
                                    <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div>
                                ) : (
                                    messages.map(msg => (
                                        <div key={msg.id} className={cn('flex items-end gap-2', msg.sender === 'staff' ? 'justify-end' : 'justify-start')}>
                                            {msg.sender !== 'staff' && <Avatar className="h-8 w-8"><AvatarFallback>{selectedConversation.contact?.name?.charAt(0)}</AvatarFallback></Avatar>}
                                            <div className={cn('rounded-lg p-3 max-w-xs lg:max-w-md shadow-sm', msg.sender === 'staff' ? 'bg-primary text-primary-foreground' : 'bg-card')}>
                                                <p className="text-sm">{msg.body}</p>
                                                <p className="text-xs text-right mt-1 opacity-70">{format(new Date(msg.created_at), 'p')}</p>
                                            </div>
                                            {msg.sender === 'staff' && <Avatar className="h-8 w-8"><AvatarFallback>S</AvatarFallback></Avatar>}
                                        </div>
                                    ))
                                )}
                                </div>
                            </ScrollArea>
                            <div className="p-4 border-t bg-card">
                                <div className="flex w-full items-center space-x-2">
                                    <Input
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && !isSending && handleSendMessage()}
                                        placeholder="Type a message..."
                                        disabled={isSending}
                                        autoFocus
                                    />
                                    <Button onClick={handleSendMessage} disabled={isSending || !newMessage.trim()} size="icon">
                                        {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                                        <span className="sr-only">Send</span>
                                    </Button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                            <MessageSquare className="h-12 w-12 mb-4" />
                            <h3 className="text-lg font-medium">Select a conversation</h3>
                            <p className="text-sm">Choose a contact from the list to start messaging.</p>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
}
