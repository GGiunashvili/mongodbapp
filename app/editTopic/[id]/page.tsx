import EditTopicForm from "../../../components/EditTopicForm";

// Function to fetch the topic by ID
const getTopicById = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_TOP_TEST}/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// Default export function for the EditTopic page
export default async function EditTopic({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const { topic } = await getTopicById(id);

  // Handle case where topic data is not found
  if (!topic) {
    return <p>Topic not found</p>;
  }

  const { title, description } = topic;

  return <EditTopicForm id={id} title={title} description={description} />;
}
