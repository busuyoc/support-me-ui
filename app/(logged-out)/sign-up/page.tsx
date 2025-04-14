'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PersonStanding } from 'lucide-react';
import * as z from 'zod'; // import Zod for form validation
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

const formSchema = z.object({
  email: z.string().email(), // type string and validate it as an email
  accountType: z.enum(['personal', 'company']),
  companyName: z.string().optional(),
  numberOfEmployees: z.coerce.number().optional(), // coerce -> all of our inputs are strings by default
  dob: z.date().refine((date) => {
    const today = new Date()
    const eighteenYearsOld = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    )
    return date <= eighteenYearsOld;
  }, "You must be at least 18 years old") // if fn returns false, the err msg will be displayed
}).superRefine((data, context) => { // data is form values, context is used to add error msgs to specific fields
  if (data.accountType === "company" && !data.companyName) { // superRefine is for the entire form
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["companyName"],
      message: "Company name is required",
    })
  }
   if (data.accountType === "company" && (!data.numberOfEmployees || data.numberOfEmployees < 1)) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["numberOfEmployees"],
      message: "Number of employees is required",
    })
  }
});
 


export default function SignUpPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    // zod infers our form schema type
    resolver: zodResolver(formSchema), // use the zod resolver
    defaultValues: {
      email: '',
    },
  });

  const handleSubmit = () => {
    console.log('login validation passed');
  };

  const accountType = form.watch('accountType');

  return (
    <>
      <PersonStanding size={50} />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Sign up for a new SupportMe account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-4"
            >
              {/* submit function runs only if the validation passes for our login form*/}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="accountType"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Account type</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an account type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="personal">Personal</SelectItem>
                          <SelectItem value="company">Company</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              {accountType === 'company' && (
                <>
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Company name</FormLabel>
                          <FormControl>
                            <Input placeholder="Company name" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="numberOfEmployees"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Employees</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={0}
                              placeholder="Employees"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </>
              )}
              <Button type="submit">Sign Up</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="justify-between">
          <small>Already have an account?</small>
          <Button asChild variant="outline" size="sm">
            <Link href="/login">Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
