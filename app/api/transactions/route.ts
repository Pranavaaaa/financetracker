// app/api/transactions/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Transaction from '@/lib/models/Transaction';

export async function GET() {
  await connectToDatabase();
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await connectToDatabase();
  try {
    const body = await req.json();
    const { amount, date, description, category } = body;
    const newTransaction = await Transaction.create({ amount, date, description, category });
    return NextResponse.json(newTransaction, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create transaction' }, { status: 400 });
  }
}
