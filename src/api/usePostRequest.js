const post = async (url, data = null) => {
  const response = await fetch(url, {
    method: 'POST',
    body: new URLSearchParams((data))
  });
  return response.json();
};

export default post;
