export interface Book {
    _id: string;
    isbn: string;
    book_title: string;
    book_author: string;
    year_of_publication: string;
    publisher: string;
    images: {
        small: string;
        medium: string;
        large: string;
    }
    stats?: {
        views: number;
        sales: number;
        average_rating: number;
        rating_count: number;
    }
    popularity_score: number;
}