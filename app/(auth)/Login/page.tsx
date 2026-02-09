import Login from "@/app/components/auth/Login"
import { redirect } from "next/navigation"
import { createClient } from "@/app/utils/supabase/server"
const page = async() => {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  const user = data?.user

  if (user) {
    redirect("/")
  }
  
  return (
    <div className="h-[90vh] mx-auto ">
      <Login/>
    </div>
  )
}

export default page
