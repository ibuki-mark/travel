"use client";
import Image from "next/image";
import cafe from "../../../public/image/default-image.webp";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import type { User } from "@supabase/supabase-js";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { UpBlogType } from "@/types";
import { deleteBlog, questionBlog } from "@/actions/blog";
import toast from "react-hot-toast";

interface BlogDataProps {
  blog: UpBlogType & {
    profiles: {
      name: string | null;
    };
  };
  isMyBlog: boolean;
  user: User | null;
}

const Readsingle = (props: BlogDataProps) => {
  const { blog, isMyBlog, user } = props;
  const router = useRouter();
  const [error, setError] = useState("");
  const [question, setQuestion] = useState<string>("");

  const handleUpdatepage = () => {
    router.push(`/item/update/${blog.id}`);
  };

  const handleDelete = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (!window.confirm("本当に削除しますか？")) {
      return;
    }
    setError("");
    startTransition(async () => {
      try {
        const res = await deleteBlog({
          blogId: blog.id,
          imageUrl: blog.image_url,
          userId: blog.user_id,
        });

        if (res?.error) {
          setError(res.error);
          return;
        }
        toast.success("ブログを削除しました");
        setQuestion("");
        router.push("/");
       
      } catch (error) {
        console.error(error);
        setError("エラーが発生しました");
      }
    });
  };

  const handleChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setQuestion(e.target.value);
  };

  const handleQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (question === "") {
      return;
    }
    startTransition(async () => {
      try {
        const res = await questionBlog({
          question,
          blog,
        });
        if (res?.error) {
          setError(res.error);
          return;
        }
        console.log(res);
        toast.success("レスポンスが帰ってきました");
        router.push(`/item/readsingle/${blog.id}`);
       
      } catch (error) {
        console.error(error);
        setError("エラーが発生しました");
      }
    });
  };

  return (
    <div>
      <div className="w-full px-10 bg-slate-50 my-8 rounded-xl pb-8">
        <div className="flex flex-col">
          <div className="flex items-center justify-between pt-10">
            <div className="text-blue-700 text-xl bg-blue-100 px-3 py-1 rounded-lg">
              {blog.catogory}
            </div>
            <div>
              {blog?.updated_at ? (
                <div>
                  {new Date(blog?.updated_at).toLocaleString("jp-JP", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </div>
              ) : (
                <div>
                  {new Date(blog?.created_at).toLocaleString("jp-JP", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="py-5 border-b-4 border-dotted border-slate-400  mb-10">
            <div className="flex items-center justify-between mb-5">
              <h1 className="font-bold text-3xl ">{blog.title}</h1>
              <div className="text-xl">
                by:
                {blog.profiles.name}
              </div>
            </div>

            <div className="flex flex-col">
              <div>
                {isMyBlog && (
                  <div className="flex items-center justify-end gap-3 text-slate-500">
                    <div
                      className="hover:opacity-75 cursor-pointer "
                      onClick={handleUpdatepage}
                    >
                      <EditNoteIcon style={{ fontSize: "40px" }} />
                    </div>
                    <div
                      className="hover:opacity-75 cursor-pointer"
                      onClick={(e) => handleDelete(e)}
                    >
                      <DeleteIcon style={{ fontSize: "40px" }} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="h-90">
            <Image
              src={blog.image_url || cafe}
              width={600}
              height={120}
              alt="画像"
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          <div className="mt-15 leading-9">{blog.content}</div>

          <div className="mt-8 ">
            <div className="font-bold py-2">answer</div>
            <div className="bg-slate-200 w-full px-6 rounded-xl  duration-300 py-6 leading-8 ">
              <div className="font-mono">
                {blog.answer.map((option, index) => {
                  return (
                    <div key={index} className="my-4">
                      {option.answer}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isMyBlog && (
        <form
          className="z-2  mb-40 "
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleQuestion(e)}
        >
          <div className="bg-white rounded-3xl w-full flex items-center gap-2 px-2 ">
            <input
              type="text"
              className=" px-4 py-3 rounded-2xl w-4/5 outline-0"
              placeholder="今日の記事内容から深掘りしたいことを一緒に振り返ってみよう"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChangeEvent(e)
              }
              value={question || ""}
            />
            <button
              type="submit"
              className="cursor-pointer bg-black text-white px-2 py-2 rounded-3xl w-1/5 font-bold text-md hover:opacity-75 duration-200 "
            >
              送信
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Readsingle;
