import { tool } from "langchain";
import { z } from "zod";
import { Db } from "mongodb";

export function searchBookTool(db: Db) {
    const collection = db.collection("books");

    return tool(
        async ({ query, limit }) => {
            const books = query
                ? await collection.find(
                    {
                        $or: [
                            {
                                book_title: {
                                    $regex: query,
                                    $options: "i"
                                }
                            },
                            {
                                book_author: {
                                    $regex: query,
                                    $options: "i"
                                }
                            },
                            {
                                publisher: {
                                    $regex: query,
                                    $options: "i"
                                }
                            }
                        ]
                    },
                    {
                        projection: {
                            book_title: 1,
                            book_author: 1,
                            publisher: 1,
                            year_of_publication: 1,
                            images: 1,
                            popularity_score: 1,
                            stats: 1
                        }
                    }
                )
                .sort({
                    popularity_score: -1
                })
                .limit(limit)
                .toArray()
                : await collection.aggregate([
                    {
                        $sample: {
                            size: limit
                        }
                    },
                    {
                        $project: {
                            book_title: 1,
                            book_author: 1,
                            publisher: 1,
                            year_of_publication: 1,
                            images: 1,
                            popularity_score: 1,
                            stats: 1
                        }
                    }
                ]).toArray();

            if (!books.length) {
                return "Not found appropriates books.";
            }

            return JSON.stringify(
                books.map(book => ({
                    title: book.book_title,
                    author: book.book_author,
                    publisher: book.publisher,
                    year: book.year_of_publication,
                    rating: book.stats?.average_rating,
                    ratingCount: book.stats?.rating_count,
                    popularity: book.popularity_score,
                    image: book.images?.medium
                }))
            );
        },
        {
            name: "search_books",
            description:
                "Retrieve books from database. Use this tool whenever user asks about books, book titles, random books, recommendations, authors, publishers, ratings, or book lists. Query can be empty when user requests random books.",
            schema: z.object({
                query: z.string()
                    .optional()
                    .describe("Optional keyword for filtering books by title, author, or publisher."),
                limit: z.number()
                    .default(5)
                    .describe("Maximum number of books returned.")
            })
        }
    );
}