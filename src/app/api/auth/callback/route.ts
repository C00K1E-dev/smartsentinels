import { handler } from "@civic/auth/nextjs"
import { NextRequest, NextResponse } from "next/server"

// Create the handler function
const authHandler = handler()

export async function GET(request: NextRequest) {
  console.log('Civic Auth callback GET called:', request.url)
  
  try {
    const response = await authHandler(request)
    console.log('Callback handler response:', response?.status)
    return response
  } catch (error) {
    console.error('Callback handler error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  console.log('Civic Auth callback POST called:', request.url)
  
  try {
    const response = await authHandler(request)
    console.log('Callback handler response:', response?.status)
    return response
  } catch (error) {
    console.error('Callback handler error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
