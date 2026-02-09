"use client";
import Image from "next/image";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useState } from "react";
import { BlogType } from "@/types";
import defaultImage from "../../public/image/default-image.webp";
import { useRouter } from "next/navigation";

interface BlogDataType {
  blogData: BlogType | null;
}

const Menupage = ({ blogData }: BlogDataType) => {
  const [bookcolor, setBookcolor] = useState<boolean>(false);
  const router = useRouter();
  const colorChange = () => {
    setBookcolor((prev) => !prev);
  };

  const handlePage = () => {
    router.push(`/item/readsingle/${blogData?.id}`);
  };

  return (
    <div className="mb-5 w-full cursor-pointer  shadow-sm  rounded-xl">
      <div onClick={handlePage}>
        <div className=" hover:opacity-75 h-35  ">
          <Image
            src={blogData?.image_url || defaultImage}
            width={600}
            height={100}
            alt="写真"
            style={{ width: "100%", height: "100%" }}
            className="rounded-t-md object-cover"
          ></Image>
        </div>

        <div className="mt-2 font-extrabold ml-4">{blogData?.title}</div>
      </div>

      <div className="ml-1 p-3">
        <div className="flex flex-col ">
          {blogData?.updated_at ? (
            <div className="text-sm mb-2 text-slate-500">
              {new Date(blogData.created_at).toLocaleString("jp-Jp", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </div>
          ) : (
            <div className="text-sm mb-2 text-slate-500">
              {blogData?.updated_at &&
                new Date(blogData.updated_at).toLocaleString("jp-Jp", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
            </div>
          )}

          <div className="flex justify-between">
            <div className="bg-gray-700 text-slate-200  rounded-md text-center px-5 py-1">
              {blogData?.catogory}
            </div>
            <div className="bg-gray-700 rounded-md hover:opacity-70 w-5 h-5 relative mt-2">
              <NavigateNextIcon className="text-slate-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 " />
            </div>
          
          </div>
        </div>

      </div>
    </div>
  );
};

export default Menupage;
