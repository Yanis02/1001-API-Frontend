"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { login } from "@services/authentication.service";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { loginRequest } from "@typings/auth/authForms";
import { loginFormSchema } from "@typings/auth/authForms";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { GiCancel } from "react-icons/gi";
import { useRouter } from "next/navigation";
import { categoryRequest, createCategorySchema } from "@typings/api/createCategoryType";
import { createCategory } from "@services/api/categories";
const formSchema = loginFormSchema;

export default function CreateCategoryForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<categoryRequest>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  async function onSubmit(values: categoryRequest) {
    setIsLoading(true);
const result = await  createCategory (values);
alert("yanbis");
    if (result.status !== "success") {
      toast.error(result.status, {
        description: result.message,
        position: "top-right",
        dismissible: true,
        duration: 5000,
        cancel: {
          label: (
            <Button variant={"destructive"} size={"sm"}>
              OK
            </Button>
          ),
          onClick: () => {
            toast.dismiss();
          },
        },
        icon: <GiCancel className="text-lg text-red-500" />,
      });
    } else {
      router.push(`/${result.message}`);
      form.reset();
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-white px-8 py-12 rounded-lg shadow-md w-full md:w-1/2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du categorie : </FormLabel>
              <FormControl>
                <Input placeholder="nom du categorie" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>description</FormLabel>
              <FormControl>
                <Input placeholder="description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit">
          {isLoading ? "Chargement..." : "ajouter"}
        </Button>{" "}
      </form>
    </Form>
  );
}
