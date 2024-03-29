import Loading from '@/components/Loading';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
  currentUser,
  useUser,
} from '@clerk/nextjs';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';

export default async function HomePage() {
  const sesh = await currentUser();
  console.log(sesh);
  if (sesh) {
    redirect(`/links/${sesh?.id}`);
  }

  return (
    <div className="max-w min-w-screen flex min-h-screen  flex-col items-center justify-center bg-gradient-to-b from-[#1b013f] to-[#1a1b2e] p-4 text-white">
      <header className="mb-12 text-center">
        <h1 className="mb-4 text-6xl font-bold">
          Links<span className="text-[hsl(280,100%,70%)]">Hub</span>
        </h1>
        <h2 className="mb-4 text-2xl">The complete platform for your links</h2>
        <p className="mb-6 text-sm">
          Share all of your social media profiles and important links with a
          beautiful and customizable page.
        </p>
        <Suspense fallback={<Loading />}>
          <div className="space-y-3">
            <div className="block  rounded-lg bg-white/40 py-2 text-center text-lg font-medium text-white hover:bg-white/20">
              <Link href={'/sign-in'}> Sign in</Link>
            </div>

            <p>Or</p>
            <div className="block rounded-lg bg-white/40 py-2 text-center text-lg font-medium text-white hover:bg-white/20">
              <Link href={'/sign-up'}>Sign up</Link>
            </div>
          </div>
        </Suspense>
      </header>
      <hr className="mb-6 border-t-2 border-white" />
      <div className="h-full w-full max-w-lg rounded-lg border-4 border-indigo-900 p-2">
        <div className="mb-6 flex flex-col items-center">
          <Avatar>
            <AvatarImage
              alt="Profile picture"
              src="https://avatars.githubusercontent.com/u/124599?v=4"
            />
            <AvatarFallback>jdd</AvatarFallback>
          </Avatar>
          <h3 className="mt-4 text-2xl font-semibold">@Johndoe</h3>
        </div>
        <div className="my-4 space-y-4">
          <Link
            className="block w-full rounded-lg bg-white/10 py-4 text-center text-lg font-medium text-white hover:bg-white/20"
            href={`https://twitter.com/`}
            target="blank"
          >
            Twitter
          </Link>
          <Link
            className="glassmorphism block w-full rounded-lg bg-white/10 py-4 text-center text-lg font-medium text-white hover:bg-white/20"
            href="https://snapchat.com"
            target="_blank"
          >
            Snapchat
          </Link>

          <Link
            className="glassmorphism block w-full rounded-lg bg-white/10 py-4 text-center text-lg font-medium text-white hover:bg-white/20"
            href={`https://www.youtube.com/`}
            target="blank"
          >
            YouTube
          </Link>
        </div>
      </div>
    </div>
  );
}
