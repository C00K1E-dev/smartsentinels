import { handler } from "@civic/auth/nextjs"
import { NextRequest, NextResponse } from "next/server"

// Create the handler function
const authHandler = handler()

export async function GET(request: NextRequest, context: { params: { civicauth: string[] } }) {
  console.log('Civic Auth GET route called:', request.url)
  console.log('Params:', context.params)
  
  try {
    const response = await authHandler(request)
    console.log('Handler response:', response?.status)
    return response
  } catch (error) {
    console.error('Handler error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest, context: { params: { civicauth: string[] } }) {
  console.log('Civic Auth POST route called:', request.url)
  console.log('Params:', context.params)
  
  try {
    const response = await authHandler(request)
    console.log('Handler response:', response?.status)
    return response
  } catch (error) {
    console.error('Handler error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}