// app/api/transactions/[id]/route.ts
import { connectToDatabase } from '@/lib/mongodb';
import Transaction from '@/lib/models/Transaction';
import { NextResponse } from 'next/server';

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();
  
  try {
    const transaction = await Transaction.findById(params.id);

    if (!transaction) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }

    return NextResponse.json(transaction, { status: 200 });

  } catch (err) {
    console.error('GET /api/transactions/[id] error:', err);
    return NextResponse.json({ error: 'Failed to fetch transaction' }, { status: 500 });
  }
}


export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();
  try {
    const data = await req.json();
    const updated = await Transaction.findByIdAndUpdate(params.id, data, { new: true });
    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update transaction' }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  try {
    await Transaction.findByIdAndDelete(params.id);
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete transaction' }, { status: 400 });
  }
}
