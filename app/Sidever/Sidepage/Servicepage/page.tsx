import Image from "next/image";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import study from "../../../../public/image/study.jpg";
import get from "../../../../public/image/get.jpg"
const page = () => {
  return (
    <div className="w-full bg-slate-50 my-8 rounded-xl px-6 pb-6">
      <div className="pt-8  pb-6  border-b-4 border-dotted border-slate-300 flex items-center gap-5">
        <ViewCompactIcon />
        <div className="font-bold text-2xl ">サービスについて</div>
      </div>

      <div className="mt-8 md:flex flex-cols w-full gap-5 ">
        <div className="">
          <Image
            src={study}
            width={500}
            alt="画像"
            className="rounded-xl"
            
          ></Image>
        </div>
        <div className="w-full mx-auto">
          <div className="font-bold text-xl">
            日々の学びを定着させることを目的とした
            <br />
            「思考型ブログ」
          </div>

          <div className="mt-4 font-mono leading-8">
            本サービスでは、その日の出来事や気づいたことを簡潔に書き留めると同時に、生成AIが問いかけや深掘りを行います。
            「なぜそう感じたのか」「他にどのような見方ができるか」「次に何を意識すべきか」といった問いを通して、短時間でも振り返りができる設計になっています。
          </div>
        </div>

      </div>

      <div className="flex  gap-5 mt-10 mx-auto max-[1024px]:flex-col-reverse">
        <div className="w-full mx-auto leading-8 font-mono mt-4">
          これにより、長時間文章を書く余裕がない日でも、数分間の内省によって思考を言語化し、アウトプットとして定着させることができます。
          本ブログは、書くことが目的ではなく、<span className="font-bold">考え、気づき、次につなげること</span>を大切にしています。
生成AIはそのための補助役として、思考を広げるきっかけを提供します。
        </div>
        <div>
          <Image src={get} width={500} className="rounded-xl" alt="画像"></Image>
        </div>
      </div>
    </div>
  );
};

export default page;
