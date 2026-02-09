import Create from "@/app/components/items/Create";
import Loading from "@/app/loading";
import { Suspense } from "react";
import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

const page = async () => {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;

  if (!user) {
    toast.error("ログインしてください")
    redirect("/");

  }

  return (
    <div className="w-[95%] mx-auto mb-50">
      <Suspense fallback={<Loading />}>
        <Create userId={user.id}/>
      </Suspense>
    </div>
  );
};

export default page;
