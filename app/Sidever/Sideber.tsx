"use client"
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { ProfileType } from "@/types";
import Image from "next/image";
import avatar from "../../public/image/profile.png";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
interface Props {
  user: User | null;
  profile: ProfileType | null;
}

const Sideber = (props: Props) => {
  const { user, profile } = props;
  return (
    <div className=" w-full  bg-gray-100 mt-8 rounded-2xl h-[65vh] sticky top-30  ">
      <div className="px-5 lg:w-[95%] ">
        <div
          className="flex items-center  gap-6  py-8 border-b cursor-pointer 
       border-slate-300  "
        >
          <div>
            {user ? (
              <div>
                <Image
                  src={profile?.avatar_url || avatar}
                  className="rounded-full"
                  width={50}
                  height={60}
                  alt="avatar"
                />
              </div>
            ) : (
              <div>
                <Image
                  src={avatar}
                  className="rounded-full"
                  width={50}
                  height={60}
                  alt="avatar"
                />
              </div>
            )}
          </div>
          <div>
            {user ? (
              <div className="flex flex-col gap-2">
                <div className="text-2xl font-bold">{profile?.name}</div>
               
              </div>
            ) : (
              <div>
                <div className="text-2xl font-bold">UserName</div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 pb-4">
          <Link
            href={`/`}
            className="flex items-center gap-4 py-3 rounded-xl cursor-pointer transition-all hover:bg-white  duration-300"
          >
            <HomeIcon className="text-blue-300" style={{ fontSize: "35px" }} />
            <div className="font-bold text-md">ホーム</div>
          </Link>

          <Link
            href={`/Sidever/Sidepage/Servicepage`}
            className="flex items-center gap-4 py-3 rounded-xl cursor-pointer transition-all hover:bg-white duration-300"
          >
            <div>
              <ViewCompactIcon
                className="text-blue-300"
                style={{ fontSize: "35px" }}
              />
            </div>
            <div className="font-bold text-md">サービスについて</div>
          </Link>

          <Link
            href={`/Sidever/Sidepage/Contact`}
            className="flex items-center gap-4 py-3 rounded-xl cursor-pointer transition-all hover:bg-white duration-300"
          >
            <div>
              <MailIcon
                className="text-blue-300"
                style={{ fontSize: "35px" }}
              />
            </div>
            <div className="font-bold text-md">お問い合わせ</div>
          </Link>
          {user ? (
            <div>
              <Link
                href={`/settings/profile`}
                className="flex items-center gap-4  py-4  rounded-xl cursor-pointer transition-all hover:bg-white duration-300"
              >
                <div>
                  <AccountBoxIcon
                    className="text-blue-300"
                    style={{ fontSize: "35px" }}
                  />
                </div>
                <div className="font-bold text-md ">プロフィール</div>
              </Link>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sideber;
