import {
  FieldValues,
  FormProvider,
  useForm,
  SubmitHandler,
} from "react-hook-form";

// 👇 Add 'extends FieldValues'
type FormProps<T extends FieldValues> = {
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
};

const Form = <T extends FieldValues>({ onSubmit, children }: FormProps<T>) => {
  const methods = useForm<T>();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default Form;
