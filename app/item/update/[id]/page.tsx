import { Suspense } from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/app/utils/supabase/server"
import Loading from "@/app/loading"
import Updatepage from "@/app/components/items/Updatepage"

interface Params {
  params:{
    id:string
  }
}


const page = async(context:Params) => {
  const params=await context.params
  const id=await params.id
  const supabase=await createClient()
  const {data:userData}=await supabase.auth.getUser()
  const user=userData?.user

  if(!user){
    redirect("/")
  }
 
  const {data:blogData,error}=await supabase
  .from("blogs")
  .select("*")
  .eq("id",id)
  .single()

  if(error){
    return 
  }

  if(!blogData){
      return <div className="text-center">ブログが存在しません</div>
    }


  if(blogData.user_id!==user?.id){
    redirect(`/`)
  }


  return (
    <div className="w-[95%] mx-auto mb-50">
      <Suspense fallback={<Loading/>}>
       <Updatepage blogData={blogData}/>
      </Suspense>
    </div>
  )
}

export default page
