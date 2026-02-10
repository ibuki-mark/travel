"use client";
import Image from "next/image";
import React, { startTransition, useState, useTransition } from "react";
import defaultImage from "../../../public/image/default-image.webp";
import { useRouter } from "next/navigation";
import { UpdateShema } from "@/schemas";
import toast from "react-hot-toast";
import { updateBlog } from "@/actions/blog";
import { UpBlogType } from "@/types";
import FormError from "../auth/FormError";


interface UpdateBlogType {
  blogData: UpBlogType;
}

interface FormType {
  title: string;
  catogory: string;
  content: string;
}

const Updatepage = ({ blogData }: UpdateBlogType) => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [form, setForm] = useState<FormType>({
    title: blogData.title || "",
    catogory: blogData.catogory || "",
    content: blogData.content || "",
  });
  const [updateimageUrl, setUpdateimageUrl] = useState<string>();
  const [isPending,startTransition]=useTransition()

  const handleSubmit=async(e: React.FormEvent<HTMLFormElement>)=>{
   e.preventDefault()
   setError("")
   let base64Image:string|undefined
   const result=UpdateShema.safeParse(form)
   if(!result.success){
    setError(result.error.issues[0].message)
    return
   }
   startTransition(async()=>{
    
    try{
      if(updateimageUrl&&updateimageUrl.startsWith("data:image")){
        const image=updateimageUrl
       if(image){
        base64Image=image
       }
      }
      const res=await updateBlog({
        ...form,
        blogData,
       
        base64Image,
      
      })

      if(res?.error){
        setError(res.error)
        return
      }
     toast.success("ブログ編集できました！")
     router.push(`/item/readsingle/${blogData.id}`)
    

    }catch(error){
       console.error(error);
        setError("エラーが発生しました");
    }
   })
  
  }


  const onChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setUpdateimageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    e.target.value = "";
  };

  return (
    <div>
      <div className="w-full px-10 max-[400px]:px-2 bg-slate-50 my-8 rounded-2xl pb-8 ">
        <div className="flex flex-col py-5">
          <div className="py-7  mb-3 text-center">
            <h1 className="font-bold text-2xl ">ブログ編集</h1>
          </div>

          <form onSubmit={(e)=>handleSubmit(e)}>
            <div className="flex flex-col gap-6 justify-center px-8">
              <div className="font-bold">ページ画像</div>
              <div className="text-center mx-auto">
                <Image
                  src={updateimageUrl||blogData.image_url||defaultImage}
                  width={600}
                  height={100}
                  alt="画像"
                  style={{ width: "100%" }}
                />
              </div>

              <div className="text-sm text-center ">
                <label className="cursor-pointer border border-slate-300 px-18 py-1 rounded-lg shadow w-full">
                  <span>画像選択</span>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    className="max-[1024px]:hidden"
                    onChange={onChangeImage}
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
                  placeholder="カテゴリー"
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
               cursor-pointer hover:opacity-75 hover:text-lg duration-300 flex items-center justify-center gap-5"
              >
                 <div className="text-xl">{isPending ? "投稿中...." : "投稿"}</div>
                   {isPending&&<div className="w-8 h-8 text-white border-b-3 border-white  rounded-2xl animate-spin"></div>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Updatepage;
