import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import stateFolders from "@/state/stateFolders";
// import { useNavigate } from "react-router";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export type authForm = z.infer<typeof formSchema>;

export const useLogin = (submit: (data: authForm) => void) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // const { setFolders, setChildrens, pushPath } = stateFolders();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    submit(values);
    // const api = import.meta.env.VITE_API_LOCAL;

    // try {
    //   await fetch(api + "/auth/login", {
    //     method: "POST",
    //     credentials: "include",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(values),
    //   })
    //     .then((res) => res.json())
    //     .then((data: folder[]) => {
    //       const parent = data.find((folder) => folder.parent === null);

    //       if (!parent) return;

    //       setFolders(data);
    //       pushPath(parent);
    //       setChildrens(parent?.childrens);
    //       navigate("/workspace");
    //     });
    // } catch (error) {
    //   console.log(error);
    // }
  }

  return { form, onSubmit };
};
