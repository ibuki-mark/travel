import React from "react";
import Profile from "../Profile";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/app/utils/supabase/server";
import { ProfileType } from "@/types";
import Loading from "@/app/loading";
const pate = async () => {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;

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

  if (!user || !profile) {
    redirect("/");
  }

  return (
    <div className="w-[95%] mx-auto mb-50">
      <Suspense fallback={<Loading/>}>
         <Profile profile={profile}/>
      </Suspense>
      
    </div>
  );
};

export default pate;
