interface User {
    id: number;
    name: string;
    last_name: string;
    email: string;
    image: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
}

interface Conversation {
    id: number;
    uuid: string;
    name: string;
    last_name: string;
    image: string;
    last_message: string;
    last_message_date: string;
    isRead: boolean;
}

interface Message {
    id: number;
    conversation_id: string;
    sender_id: number;
    content: string;
    created_at: string;
    updated_at: string;
    sender: User;
    views: [];
}
