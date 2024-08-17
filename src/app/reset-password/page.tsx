"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FormLabel } from "@/components/ui/form";

import { useForm } from "react-hook-form";
import FormWrapper from "@/components/FormWrapper";
import { ResetPasswordSchema } from "../../../schemas";
import { FormError } from "@/components/FormError";
import { FormSuccess } from "@/components/FormSuccess";
import { resetPassword } from "@/serveractions/resetpassword";

const ResetPasswordPage = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const getPasswordResetMail = (value: z.infer<typeof ResetPasswordSchema>) => {
    startTransition(() => {
      console.log(value);
      resetPassword(value.email)
        .then((data: any) => {
          if (data?.error) {
            setError(data?.error);
          }

          if (data?.success) {
            setSuccess(data?.success);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <FormWrapper
      headerTitle='Reset Password'
      buttonLabel='Back to Login'
      buttonLink='/login'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(getPasswordResetMail)}>
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
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type='submit' className='w-full mt-4' disabled={isPending}>
            {isPending ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
};

export default ResetPasswordPage;
