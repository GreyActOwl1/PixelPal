import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUpValidationSchema } from "@/lib/validation";
import { Link } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { createUserAccount } from "@/lib/appwrite/api";

const SignUpForms = () => {
  const isSubmitting = false;

  // 1. Define your form.
  const form = useForm<z.infer<typeof signUpValidationSchema>>({
    resolver: zodResolver(signUpValidationSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signUpValidationSchema>) {
    const newUser = await createUserAccount(values);
    console.log(newUser);
    console.log(values);
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="PixelPal Logo" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account
        </h2>
        <p className="text-small-regular text-gray-500 text-center mt-2">
          Already have an account?
          <Link to="/login" className="text-primary-500 ml-1">
            Log in
          </Link>
        </p>
        {/* <p className="text-light-3 small-medium md:base-regular">To use Pixel Pal, please enter your details</p> */}
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" md:w-full flex-center flex-col space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="sm:w-420 md:w-1/2">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  className="shad-input"
                  placeholder="John Doe"
                  autoComplete="name"
                  {...field}
                />
              </FormControl>
              <FormDescription>This is your full name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="sm:w-420 md:w-1/2">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  className="shad-input"
                  placeholder="jdoe123"
                  autoComplete="username"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="sm:w-420 md:w-1/2">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  className="shad-input"
                  placeholder="jdoe@gmail.com"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormDescription>This is your email address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="sm:w-420 md:w-1/2">
              <FormLabel>
                Password
                <FaInfoCircle
                  className="text-gray-500 ml-1 inline-flex"
                  data-tooltip-id="pwd-tootip"
                  data-tooltip-place="top"
                />
              </FormLabel>
              <Tooltip
                id="pwd-tootip"
                // events={["click", "hover"]}
                openEvents={{ click: true, focus: true, mouseenter: true }}
                closeEvents={{ mouseleave: false, blur: true }}
                clickable={true}
              >
                <div>
                  <h2 className="text-lg">Password Requirements</h2>
                  <p>Your password must meet the following requirements:</p>
                  <ul className="">
                    <li>At least 8 characters long</li>
                    <li>At least one number</li>
                    <li>At least one special character</li>
                  </ul>
                  <br />
                  <p>
                    You can learn more about creating strong passwords
                    <Link
                      to="https://www.cisa.gov/secure-our-world/use-strong-passwords"
                      className="text-blue-500 ml-1"
                    >
                      here
                    </Link>
                  </p>
                </div>
              </Tooltip>
              <FormControl>
                <Input
                  className="shad-input"
                  type="password"
                  placeholder="***************"
                  autoComplete="new-password"
                  {...field}
                />
              </FormControl>
              <FormDescription>This is your password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="shad-button_primary">
          {isSubmitting ? (
            <div className="flex-center gap-2">
              <LoadingSpinner />
              Creating Account...
            </div>
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForms;
