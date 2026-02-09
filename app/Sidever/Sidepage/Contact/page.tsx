import MailIcon from "@mui/icons-material/Mail";
const page = () => {
  return (
    <div className="bg-slate-50 px-8 mt-8 rounded-2xl py-6">
      <div className="pt-4 pb-5 flex items-center gap-5 border-b-4 border-dotted border-slate-300">
        <MailIcon className="text-slate-400" />
        <div className=" font-bold text-2xl ">お問い合わせ</div>
      </div>

      <div className="my-4">
        <div className="font-bold">
          サービスについてのお問い合わせはこちらからお願いします。
        </div>
      </div>

      <form action="">
        <div className="w-full bg-slate-100 flex flex-col px-4 rounded-md py-3">
          <label>
            <div className=" flex flex-col  justify-center gap-5 py-7">
              <div className="font-bold">お名前</div>

              <input
                type="text"
                className="bg-white px-6 py-2 rounded-md"
                placeholder="田中 太郎"
                name="name"
              />
            </div>
          </label>

          <label>
            <div className="flex flex-col  justify-center gap-5 ">
              <div className="font-bold">メールアドレス</div>
              <input
                type="text"
                name="email"
                className="bg-white rounded-md px-6 py-2"
                placeholder="example@mail.com"
              />
            </div>
          </label>

          <label>
            <div className="flex flex-col  justify-center mt-6">
              <div className="font-bold ">お問い合わせ内容</div>
              <textarea
                name="textcontent"
                id=""
                className="bg-white  h-36 px-2 py-1 rounded-md mt-6"
                placeholder="お問い合わせ内容をご記入ください"
              ></textarea>
            </div>
          </label>

          <div className="flex flex-col  items-center mt-10">
            <div className="px-2">
              <label className="flex items-center justify-center gap-3">
                <input type="checkbox" value="true" className="h-5 w-5" />
                <p>個人情報取り扱いに同意する</p>
              </label>
            </div>
          </div>

          <button type="submit" className="w-30 bg-blue-400 text-white font-bold px-4
           py-2 rounded-md self-center my-10 cursor-pointer hover:opacity-85 hover:text-lg transition-all duration-300">
            送信する
          </button>

        </div>
      </form>
    </div>
  );
};

export default page;
