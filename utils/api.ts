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
        console.log("data is here", data);
        
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
  