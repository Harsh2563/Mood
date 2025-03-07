import { getUserFromClerkId } from "./auth";
import { prisma } from "./db";

const createURL = (path: string) => {
  if (typeof window === 'undefined') {
    return `http://localhost:3000${path}`;
  }
  return `${window.location.origin}${path}`;
};

export const newEntry = async () => {
  try {
    const res = await fetch(
      new Request(createURL('/api/journal'), {
        method: 'POST',
      })
    );

    if (res.ok) {
      const data = await res.json();
      return data.data;
    }
  } catch (error) {
    console.error('Error fetching new entry:', error);
    return null;
  }
};

export const updateEntry = async (id, content) => {
  const res = await fetch(
    new Request(createURL(`/api/journal/${id}`), {
      method: 'PATCH',
      body: JSON.stringify({ content }),
    })
  )
  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
}


export const askQues = async (question) => {
  try {
    const res = await fetch(
      new Request(createURL('/api/question'), {
        method: 'POST',
        body: JSON.stringify({ question })
      })
    );

    if (res.ok) {
      const data = await res.json();
      console.log("data is here", data.data);

      return data.data;
    }
  } catch (error) {
    console.error('Error answering the question:', error);
    return;
  }
}
export const getEntries = async (id: string) => {
  try {
    const res = await fetch(createURL(`/api/journal`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching entries:', error);
    return null;
  }
};