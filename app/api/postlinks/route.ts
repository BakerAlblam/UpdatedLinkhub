import { connectToDatabase } from '@/lib/database/mongoose';
import User from '@/lib/models/user.model';
import { NextRequest, NextResponse } from 'next/server';

type Data = {
  clerkId: string;
  links: { platform: string; url: string }[]; // Updated to match the schema
};

export async function POST(nextRequest: NextRequest) {
  await connectToDatabase();
  const { clerkId, links } = (await nextRequest.json()) as Data;

  try {
    // Find the user by clerkId
    const user = await User.findOne({ clerkId });

    if (!user) {
      return NextResponse.json({ message: 'No user' }, { status: 404 });
    }

    // Add links to the user
    user.socialLinks.push(...links); // Spread operator to push individual elements

    // Save the updated user
    await user.save();

    return NextResponse.json({ message: 'Success!', user });
  } catch (error) {
    return NextResponse.json({ message: 'Insert failed', details: error });
  }
}
