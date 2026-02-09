"use client";
import Menu from "../Menu/Menu";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useState } from "react";
import { useEffect } from "react";
import type { User } from "@supabase/supabase-js";
import { ProfileType } from "@/types";
import { BlogType } from "@/types";
import { useSearchParams } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";

interface Props {
  user: User | null;
  profile: ProfileType | null;
  blogsData: BlogType[] | null;
  initialQ: string;
}

const Homepage = (props: Props) => {
  const { user, profile, blogsData, initialQ } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [direction, setDirection] = useState<string>("新しい順");
  const [nodirecion, setNodirection] = useState<string>("古い順");
  const [currentDate, setCurrentDate] = useState<string>("");
  const sp=useSearchParams()
  const router=useRouter()
  const [q,setQ]=useState(initialQ)
  
  const UpdateDate = () => {
    const nowDate = new Date();
    const formattedDate = nowDate.toLocaleDateString("jp-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    setCurrentDate(formattedDate);
  };

  


  useEffect(() => {
    UpdateDate();
    const interval = setInterval(UpdateDate, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    if (!open) {
      setOpen(true);
      requestAnimationFrame(() => {
        setVisible(true);
      });
    } else {
      setVisible(false);
      setTimeout(() => {
        setOpen(false);
      }, 200);
    }
  };

  const changeName = () => {
    if (direction === "新しい順") {
      setDirection("古い順");
      setNodirection("新しい順");
    } else {
      setDirection("新しい順");
      setNodirection("古い順");
    }
  };


  const handleSubmit=async(e: React.FormEvent<HTMLFormElement>)=>{
   e.preventDefault()
   const params=new URLSearchParams(sp.toString())

   const value=q.trim()
   if(value){
     params.set("q",value)
   }else{
    params.delete("q")
   }
    router.push(`/?${params.toString()}`)
    setQ("")
  }

  return (
    <div className=" my-8 ">
      <div className="">
        <div className=" mb-3">
          {user ? (
            <div
              className="w-full h-100 bg-cover bg-center rounded-xl relative"
              style={{
                backgroundImage: `url(${profile?.homescreen_url ? profile.homescreen_url : "/image/travel-main.jpg"})`,
              }}
            >
              <div className="text-slate-100 text-xl font-bold absolute bottom-10 right-10">
                {currentDate}
              </div>
            </div>
          ) : (
            <div
              className="w-full h-100 bg-cover bg-center rounded-xl relative"
              style={{
                backgroundImage: "url(/image/travel-main.jpg)",
              }}
            >
              <div className="text-slate-100 text-xl font-bold absolute bottom-10 right-10">
                {currentDate}
              </div>
            </div>
          )}
        </div>

        <div className=" bg-white rounded-xl">
          <div className=" flex items-center justify-between px-5 py-6">
            <div className="flex flex-col ">
              <h1 className="text-2xl font-bold">Blog</h1>
              <div className="text-sm mt-2 font-bold text-slate-500">
                ブログ
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 max-[450px]:hidden">
               <SearchIcon/>
                <form  onSubmit={(e: React.FormEvent<HTMLFormElement>)=>handleSubmit(e)}  className="flex gap-3">
                  <input type="text" className="border rounded-lg outline-none px-2  xl:w-80 xl:py-2 md:py-2 sm:py-2  max-[700px]:py-2"
                   placeholder="タイトル検索" onChange={(e)=>setQ(e.target.value)}/>
                  <button type="submit" className="cursor-pointer bg-black text-slate-200 sm:px-2 xl:px-4 rounded-lg xl:font-bold max-[1024px]:px-4">検索</button>
                </form>
              </div>
              
            </div>

            <div
              className={` flex items-center cursor-pointer max-[700px]:hidden`}
              onClick={handleClick}
            >
              <div className="flex flex-col items-center">
                <div className="font-bold ">{direction}</div>

                <div
                  className={`${open ? "" : "hidden"} ${visible ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none -translate-y-2"} font-bold border-l 
                p-1 border-slate-300 transition-all duration-200 `}
                  onClick={changeName}
                >
                  {nodirecion}
                </div>
              </div>

              <NavigateNextIcon />
            </div>
          </div>

          <div>
            <Menu blogsData={blogsData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
