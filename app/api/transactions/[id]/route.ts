// app/api/transactions/[id]/route.ts
import { connectToDatabase } from '@/lib/mongodb';
import Transaction from '@/lib/models/Transaction';
import { NextResponse } from 'next/server';

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
    return NextResponse.json({ error: err }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  try {
    await Transaction.findByIdAndDelete(params.id);
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }
}
