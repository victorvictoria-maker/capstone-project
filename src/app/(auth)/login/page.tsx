"use client";

import FormWrapper from "@/components/FormWrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { LoginSchema } from "../../../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Suspense, useEffect, useState, useTransition } from "react";
import { FormError } from "@/components/FormError";
import { FormSuccess } from "@/components/FormSuccess";
import { useRouter, useSearchParams } from "next/navigation";
import SocialMedia from "@/components/SocialMedia";
import Image from "next/image";
import { login } from "@/serveractions/login";
import { toast } from "react-toastify";

const LoginPageContent = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const alertUserAboutAdmin = () => {
    toast.info(
      "To log in as an admin, check the about project page to get admin access info."
    );
  };

  useEffect(() => {
    alertUserAboutAdmin();
  }, []);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitForm = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            setError(data?.error);
          }

          if (data?.success) {
            setSuccess(data?.success);
            // console.log(data);
            if (data.userRole === "ADMIN") {
              router.push("/admin");
            } else {
              router.push("/hospitals");
            }
          }
        })
        .catch(() => setError("Something went wrong while loggin in!"));
    });
  };

  return (
    <div className='relative min-h-screen flex items-center justify-center bg-gray-900'>
      <div className='absolute inset-0 overflow-hidden'>
        <Image
          src='/images/image.png'
          alt='Background Image'
          layout='fill'
          objectFit='cover'
          className='opacity-70'
        />
        <div className='absolute inset-0 bg-black opacity-50' />{" "}
      </div>

      <div className='relative z-10 p-6 bg-white rounded-lg shadow-lg max-w-md w-full mx-2'>
        <FormWrapper
          headerTitle='Login to account'
          buttonLabel='Dont have an account?'
          buttonLink='/register'
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitForm)}
              className='space-y-6'
            >
              <div className='space-y-4'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder='victorvictor0001@gmail.com'
                          type='email'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder='******'
                          type='password'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* <Link href='/reset-password' className='text-[#456DFF] text-sm'>
                Forgot password?
              </Link> */}
              <FormError message={error} />
              <FormSuccess message={success} />

              <Button type='submit' className='w-full ' disabled={isPending}>
                Login
              </Button>
            </form>
          </Form>
          <SocialMedia />
        </FormWrapper>
      </div>
    </div>
  );
};

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPageContent />
    </Suspense>
  );
};

export default LoginPage;
