import { z } from "zod";

export const SignupSchema = z.object({
  name: z.string().min(1, {
    message: "お名前を入力してください",
  }),
  email: z.email({
    message: "メールアドレスを入力してください",
  }),
  password: z.string().min(8, {
    message: "英数字8文字以上で入力してください",
  }),
});
export type ContactType = z.infer<typeof SignupSchema>;

export const LoginSchema = z.object({
  name: z.string().min(1, {
    message: "お名前を入力してください",
  }),
  email: z.email({
    message: "メールアドレスを入力してください",
  }),
  password: z.string().min(8, {
    message: "英数字8文字以上で入力してください",
  }),
});
export type LoginType = z.infer<typeof LoginSchema>;

export const ProfilesTSchema = z.object({
  name: z.string().min(1, {
    message: "お名前を入力してください",
  }),
  introduce: z.string().nullable().optional(),
});
export type ProfilesType = z.infer<typeof ProfilesTSchema>;

export const BlogUpSchema = z.object({
  title: z.string().min(1, {
    message: "タイトルを入れてください",
  }),
  catogory: z.string().min(1, {
    message: "記事のカテゴリーを入れてください",
  }),
  content: z.string().min(1, {
    message: "記事のカテゴリーを入れてください",
  }),
  answer: z.array(
    z.object({
      question: z.string().optional(),
      answer: z.string(),
    })
  )
});
export type BlogUpType = z.infer<typeof BlogUpSchema>;


export const UpdateShema=z.object({
   title:z.string().min(1,{
    message:"タイトルを入れてください"
   }),
   catogory:z.string().min(1,{
    message:"カテゴリーを入れてください"
   }),
   content:z.string().min(1,{
    message:"記事の投稿内容を書いてください"
   }),
})
export type UpdateType=z.infer<typeof UpdateShema>