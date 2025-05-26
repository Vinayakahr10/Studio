
import { NextResponse } from 'next/server';

export async function GET() {
  // In a real application, you might fetch data from a database here
  // or perform other server-side logic.
  return NextResponse.json({ message: 'Hello from the Next.js Backend!' });
}
