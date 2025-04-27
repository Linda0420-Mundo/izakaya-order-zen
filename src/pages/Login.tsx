
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { LogIn } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/components/ui/use-toast';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log(data);
    // TODO: Implement login logic with Supabase
    toast({
      title: "Login Successful",
      description: "Welcome back!",
    });
    navigate('/menu');
  };

  return (
    <Layout>
      <div className="container max-w-md mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="mx-auto mb-6 w-28 h-28 rounded-full overflow-hidden border-4 border-izakaya-paper shadow-md">
            <img 
              src="https://source.unsplash.com/featured/?japanese,restaurant,logo" 
              alt="Restaurant logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-3xl font-serif font-medium">Welcome Back</h1>
          <p className="text-sm text-izakaya-darkgray mt-2">おかえりなさい</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      className="bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-izakaya-vermilion hover:bg-izakaya-vermilion/90 text-white"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center space-y-4">
          <p className="text-izakaya-darkgray text-sm">
            Don't have an account?{' '}
            <Button
              variant="link"
              className="text-izakaya-vermilion p-0"
              onClick={() => navigate('/signup')}
            >
              Create Account
            </Button>
          </p>
          <p className="text-xs text-izakaya-darkgray mt-6">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
