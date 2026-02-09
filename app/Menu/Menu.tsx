"use client"
import Menupage from "../components/Menupage"
import Link from "next/link"
import { BlogType } from "@/types"
interface BlogsDataType{
  blogsData:BlogType[]|null
}


const Menu = ({blogsData}:BlogsDataType) => {

  return (
    <div className="grid lg:grid-cols-3 max-[1024px]:grid-cols-2 gap-5 mt-4 w-full px-5 mx-auto">
      {
       (blogsData||[]).map((blogData)=>{
          return (
            <div key={blogData.id}>
              <Menupage blogData={blogData} />
             
            </div>
             
          )
        })
      }





      {/* <Link href={`/item/readsingle/faofaohfa`}>
      <Menupage />
      </Link>
      
       <Menupage/>
       <Menupage/>
       <Menupage/>
       <Menupage/>
       <Menupage/>
       <Menupage/>
       <Menupage/>
       <Menupage/> */}
    </div>
  )
}

export default Menu
