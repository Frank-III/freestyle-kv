import { useCloudState } from "freestyle-sh";
import { BlogStat, blogsManager, type Comment } from "../cloudstate/blogStat";
import { useEffect, useState, type FormEvent } from "react";
interface BlogStatProps {
  id: string;
}

export function BlogStatComponent({ id }: BlogStatProps) {
  const [statData, setStatData] = useState<{
    likes: number;
    comments: Comment[];
  } | null>(null);
  const blogStat = useCloudState(BlogStat, id);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await blogsManager.createOrGetStat(id);
        setStatData(data);
      } catch (e) {
        console.log("fail to fetch stat", e);
      }
    }
    fetchData();
  }, [id]);

  const handleLike = async () => {
    if (!statData) {
      return;
    }
    blogStat.like().then((ll) => {
      console.log("yeah");
      setStatData({ ...statData, likes: ll });
    });
  };

  const addComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!statData) {
      return;
    }
    const formData = new FormData(e.target as HTMLFormElement);
    const comment = await blogStat.addComment({
      name: formData.get("name") as string,
      comment: formData.get("comment") as string,
    });
    formData.set("name", "");
    formData.set("comment", "");
    setStatData({ ...statData, comments: [comment, ...statData?.comments] });
  };

  return (
    <div className="mt-2 flex flex-col w-full items-center justify-center">
      <div className="flex flex-row text-gray-100 py-2 px-4 border border-zinc-400 rounded-full items-center shadow-sm ">
        <button
          onClick={handleLike}
          className="inline-flex group items-center gap-2 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            viewBox="0 0 72 72"
            className="transform transition duration-200 group-hover:scale-150 group-hover:rotate-3"
          >
            <path
              fill="#EA5A47"
              d="M60.5 25c0-7.444-6.056-13.5-13.5-13.5a13.5 13.5 0 0 0-11 5.672A13.5 13.5 0 0 0 25 11.5c-7.444 0-13.5 6.056-13.5 13.5c0 2.729.84 5.408 2.383 7.65l-.034.028L34.715 58.54h2.57l20.228-25.07l.668-.837l-.036-.024A13.53 13.53 0 0 0 60.5 25"
            ></path>
            <path
              fill="#FCEA2B"
              d="M60.339 24.537c-2.926 0-8.116 2.85-10.701 5.625c.493.527.8 1.256.8 2.059c-.03 3.706.066 3.849-.094 4.487c6.84 2.122 8.548 7.385 11.917 2.913c3.845-5.103 1.694-15.084-1.922-15.084"
            ></path>
            <path
              fill="#F1B31C"
              d="M50.436 32.49c2.747-2.503 7.254-4.84 9.903-4.84c1.98 0 3.52 2.992 3.878 6.538c.486-4.708-1.333-9.652-3.878-9.652c-2.926 0-8.116 2.85-10.701 5.625c.493.528.8 1.257.8 2.06z"
            ></path>
            <path
              fill="#FCEA2B"
              d="M32.473 39.621c3.37 4.472 5.078-.791 11.917-2.913c-.16-.638-.065-.78-.093-4.487c0-.803.306-1.532.8-2.06c-2.586-2.775-7.776-5.624-10.702-5.624c-3.616 0-5.767 9.98-1.922 15.084"
            ></path>
            <path
              fill="#F1B31C"
              d="M44.299 32.49c-2.748-2.503-7.254-4.84-9.904-4.84c-1.98 0-3.52 2.992-3.878 6.538c-.486-4.708 1.333-9.652 3.878-9.652c2.926 0 8.116 2.85 10.701 5.625a3 3 0 0 0-.8 2.06z"
            ></path>
            <path
              fill="#FCEA2B"
              d="M44.225 37.133c-.734.266-1.399.58-2.007.918c-1.304 1.735-3.613 5.214-6.085 10.752c-.197.441.105.97.504.883l2.845-.622c.413-.09.826.155 1.029.612l1.28 2.887c.225.506.831.405.94-.156c.556-2.847 1.83-8.994 3.374-13.14c-.91-.193-1.644-1.038-1.88-2.134m8.171.952a13 13 0 0 0-2.031-.952c-.237 1.096-.97 1.94-1.881 2.134c1.544 4.146 2.818 10.293 3.374 13.14c.11.56.715.662.94.156l1.28-2.887c.203-.457.616-.703 1.03-.613l2.844.622c.4.088.701-.441.504-.882C56 43.3 53.704 39.83 52.396 38.085"
            ></path>
            <path
              fill="#FCEA2B"
              d="M47.495 28.812h-.99c-1.319 0-2.391 1.405-2.391 3.133v3.92c0 1.728 1.072 3.133 2.39 3.133h.99c1.319 0 2.391-1.405 2.391-3.132v-3.921c0-1.728-1.072-3.133-2.39-3.133"
            ></path>
            <path
              fill="#F1B31C"
              d="M47.055 35.866v-3.921c0-1.3-.608-2.418-1.47-2.891c.283-.156.593-.242.92-.242h.99c1.318 0 2.39 1.405 2.39 3.133v3.92c0 1.728-1.072 3.134-2.39 3.134h-.99c-.327 0-.637-.087-.92-.242c.862-.473 1.47-1.59 1.47-2.891"
            ></path>
            <path fill="none" d="M15.556 32.264h16.89"></path>
            <g
              fill="none"
              stroke="#000"
              stroke-miterlimit="10"
              stroke-width="2"
            >
              <path d="M49.835 36.794c6.839 2.122 8.547 7.385 11.917 2.914c3.458-4.592 2.065-13.131-.883-14.799a2.1 2.1 0 0 0-1.04-.286c-1.308 0-3.069.57-4.847 1.448c-2.199 1.086-4.424 2.643-5.854 4.177"></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M44.225 36.794c-.734.266-1.399.58-2.007.918c-1.304 1.734-3.613 5.213-6.085 10.752c-.197.44.105.97.504.882l2.845-.622c.413-.09.826.156 1.029.613l1.28 2.887c.225.506.831.405.94-.156c.556-2.847 1.83-8.994 3.374-13.14c-.91-.194-1.644-1.038-1.88-2.134m7.642.952a13 13 0 0 0-2.032-.952c-.236 1.096-.97 1.94-1.881 2.134c1.544 4.146 2.818 10.293 3.374 13.14c.11.56.715.662.94.156l1.28-2.887c.204-.457.617-.703 1.03-.613l2.844.622c.4.088.701-.441.504-.882c-2.456-5.503-4.751-8.973-6.06-10.718"
              ></path>
              <path d="M47.495 28.812h-.99c-1.319 0-2.391 1.405-2.391 3.133v3.92c0 1.728 1.072 3.133 2.39 3.133h.99c1.319 0 2.391-1.405 2.391-3.132v-3.921c0-1.728-1.072-3.133-2.39-3.133z"></path>
              <path d="M44.372 29.89c-2.586-2.774-7.235-5.353-10.16-5.353c-3.617 0-5.767 9.981-1.923 15.084c3.37 4.472 5.078-.791 11.917-2.913"></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M58.648 20.454C56.829 15.798 52.3 12.5 47 12.5a12.5 12.5 0 0 0-11 6.56a12.5 12.5 0 0 0-11-6.56c-6.904 0-12.5 5.596-12.5 12.5c0 2.97 1.04 5.694 2.77 7.839l-.004.003L36 58.54l3.101-3.844"
              ></path>
            </g>
          </svg>
          <span className="group-hover:text-red-400 ">
            {statData ? statData.likes : -1}
          </span>
        </button>
        <div className="h-full w-[1px] text-zinc-300 mx-2 " />
        <div className="inline-flex group items-center gap-2 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={30}
            height={30}
            viewBox="0 0 20 20"
            className="transform transition duration-200 group-hover:scale-150 group-hover:rotate-3"
          >
            <path
              fill="#fde047"
              fill-rule="evenodd"
              d="M3.43 2.524A41.29 41.29 0 0 1 10 2c2.236 0 4.43.18 6.57.524c1.437.231 2.43 1.49 2.43 2.902v5.148c0 1.413-.993 2.67-2.43 2.902a41.102 41.102 0 0 1-3.55.414a.785.785 0 0 0-.643.413l-1.712 3.293a.75.75 0 0 1-1.33 0l-1.713-3.293a.783.783 0 0 0-.642-.413a41.108 41.108 0 0 1-3.55-.414C1.993 13.245 1 11.986 1 10.574V5.426c0-1.413.993-2.67 2.43-2.902"
              clip-rule="evenodd"
            />
          </svg>
          <span className="group-hover:text-yellow-400">
            {statData ? statData?.comments.length : -1}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-start w-full">
        <h3>Comments</h3>
        <form
          className="w-full flex flex-row items-end space-x-2"
          onSubmit={addComment}
        >
          <label htmlFor="name" className="flex flex-col items-start">
            <span className="ml-2 my-2">Name</span>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="what is your name 🤗"
              className="h-9 rounded-full px-4 "
            />
          </label>
          <label
            htmlFor="comment"
            className="flex flex-col flex-grow items-start"
          >
            <span className="ml-2 my-2">Comment</span>
            <input
              type="text"
              id="comment"
              name="comment"
              required
              placeholder="any suggestions or comments 🤔"
              className="h-9 rounded-full px-4 w-full"
            />
          </label>
          <button
            type="submit"
            className="px-4 py-1 border rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-bold text-emerald-100"
          >
            Submit
          </button>
        </form>
        <div className="mt-3 flex flex-col w-full">
          {statData &&
            statData.comments.map((c) => (
              <div className="inline-flex mx-3 items-center justify-between bg-">
                <h4 className="">{c.comment}</h4>
                <span className="">{c.name}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
