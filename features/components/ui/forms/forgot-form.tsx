import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Mail } from 'lucide-react';
import { CustomInput } from '../custom-input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { LoginFormProps } from '@/app/(auth)/login/page';

const ForgotForm = ({ setActiveTab }: LoginFormProps) => {
  const form = useForm({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    setActiveTab('otp');
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[13px] text-(--text-label-color)">
                  Email
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="stroke-primary/50 w-4.5 h-4.5 absolute top-1/2 -translate-y-1/2 left-4" />
                    <CustomInput
                      placeholder="Enter your email"
                      className="h-10.5 rounded-[100px] border border-primary/50 pl-10 text-[14px] focus:border-primary! focus:border-2"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full h-12 rounded-[100px] hover:bg-(--text-primary-hover) transition duration-200 mt-8"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default ForgotForm;
