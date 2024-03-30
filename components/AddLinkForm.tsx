'use client';
import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import axios from 'axios';
import { type FieldValues, useForm } from 'react-hook-form';
import { useUser } from '@clerk/nextjs';
import { toast } from './ui/use-toast';
import { useRouter } from 'next/navigation';

type FormData = {
  userId: number;
  content: string;
  link: string;
  username: string;
  authId: string;
};

const AddLinkForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const user = useUser();
  const data = user;
  const userId = data?.user?.id;

  const onSubmit = async (data: FieldValues) => {
    try {
      isSubmitting;
      const res = await axios.post('/api/postlinks', {
        clerkId: userId,
        links: [
          { platform: data?.link as string, url: data?.content as string },
        ],
      });
      console.log(res);
      if (res.status === 200) {
        toast({
          title: 'Link added',
        });
        reset();
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">Add Link</Button>
        </DialogTrigger>
        <DialogContent className="text-black sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add link</DialogTitle>
          </DialogHeader>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2 space-y-2">
                  <Label className=" text-black">Link title</Label>
                  <Input
                    {...register('link', {
                      required: 'Title is required',
                    })}
                    type="text"
                  />
                  {errors.link && (
                    <p className="text-red-500"> {`${errors.link.message}`} </p>
                  )}
                  <Label className="">URL</Label>
                  <Input
                    {...register('content', {
                      required: 'URL is required',
                    })}
                    type="text"
                  />
                  {errors.content && (
                    <p className="text-red-500">
                      {' '}
                      {`${errors.content.message}`}{' '}
                    </p>
                  )}
                </div>
              </div>
              <DialogFooter className="sm:justify-start">
                <Button
                  type="submit"
                  variant="outline"
                  disabled={isSubmitting}
                  className="mt-3"
                >
                  Add
                </Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddLinkForm;
