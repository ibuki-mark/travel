export interface ProfileType{
  id:string
  name:string
  introduce?:string | null
  avatar_url?:string | null
  homescreen_url?:string | null
  bookmark:string[]
}


export interface AnswerItem{
  question: string;
  answer: string;
}


export interface BlogType {
  id:string
  title:string
  content:string
  image_url?:string|null
  catogory:string
  bookmark:[{
    user_id:string
    mark:boolean
  }]
  question:string
  updated_at: string|null
  created_at: string
  answer:AnswerItem []
}

export interface UpBlogType {
  id:string
  user_id:string
  title:string
  content:string
  image_url?:string|null
  catogory:string
  bookmark:[{
    user_id:string
    mark:boolean
  }]
  question:string
  updated_at: string|null
  created_at: string
  answer:AnswerItem []
}