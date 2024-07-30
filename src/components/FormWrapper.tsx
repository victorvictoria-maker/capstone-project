import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

interface FormProps {
  children: React.ReactNode;
  headerTitle: string;
  buttonLabel: string;
  buttonLink: string;
}

const FormWrapper = ({
  children,
  headerTitle,
  buttonLabel,
  buttonLink,
}: FormProps) => {
  return (
    <Card className='max-w-[450px] shadow-lg'>
      <CardHeader className='w-full flex flex-col gap-y-4 items-center justify-center'>
        <CardTitle className={cn("text-3xl font-semibold", font.className)}>
          Care Finder
        </CardTitle>
        <CardDescription className='text-muted-foreground text-sm'>
          {headerTitle}
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <Button variant='link' className='font-normal w-full' size='sm' asChild>
          <Link href={buttonLink}>{buttonLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FormWrapper;
