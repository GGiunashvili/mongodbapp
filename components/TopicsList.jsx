import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const getTopics = async () => {
  try {
    const res = await fetch(
      process.env.TOPICS_API_URL ||
        "https://mongodbapp-dun.vercel.app/api/topics",
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
    return { topics: [] }; // Return an empty array as fallback
  }
};

export default async function TopicsList() {
  const { topics } = await getTopics();

  // Ensure that topics is always an array, even if the fetch failed
  return (
    <>
      <div className=" grid-cols-8 col-span-8">
        {topics?.length > 0 ? (
          topics.map((t) => (
            <div
              key={t._id}
              className="col-span-2 p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
            >
              <div>
                <h2 className="font-bold text-2xl">{t.title}</h2>
                <div>{t.description}</div>
              </div>

              <div className="flex gap-2">
                <RemoveBtn id={t._id} />
                <Link href={`/editTopic/${t._id}`}>
                  <HiPencilAlt size={24} />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div>No topics available</div>
        )}
      </div>
    </>
  );
}
