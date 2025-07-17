import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, slug, excerpt, content, image, author, date, readTime, category } = body;

    const blogPost = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        image,
        author,
        date: new Date(date),
        readTime,
        category,
      },
    });

    return NextResponse.json(blogPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating blog post" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const blogPosts = await prisma.blogPost.findMany({
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json(blogPosts);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching blog posts" },
      { status: 500 }
    );
  }
} 