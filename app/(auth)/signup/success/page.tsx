import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="h-[90vh] mx-auto w-[95%] mt-8 ">
      <div className=" text-center bg-slate-50 pb-10 rounded-2xl">
        <div className="mb-10 pt-10 font-bold text-xl">アカウント登録ができました。</div>
        <Link href={"/"} className="bg-sky-400 text-white px-14 py-2 rounded-2xl font-bold">トップページ</Link>
      </div>
    </div>
  );
};

export default page;
