"use client";
import toast from "react-hot-toast";
import Link from "next/link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { startTransition, useState } from "react";
import { SignupSchema } from "@/schemas";
import { signup } from "../../../actions/auth";
import FormError from "./FormError";
import { useRouter } from "next/navigation";

type Signup = {
  name: string;
  email: string;
  password: string;
};

const Signup = () => {
  const [form, setForm] = useState<Signup>({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router=useRouter()

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const result = SignupSchema.safeParse(form);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    const values = result.data;
    startTransition(async () => {
      try {
        const res = await signup(values);
        if (res?.error) {
          setError(res.error);
          return;
        }
        toast.success("アカウントを登録しました。");
        router.push("/signup/success")
        router.refresh()
      } catch (err) {
        console.log(err);
        setError("アカウント登録に失敗しました。");
      }
    });
  };

  return (
    <div className="w-[90%] bg-slate-50 rounded-2xl  pb-10 mb-10 ml-10 mt-8 px-20">
      <div className="pt-10 pb-5 text-font font-bold text-lg text-center border-b-2 mx-14 ">
        アカウント登録
      </div>

      <form
        onSubmit={(e) => handleSignup(e)}
        className="flex flex-col px-14 mt-8"
      >
        <div className="flex flex-col gap-3">
          <label className="font-bold">お名前</label>
          <input
            type="text"
            name="name"
            className="border border-slate-400 rounded-lg p-2"
            value={form.name}
            placeholder="田中太郎"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          
        </div>

        <div className="flex flex-col gap-3 mt-5">
          <label className="font-bold">メールアドレス</label>
          <input
            type="text"
            name="email"
            className="border border-slate-400 rounded-lg p-2"
            value={form.email}
            placeholder="example@mail.com"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div className="flex flex-col mt-5">
          <label className="font-bold">パスワード</label>
          <input
            type="text"
            name="password"
            className="border border-slate-400 rounded-lg p-2"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        <div className="text-center mt-8">
          <FormError message={error} />
          <button
            type="submit"
            className="bg-sky-400 px-30 w-full py-2 cursor-pointer
          rounded-2xl text-md text-white font-bold hover:text-lg transition-all duration-300 hover:opacity-75"
          >
            新規登録
          </button>
        </div>
      </form>

      <div className="mt-5">
        <Link href={"/Login"} className="flex items-center justify-center ">
          <div className="font-bold border-b">
            既にアカウントを持ちの方はこちら
          </div>
          <NavigateNextIcon />
        </Link>
      </div>
    </div>
  );
};

export default Signup;
