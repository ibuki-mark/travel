"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BlogUpSchema } from "@/schemas";
import { startTransition } from "react";
import { newBlog } from "@/actions/blog";
import toast from "react-hot-toast";
import FormError from "../auth/FormError";
import defaultImage from "../../../public/image/default-image.webp";
import { useTransition } from "react";

interface BlogNewProps {
  userId: string;
}

interface AnswerItem {
  question: string;
  answer: string;
}

interface FormType {
  title: string;
  content: string;
  catogory: string;
  bookmark: boolean;
  question: string;
  answer: AnswerItem[];
}

const Create = ({ userId }: BlogNewProps) => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [mainImage, setMainImage] = useState<string | undefined>();
  const [form, setForm] = useState<FormType>({
    title: "",
    content: "",
    catogory: "",
    bookmark: false,
    question: "",
    answer: [],
  });
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const result = BlogUpSchema.safeParse(form);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    startTransition(async () => {
      try {
        const res = await newBlog({
          ...form,
          base64Image: mainImage,
          userId,
        });
        if (res?.error) {
          setError(res.error);
          return;
        }
        toast.success("ブログを投稿しました");
        router.push("/");
        
      } catch (err) {
        console.log(error);
        setError("エラーが発生しました");
      }
    });
  };

  const onChangeHome = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setMainImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    e.target.value = "";
  };

  return (
    <div>
      <div className="w-full lg:px-10 max-[1024px]:px-4 bg-slate-50 my-8 rounded-2xl pb-8 ">
        <div className="flex flex-col py-5">
          <div className="py-7  mb-3 text-center">
            <h1 className="font-bold text-2xl ">ブログ投稿</h1>
          </div>

          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="flex flex-col gap-6 justify-center px-8">
              <div className="font-bold">ページ画像</div>
              <div className="text-center mx-auto">
                <Image
                  src={mainImage || defaultImage}
                  width={600}
                  height={100}
                  alt="画像"
                  style={{ width: "100%" }}
                />
              </div>

              <div className="text-sm text-center ">
                <label className="cursor-pointer border border-slate-300 sm:px-18 px-10 py-1 rounded-lg shadow w-full">
                  <span>画像選択</span>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    className="max-[1024px]:hidden"
                    onChange={onChangeHome}
                  />
                </label>
              </div>
            </div>

            <div className="mt-4 px-8 flex flex-col gap-2">
              <div className="font-bold text-lg">タイトル</div>

              <div className="">
                <input
                  type="text"
                  className="border border-slate-400 w-full rounded-md py-1 px-2"
                  placeholder="タイトル"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
            </div>

            <div className="mt-4 px-8 flex flex-col gap-2">
              <div className="font-bold text-lg">カテゴリー</div>

              <div className="">
                <input
                  type="text"
                  className="border border-slate-400 w-full rounded-md py-1 px-2"
                  placeholder="自由にカテゴリー名を入力してください"
                  value={form.catogory}
                  onChange={(e) =>
                    setForm({ ...form, catogory: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex flex-col justify-center gap-2 px-8 mt-5">
              <div className="font-bold text-lg ">内容</div>
              <div>
                <textarea
                  className="w-full border border-slate-400 rounded-md py-1 px-2 h-50"
                  rows={8}
                  value={form.content || ""}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="px-14 mt-8">
              <FormError message={error} />
            </div>

            <div className="text-center px-14 mt-6">
              <button
                type="submit"
                className="bg-black w-full rounded-lg py-2 text-white font-bold 
               cursor-pointer hover:opacity-75 hover:text-lg duration-300 "
              >
                <div className="flex justify-center items-center gap-4">
                   <div className="text-xl">{isPending ? "投稿中...." : "投稿"}</div>
                   {isPending&&<div className="w-8 h-8 text-white border-b-3 border-white  rounded-2xl animate-spin"></div>}
                </div>
                
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
