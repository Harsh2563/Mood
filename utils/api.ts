const createURL = (path) => {
    return window.location.origin + path
}

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

  export const updateEntry = async(id,content)=> {
      const res =await fetch(
        new Request(createURL(`/api/journal/${id}`),{
        method: 'PATCH',
        body: JSON.stringify({content}),
    })
    )
      if(res.ok) {
        const data = await res.json();
        return data.data;
      }
  }


  export const askQues = async(question)=> {
    try {
      const res = await fetch(
        new Request(createURL('/api/question'), {
          method: 'POST',
          body: JSON.stringify({question})
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
  