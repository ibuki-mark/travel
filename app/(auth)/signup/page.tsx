import { redirect } from "next/navigation"
import { createClient } from "@/app/utils/supabase/server"
import Signup from "@/app/components/auth/Signup"
const page = async () => {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  const user = data?.user
  if(user){
    redirect("/")
  }
  return (
    <div className="h-[90vh] mx-auto">
      <Signup/>
    </div>
  )
}

export default page
