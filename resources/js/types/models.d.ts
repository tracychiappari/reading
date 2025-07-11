export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Book {
    id: number;
    title: string;
    author: string;
    cover: string | null;
    created_at: string;
    updated_at: string;
    perusals: Perusal[] | null;
}

export interface Perusal {
    id: number;
    book_id: number;
    book: Book;
    status: 'not_started' | 'in_progress' | 'completed' | 'abandoned';
    started_at: string | null;
    finished_at: string | null;
}
