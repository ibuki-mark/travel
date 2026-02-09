"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { login } from "@/actions/auth";
import { LoginSchema } from "@/schemas";
import toast from "react-hot-toast";
import FormError from "./FormError";
type Login = {
  name: string;
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [form, setForm] = useState<Login>({
    name: "",
    email: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const result = LoginSchema.safeParse(form);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    const values = result.data;

    startTransition(async () => {
      try {
        const res = await login(values);
        if (res?.error) {
          setError(res.error);
          return;
        }
        toast.success("ログイン成功しました。");
        router.push("/");
        router.refresh();
      } catch (err) {
        console.error(error);
        setError("エラーが発生しました");
      }
    });
  };

  return (
    <div className="w-[90%] bg-slate-50 rounded-2xl px-40 pb-5 mb-10 ml-10">
      <h1 className="mt-8 text-2xl font-bold text-center py-6">ログイン</h1>

      <form
        onSubmit={(e) => handleLogin(e)}
        className="flex flex-col items-center justify-center"
      >
        <div className="flex flex-col w-full">
          <div className="mb-2 font-bold text-lg">お名前</div>
          <input
            type="text"
            name="email"
            className="w-full rounded-lg p-2 border border-slate-400 "
            value={form.name}
            placeholder="田中太郎"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div className="flex flex-col w-full my-3">
          <div className="mb-2 font-bold text-lg">メールアドレス</div>
          <input
            type="text"
            name="email"
            className="w-full rounded-lg p-2 border border-slate-400 "
            value={form.email}
            placeholder="example@mail.com"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div className="flex flex-col w-full my-2">
          <div className="mb-2 font-bold text-lg">パスワード</div>
          <input
            type="text"
            name="password"
            className="w-full rounded-lg p-2 border border-slate-400 "
            value={form.password}
            placeholder="パスワード"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        <div className="mt-6 ">
         < FormError message={error}/>
          <button
            type="submit"
            className="cursor-pointer bg-sky-400 px-30 w-full py-2 
          rounded-2xl text-lg text-white font-bold hover:text-2xl transition-all duration-300 hover:opacity-75"
          >
            ログイン
          </button>
        </div>
      </form>
      <div className="text-center mb-4">
        <div className="my-4">
          <Link href={"/"} className="border-b">
            パスワードを忘れた方はこちら
          </Link>
        </div>
        <div>
          <Link href={"/signup"} className="border-b">
            アカウントを作成する
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
