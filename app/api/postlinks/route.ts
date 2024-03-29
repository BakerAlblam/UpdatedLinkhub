import { connectToDatabase } from '@/lib/database/mongoose';
import User from '@/lib/models/user.model';
import { NextRequest, NextResponse } from 'next/server';

type Data = {
  clerkId: string;
  links: string[];
  linkUrl: string[];
};

export async function POST(nextRequest: NextRequest) {
  await connectToDatabase();
  const { clerkId, links, linkUrl } = (await nextRequest.json()) as Data;

  try {
    // Find the user by clerkId
    const user = await User.findOne({ clerkId });

    if (!user) {
      return NextResponse.json({ message: 'No user' }, { status: 404 });
    }

    // Convert arrays to strings if they are arrays
    const concatenatedLinks = Array.isArray(links) ? links.join(', ') : links;
    const concatenatedLinkUrl = Array.isArray(linkUrl)
      ? linkUrl.join(', ')
      : linkUrl;

    // Add links and linkUrls to the user
    user.links.push(concatenatedLinks);
    user.linkUrl.push(concatenatedLinkUrl);

    // Save the updated user
    await user.save();

    return NextResponse.json({ message: 'Success!', user });
  } catch (error) {
    return NextResponse.json({ message: 'Insert failed', details: error });
  }
}
