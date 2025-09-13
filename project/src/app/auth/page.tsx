'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { emailSchema, otpSchema, EmailSchema, OtpSchema } from '@/lib/types/auth-user';
import { useAuthApi } from '@/lib/hooks/use-auth-user';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


export default function AuthPage() {
  const {
    email,
    setEmail,
    step,
    setStep,
    processing,
    done,
    setDone,
    requestOtp,
  } = useAuthApi();
  const router = useRouter();

  const { data: session } = useSession();

  const emailForm = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  });

  const otpForm = useForm<OtpSchema>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  useEffect(() => {
    if (session && session.user) {
      if (session.user.name) {
        router.push('/');
      }
      else {
        router.push('/user');
      }
    }
  }, [session]);

  useEffect(() => {
    if (done && session && session.user) {
      if (session.user.name) {
        router.push('/');
      }
      else {
        router.push('/user');
      }
    }
  }, [done, session])
  const onEmailSubmit = async (values: EmailSchema) => {
    setEmail(values.email);
    await requestOtp(values.email);
  };

  const onOtpSubmit = async (values: OtpSchema) => {
    const result = await signIn('otp-signin', {
      redirect: false,
      email,
      otp: values.otp,
    });
    if (result?.error) {
      toast.error(result.error);
    } else if (result?.ok) {
      // Manually refetch session to get the latest user data
      const event = new Event('visibilitychange');
      document.dispatchEvent(event);
      toast.success('Signed in successfully.');
      setDone(true);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <Card className="w-full max-w-md p-8 shadow-lg">
        {step === 1 ? (
          <Form {...emailForm}>
            <form
              onSubmit={emailForm.handleSubmit(onEmailSubmit)}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-center mb-2">Sign In</h2>
              <Separator className="mb-4" />
              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={!emailForm.formState.isValid || processing} type="submit" className="w-full">
                Get OTP
              </Button>
            </form>
          </Form>
        ) : (
          <Form {...otpForm}>
            <form
              onSubmit={otpForm.handleSubmit(onOtpSubmit)}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-center mb-2">Verify OTP</h2>
              <Separator className="mb-4" />
              <p className="text-center text-gray-500">{email}</p>
              <FormField
                control={otpForm.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OTP</FormLabel>
                    <FormControl>
                      <Input placeholder="123456" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={processing} className="w-full">
                Verify OTP
              </Button>
            </form>
          </Form>
        )}
      </Card>
    </div>
  );
}
