"use server";
import { SignupSchema } from "@/schemas";
import { z } from "zod";
import { createClient } from "@/app/utils/supabase/server";
import { LoginSchema } from "@/schemas";

export const signup = async (values: z.infer<typeof SignupSchema>) => {
  try {
    const supabase = await createClient();
   
    
    const { data, error: signupError } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });

    if (data && data.user) {
      if (data.user.identities && data.user.identities.length > 0) {
        console.log("アカウントを作成しました");
      } else {
        return {
          error:
            "このメールアドレスは既に登録されています。他のメールアドレスを使用して、アカウントを作成してください",
        };
      }
    } else {
      return { error: signupError?.message };
    }

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ name: values.name })
      .eq("id", data.user.id);

    if (updateError) {
      return { error: updateError.message };
    }
  } catch (err) {
    console.error(err);
    return { error: "エラーが発生しました" };
  }
};


export const login = async (values: z.infer<typeof LoginSchema>) => {
  try {
    const supabase = await createClient()

    
    const { error } = await supabase.auth.signInWithPassword({
      ...values,
    })

    if (error) {
      return { error: error.message }
    }
  } catch (err) {
    console.error(err)
    return { error: "エラーが発生しました" }
  }
}
