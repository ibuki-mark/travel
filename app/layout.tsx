import type { Metadata } from "next";

import "./globals.css";
import Header from "./Header/Header";
import Sideber from "./Sidever/Sideber";
import Footer from "./Footer/Footer";
import {createClient} from "@/app/utils/supabase/server"
import ToastProvider from "./components/ToastProvider"
import { ProfileType } from "@/types";


export const metadata: Metadata = {
  title: "Osop",
  description: "One Step Output",
  icons:[{rel:'icon',url:"/image/logo.png"}],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient()
  const {data}=await supabase.auth.getUser()
  const user = data?.user
   
  let profile: ProfileType | null = null;
  
    if (user) {
      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
  
      if (error) {
        console.error("プロフィールの取得中にエラーが発生しました:", error);
      }
  
      profile = profileData;
    }



  return (
    <html lang="ja">
      <body>
        <ToastProvider/>
        <Header user={user}/>
        <div className="w-full bg-gray-200 py-2 px-8">
          <div className="lg:flex  container mx-auto lg:gap-10 ">
            <aside className="lg:w-1/4 max-[1024px]:hidden">
              
                <Sideber user={user} profile={profile}/>
            
            </aside>
            <main className="lg:w-3/4 md:w-full bg-slate-200 pb-30">{children}</main>
          </div>
        </div>
        <Footer user={user}/>
      </body>
    </html>
  );
}
