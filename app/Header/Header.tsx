"use client";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "../utils/supabase/client";
import TitleLogo from "../../public/image/titlelogo.jpeg"
import Image from "next/image";
interface Props {
  user: User | null;
}

const Header = ({ user }: Props) => {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    if (!window.confirm("ログアウトしますが、宜しいですか？")) {
      return;
    }

    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className=" top-0 sticky z-2 ">
      <div className="w-full  py-7 max-[700px]:py-5 bg-linear-to-t from-slate-50 to-sky-100 xl:px-40 lg:px-25 md:px-30 sm:px-30 px-20 ">
        <div className="mx-auto flex justify-between items-center container ">
          <Link href={`/`}>
            <h1 className="text-4xl bg-transparent cursor-pointer hover:opacity-70 transition-all duration-500 ">
              <Image src={TitleLogo} width={80} height={80} alt="logo" />
            </h1>
          </Link>

          <div className="flex items-center gap-10">
        

            {user ? (
              <div className="flex items-center gap-5">
               <div className="cursor-pointer flex flex-col items-center" onClick={handleLogout}>
                <LogOut className="h-5 w-5 " />
                <div className="font-bold max-[1024px]:hidden">
                  ログアウト
                </div>
              </div>
              <div className="bg-black text-slate-200 p-2 
              transition-all duration-500 rounded-lg hover:scale-105">
                <Link href={"/item/create"}>投稿</Link>
              </div>
              </div>
              
            ) : (
              <ul className="flex justify-between items-center gap-10">
                <Link href={`/Login`}>
                  <li className="bg-black text-slate-200 p-2 cursor-pointer transition-all duration-500 rounded-lg hover:scale-105">
                    ログイン
                  </li>
                </Link>

                <Link href={`/signup`}>
                  <li className="bg-black text-slate-200 py-2 px-5 cursor-pointer  transition-all duration-500 rounded-lg hover:scale-105">
                    登録
                  </li>
                </Link>
              </ul>
            )}
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default Header;
