import BookmarkIcon from "@mui/icons-material/Bookmark";
import Menu from "@/app/Menu/Menu";
const page = () => {
  return (
    <div className=" bg-white rounded-xl my-8 px-2">
      <div className=" flex items-center  py-6 gap-4 border-b-4 border-dotted border-slate-300 ">
        <BookmarkIcon className="text-slate-400" />
        <h1 className="text-2xl font-bold">ブックマーク</h1>
      </div>

      <div className="mt-10">
        {/* <Menu/> */}
      </div>
    </div>
  );
};

export default page;
