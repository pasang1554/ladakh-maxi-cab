import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Check if message exists
    const message = await prisma.contact.findUnique({
      where: { id }
    })

    if (!message) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      )
    }

    // Delete the message
    await prisma.contact.delete({
      where: { id }
    })

    return NextResponse.json(
      { message: 'Message deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting message:', error)
    return NextResponse.json(
      { error: 'Failed to delete message' },
      { status: 500 }
    )
  }
} 