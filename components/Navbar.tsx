/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';

import AddLinkForm from './AddLinkForm';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from './ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Settings } from 'lucide-react';

const bgs = [
  {
    id: '1',
    name: 'QuantumGradient',
    src: '/assets/QuantumGradient.png',
  },
  {
    id: '2',
    name: 'EndlessConstellation',
    src: '/assets/EndlessConstellation.png',
  },
  {
    id: '3',
    name: 'HollowedBoxes',
    src: '/assets/HollowedBoxes.png',
  },
  {
    id: '4',
    name: 'DragonScales',
    src: '/assets/DragonScales.png',
  },
  {
    id: '5',
    name: 'WaveyFingerprint',
    src: '/assets/WaveyFingerprint.png',
  },

  {
    id: '6',
    name: 'GeometricIntersection',
    src: '/assets/GeometricIntersection.png',
  },
  {
    id: '7',
    name: 'BullseyeGradient',
    src: '/assets/BullseyeGradient.png',
  },
  {
    id: '8',
    name: 'ColorfulStingrays',
    src: '/assets/ColorfulStingrays.png',
  },
];

export function Navbar() {
  const user = useUser();
  const isSignedIn = user.isSignedIn;
  const authId = user?.user?.id;

  const [selectImage, setSelectImage] = useState('');
  const router = useRouter();

  const handleImageClick = async (name: string) => {
    try {
      await axios.put(`/api/users`, {
        background: name, // Change this line
        authId,
      });
      router.refresh();
      setSelectImage(name);
    } catch (error) {
      console.error('Error updating background:', error);
    }
  };

  return (
    <header className="flex items-center justify-center gap-10 border-b px-4 py-2 text-center md:px-8 lg:px-10 xl:px-12">
      <Drawer>
        <DrawerTrigger>
          <Settings />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Choose your background</DrawerTitle>
            <DrawerDescription>
              {' '}
              <form className="mx-auto max-w-screen-lg">
                <div className="flex w-full items-center space-x-2">
                  <div className="flex-col-1 flex h-full w-full gap-1">
                    {bgs.map((bg) => (
                      <div key={bg.id}>
                        <img
                          src={bg?.src}
                          className="w-full cursor-pointer"
                          style={{
                            height: '300px',
                            width: '500px',
                            aspectRatio: '4/2',
                          }} // Maintain a specific aspect ratio
                          onClick={() => handleImageClick(bg.name)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <p className="flex items-center">
        <span className="ml-2 text-lg font-semibold text-purple-800">
          <AddLinkForm />
        </span>
      </p>
      <div className="text-lg font-semibold text-purple-800">
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <SignInButton redirectUrl={'/links'} />
        )}
      </div>
    </header>
  );
}
