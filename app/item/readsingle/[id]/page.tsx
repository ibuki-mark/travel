import Readsingle from "@/app/components/items/Readsingle";
import Loading from "@/app/loading";
import { createClient } from "@/app/utils/supabase/server";
import { Suspense } from "react";


type Props = {
  params: {
    id: string;
  };
};


const page = async(context:Props) => {

  const params=await context.params
  const id=await params.id
  const supabase=await createClient()
  const {data:userData}=await supabase.auth.getUser()
  const user=userData?.user
  

  const { data: blogData ,error} = await supabase
    .from("blogs")
    .select(
      `
      *,
      profiles (
        name
      )
    `
    )
    .eq("id", id)
    .single()

    if(error){
      return <div>取得エラー: {error.message}</div>
    }

    if(!blogData){
      return <div className="text-center">ブログが存在しません</div>
    }
  
    const isMyBlog=user?.id===blogData.user_id

  return (
    <div className="w-[95%] mx-auto mb-50">
      <Suspense fallback={<Loading />}>
        <Readsingle blog={blogData} isMyBlog={isMyBlog} user={user}/>
      </Suspense>
      
    </div>
  )
}

export default page
