import { NextResponse } from 'next/server'
import OpenAI from 'openai'

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const { messages, blogPosts } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages are required and must be an array' },
        { status: 400 }
      )
    }

    // Create a system message with context from blog posts
    const systemMessage = {
      role: 'system',
      content: `You are a helpful assistant specializing in Solana security. 
      You provide information about security exploits, vulnerabilities, 
      and best practices in the Solana ecosystem. 
      
      Here is information about known exploits and vulnerabilities:
      ${JSON.stringify(blogPosts, null, 2)}
      
      When answering questions about specific exploits, reference the relevant information from the blog posts.
      If you don't know the answer to a question, say so honestly and suggest checking reliable sources.
      Keep your responses concise, technical, and informative.`
    }

    // Create the complete message array with the system message
    const completeMessages = [
      systemMessage,
      ...messages
    ]

    // Request completion from OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: completeMessages,
      temperature: 0.7,
      max_tokens: 2000,
    })

    // Extract the response content
    const content = response.choices[0]?.message?.content || 'Sorry, I could not generate a response'

    return NextResponse.json({ content })
  } catch (error) {
    console.error('Error in chat API route:', error)
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    )
  }
} 