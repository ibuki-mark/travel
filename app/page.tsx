
import Homepage from "./Home/Homepage";
import { createClient } from "./utils/supabase/server";
import { ProfileType } from "@/types";
import { BlogType } from "@/types";

interface searchType{
  searchParams:{
    q?:string
  }
}




export default async function Home({searchParams}:searchType) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data?.user;
  const sp=await searchParams
  const q = typeof sp.q === "string" ? sp.q.trim() : ""
  
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

   let  query =  supabase
    .from("blogs")
    .select(
      `
      *,
      profiles (
        name
      )
    `
    )
    .order("updated_at", { ascending: false })

    if (q) {
    query = query.ilike("title", `%${q}%`);
  }

  const { data: blogsData, error } = await query;

   
      if(!blogsData||error){
        return (
           <div className="text-center">
          ブログが投稿されていません
        </div>
        )
        
      }

  return (
    <div >
      <Homepage user={user} profile={profile} blogsData={blogsData} initialQ={q}/>
    </div>
  );
}
