"use client";
import { ProfileType } from "@/types";
import FormError from "../components/auth/FormError";
import Image from "next/image";
import avatar from "../../public/image/profile.png";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProfilesTSchema } from "@/schemas";
import { startTransition } from "react";
import { updateProfile } from "@/actions/user";
import toast from "react-hot-toast";
import home from "../../public/image/travel-main.jpg";
interface ProfileTypes {
  profile: ProfileType;
}
interface FormType {
  name: string;
  introduce?: string | null;
}

const Profile = ({ profile }: ProfileTypes) => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [form, setForm] = useState<FormType>({
    name: profile.name || "",
    introduce: profile.introduce || "",
  });
  const [avatarImage, setAvatarImage] = useState<string | undefined>();
  const [homeImage, setHomeImage] = useState<string | undefined>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const result = ProfilesTSchema.safeParse(form);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    startTransition(async () => {
      try {
        const res = await updateProfile({
          ...form,
          profile,
          base64Image1: avatarImage,
          base64Image2: homeImage,
        });

        if (res?.error) {
          setError(res.error);
          return;
        }
        toast.success("プロフィールを編集しました");
        router.refresh();
      } catch (err) {
        console.error(error);
        setError("エラーが発生しました");
      }
    });
  };

  const onChangeAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setAvatarImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    e.target.value = "";
  };

  const onChangeHome = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setHomeImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    e.target.value = "";
  };

  return (
    <div className="bg-slate-50 lg:px-8 mt-8 rounded-2xl pt-8 w-full pb-20">
      <div className="text-center mt-8">
        <h1 className="font-bold text-xl">プロフィール</h1>
      </div>

      <form className="mt-8" onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-col justify-center items-center gap-5">
          <div>
            <Image
              src={avatarImage || profile.avatar_url || avatar}
              width={100}
              height={100}
              className="rounded-full"
              alt="avater"
              
            />
          </div>
          <div className="text-md ">
            
              <label className="cursor-pointer border border-slate-300 px-6 py-1 rounded-lg shadow ">
                <span>画像変更</span>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={onChangeAvatar}
                  className="max-[1024px]:hidden"
                />
              </label>
            
          </div>
        </div>

        <div className="flex flex-col justify-center gap-2 lg:px-14 max-[1024px]:px-8">
          <div className="font-bold text-lg ">名前</div>
          <div>
            <input
              type="text"
              className=" border border-slate-400 w-full rounded-md py-1 px-2"
              value={form.name}
              placeholder="田中太郎"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
        </div>

        <div className="flex flex-col justify-center gap-2  mt-5 lg:px-14 max-[1024px]:px-8">
          <div className="font-bold text-lg ">自己紹介</div>
          <div>
            <textarea
              className="w-full border border-slate-400 rounded-md py-1 px-2 h-50"
              rows={8}
              value={form.introduce || ""}
              onChange={(e) => setForm({ ...form, introduce: e.target.value })}
              placeholder="よろしくお願いします。"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center gap-10 px-14 mt-4 ">
          <div className="font-bold text-lg ">ホームページ画像</div>
          <div>
            <Image
              src={homeImage || profile.homescreen_url || home}
              width={500}
              height={200}
              className="rounded-md object-cover "
              style={{
                width:"100%"
              }}
              alt="home"
            ></Image>
          </div>

          <div className="text-center ">
            <label className="cursor-pointer border border-slate-300 px-4 py-1 rounded-lg shadow ">
              <span>画像変更</span>
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={onChangeHome}
                className="max-[1024px]:hidden"
              />
            </label>
          </div>
        </div>

        <div className="px-14 mt-8">
          <FormError message={error} />
        </div>
        <div className="text-center px-14 mt-6">
          <button
            type="submit"
            className="bg-black w-full rounded-lg py-2 text-white font-bold cursor-pointer hover:opacity-75 hover:text-lg duration-300 "
          >
            更新
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
