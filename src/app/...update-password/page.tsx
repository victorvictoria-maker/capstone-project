// "use client";

// // import * as z from "zod";
// // import { useEffect, useState, useTransition } from "react";
// // import { Input } from "@/components/ui/input";
// // import { Button } from "@/components/ui/button";
// // import FormWrapper from "@/components/FormWrapper";
// // import {
// //   Form,
// //   FormControl,
// //   FormField,
// //   FormItem,
// //   FormLabel,
// //   FormMessage,
// // } from "@/components/ui/form";
// // import { useForm } from "react-hook-form";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { UpdatePasswordSchema } from "../../../schemas";
// // import { FormError } from "@/components/FormError";
// // import { FormSuccess } from "@/components/FormSuccess";
// // import { updatePassword } from "../../../serveractions/updatepassword";
// // import { useRouter, useSearchParams } from "next/navigation";
// // import { createClient } from "@/utils/supabase/client";

// const UpdatePasswordPage = () => {
//   // const router = useRouter();
//   // const searchParams = useSearchParams();
//   // const supabase = createClient();

//   // useEffect(() => {
//   //   async function setSessionFromUrl() {
//   //     const code = searchParams.get("code");
//   //     const email = searchParams.get("email");

//   //     if (code && email) {
//   //       const { error } = await supabase.auth.updateUser({
//   //         password: new_password,
//   //       });

//   // await supabase.auth.verifyOtp({
//   //   email: email,
//   //   type: "recovery",
//   //   token: code,
//   // });

//   //       if (error) {
//   //         console.error("Error verifying OTP from URL:", error);
//   //         router.push("/login");
//   //       }
//   //     } else {
//   //       console.error("Code parameter missing in URL");
//   //       router.push("/login");
//   //     }
//   //   }

//   //   setSessionFromUrl();
//   // }, [router, searchParams, supabase]);

//   // const form = useForm<z.infer<typeof UpdatePasswordSchema>>({
//   //   resolver: zodResolver(UpdatePasswordSchema),
//   //   defaultValues: {
//   //     password: "",
//   //     confirmPassword: "",
//   //   },
//   // });

//   // const [error, setError] = useState("");
//   // const [success, setSuccess] = useState("");
//   // const [isPending, startTransition] = useTransition();

//   // const changePassword = (values: z.infer<typeof UpdatePasswordSchema>) => {
//   //   startTransition(() => {
//   //     // console.log(values);
//   //     updatePassword(values)
//   //       .then((data) => {
//   //         console.log(data);
//   //         if (data?.error) {
//   //           setError(data?.error);
//   //         }

//   //         if (data?.success) {
//   //           setSuccess(data?.success);
//   //           router.push("/login");
//   //         }
//   //       })
//   //       .catch(() => setError("Something went wrong!"));
//   //   });
//   // };

//   return (
//     <div>hi</div>

//     // <FormWrapper
//     //   headerTitle='Change Password'
//     //   buttonLabel='Back to Login'
//     //   buttonLink='/login'
//     // >
//     //   <Form {...form}>
//     //     <form onSubmit={form.handleSubmit(changePassword)}>
//     //       <FormField
//     //         control={form.control}
//     //         name='password'
//     //         render={({ field }) => (
//     //           <FormItem>
//     //             <FormLabel>Password</FormLabel>
//     //             <FormControl>
//     //               <Input
//     //                 {...field}
//     //                 disabled={isPending}
//     //                 placeholder='******'
//     //                 type='password'
//     //               />
//     //             </FormControl>
//     //             <FormMessage />
//     //           </FormItem>
//     //         )}
//     //       />
//     //       <FormField
//     //         control={form.control}
//     //         name='confirmPassword'
//     //         render={({ field }) => (
//     //           <FormItem>
//     //             <FormLabel>Confirm Password</FormLabel>
//     //             <FormControl>
//     //               <Input
//     //                 {...field}
//     //                 disabled={isPending}
//     //                 placeholder='******'
//     //                 type='password'
//     //               />
//     //             </FormControl>
//     //             <FormMessage />
//     //           </FormItem>
//     //         )}
//     //       />
//     //       <FormError message={error} />
//     //       <FormSuccess message={success} />
//     //       <Button type='submit' className='w-full mt-4' disabled={isPending}>
//     //         {isPending ? "Updating..." : "Update Password"}
//     //       </Button>
//     //     </form>
//     //     {success && <p className='text-green-600'>{success}</p>}
//     //     {error && <p className='text-red-600'>{error}</p>}
//     //   </Form>
//     // </FormWrapper>
//   );
// };

// export default UpdatePasswordPage;
