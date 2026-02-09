"use server";
import { decode } from "base64-arraybuffer";
import { v4 as uuidv4 } from "uuid";
import { BlogUpSchema, BlogUpType } from "@/schemas";
import z from "zod";
import { createClient } from "@/app/utils/supabase/server";
import { generateAiAnswer } from "./action";
import { UpdateShema } from "@/schemas";
import { UpBlogType } from "@/types";
import { generateAiQuestion } from "./questionaction";
import { error } from "console";

interface newBlogProps extends z.infer<typeof BlogUpSchema> {
  base64Image?: string;
  userId: string;
}

export const newBlog = async (values: newBlogProps) => {
  try {
    const supabase = await createClient();
    let image_url = "";

    if (values.base64Image) {
      const matches = values.base64Image.match(/^data:(.+);base64,(.+)$/);

      if (!matches || matches.length !== 3) {
        return { error: "無効な画像データです" };
      }

      const contentType = matches[1];
      const base64Data = matches[2];

      const fileExt = contentType.split("/")[1];

      // ファイル名を生成
      const fileName = `${uuidv4()}.${fileExt}`;

      const { error: storageError } = await supabase.storage
        .from("blogs")
        .upload(`${values.userId}/${fileName}`, decode(base64Data), {
          contentType,
        });

      if (storageError) {
        return { error: storageError.message };
      }

      // 画像のURLを取得
      const { data: urlData } = await supabase.storage
        .from("blogs")
        .getPublicUrl(`${values.userId}/${fileName}`);

      image_url = urlData.publicUrl;
    }

    const { data: blog, error: insertError } = await supabase
      .from("blogs")
      .insert({
        title: values.title,
        content: values.content,
        catogory: values.catogory,
        image_url,
        bookmark: [{
          user_id:"",
          mark:false
        }],
        question: "",
        user_id: values.userId,
        answer: [],
      })
      .select("id, title, content")
      .single();

    if (insertError) {
      return { error: insertError.message };
    }
    if (!blog) {
      return { error: "ブログの作成に失敗しました" };
    }

    const aiAnswers = await generateAiAnswer({
      title: blog.title,
      content: blog.content,
    });

    const { error: updateError } = await supabase
      .from("blogs")
      .update({ answer: aiAnswers })
      .eq("id", blog.id);

    if (updateError) return { error: updateError.message };
  } catch (err) {
    console.error(err);
    return { error: "エラーが発生しました" };
  }
};

interface updateBlogProps extends z.infer<typeof UpdateShema> {
  blogData: UpBlogType;
  base64Image?: string;
}

export const updateBlog = async (values: updateBlogProps) => {
  try {
    const supabase = await createClient();
    let image_url = values.blogData.image_url;
    if (values.base64Image) {
      const matches = values.base64Image.match(/^data:(.+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        return { error: "無効な画像データです" };
      }

      const contentType = matches[1]; // 例: "image/png"
      const base64Data = matches[2];

      // 拡張子を取得
      const fileExt = contentType.split("/")[1]; // 例: "png"

      // ファイル名を生成
      const fileName = `${uuidv4()}.${fileExt}`;

      const { error: storageError } = await supabase.storage
        .from("blogs")
        .upload(`${values.blogData.user_id}/${fileName}`, decode(base64Data), {
          contentType,
        });

      if (storageError) {
        return { error: storageError.message };
      }

      if (image_url) {
        const fileName = image_url.split("/").slice(-1)[0];

        // 古い画像を削除
        await supabase.storage
          .from("blogs")
          .remove([`${values.blogData.user_id}/${fileName}`]);
      }
      const { data: urlData } = await supabase.storage
        .from("blogs")
        .getPublicUrl(`${values.blogData.user_id}/${fileName}`);
      image_url = urlData.publicUrl;
    }

    const { data: blog, error: Error } = await supabase
      .from("blogs")
      .update({
        title: values.title,
        content: values.content,
        catogory: values.catogory,
        image_url,
      })
      .eq("id", values.blogData.id)
      .select("id,title,content")
      .single();

    if (Error) {
      return { error: Error.message };
    }
    const aiAnswers = await generateAiAnswer({
      title: blog.title,
      content: blog.content,
    });

    const { error: updateError } = await supabase
      .from("blogs")
      .update({ answer: aiAnswers })
      .eq("id", blog.id);

    if (updateError) {
      return { error: updateError.message };
    }
  } catch (err) {
    console.error(err);
    return { error: "エラーが発生しました" };
  }
};

interface deleteBlogProps {
  blogId: string;
  imageUrl?: string | null;
  userId: string;
}

// ブログ削除
export const deleteBlog = async ({
  blogId,
  imageUrl,
  userId,
}: deleteBlogProps) => {
  try {
    const supabase = await createClient();

    // ブログ削除
    const { error } = await supabase.from("blogs").delete().eq("id", blogId);

    if (error) {
      return { error: error.message };
    }

    if (!imageUrl) {
      return;
    }

    // ファイル名取得
    const fileName = imageUrl.split("/").slice(-1)[0];

    // 画像を削除
    await supabase.storage.from("blogs").remove([`${userId}/${fileName}`]);
  } catch (err) {
    console.error(err);
    return { error: "エラーが発生しました" };
  }
};

interface questionBlogType {
  question: string;
  blog: UpBlogType;
}

export const questionBlog = async (values: questionBlogType) => {
  try {
    const supabase = await createClient();

    const { data: blogData, error: Error } = await supabase
      .from("blogs")
      .select("answer,title,content")
      .eq("id", values.blog.id)
      .single();

    if (Error) {
      return {
        error: Error.message,
      };
    }

    const aiAnswers = await generateAiQuestion({
      title: blogData.title,
      content: blogData.content,
      question: values.question,
    });

    const normalizeAiAnswers = (ai: any) => {
      if (Array.isArray(ai)) return ai;
      if (ai && Array.isArray(ai.answer)) return ai.answer;
      return [];
    };

    const aiList =normalizeAiAnswers(aiAnswers)

    const updatedAnswer = [...blogData.answer, ...aiList];

    const { error: updateError } = await supabase
      .from("blogs")
      .update({ answer: updatedAnswer })
      .eq("id", values.blog.id);

    if (updateError) return { error: updateError.message };
  } catch (err) {
    console.error(err);
    return { error: "エラーが発生しました" };
  }
};
