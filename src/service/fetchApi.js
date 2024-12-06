/* eslint-disable no-await-in-loop */
export async function fetchArticles(offSet) {
  let counter = 0;
  let res = await fetch(
    `https://blog-platform.kata.academy/api/articles?limit=5&offset=${offSet}`
  );
  if (!res.ok) {
    while (counter < 3) {
      counter++;

      res = await fetch(
        (res = await fetch(
          'https://blog-platform.kata.academy/api/articles?limit=5&offset=0'
        ))
      );
      if (res.ok) {
        counter = 0;
        break;
      }
    }
  }
  if (!res.ok) {
    throw new Error('WOOOW');
  }

  const data = await res.json();
  return data;
}

export async function fetchArticleSlug(slug) {
  let counter = 0;
  let res = await fetch(
    `https://blog-platform.kata.academy/api/articles/${slug}`
  );
  if (!res.ok) {
    while (counter < 3) {
      counter++;

      res = await fetch(
        (res = await fetch(
          `https://blog-platform.kata.academy/api/articles/${slug}`
        ))
      );
      if (res.ok) {
        counter = 0;
        break;
      }
    }
  }
  if (!res.ok) {
    throw new Error('Error article SLUG');
  }
}

export async function postUser(body) {
  // const counter = 0;
  async function newUser(user) {
    await fetch('https://blog-platform.kata.academy/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  }
  const res = newUser(body);
  // console.log(res);
  // if (!res.ok) {
  //   while (counter < 3) {
  //     counter++;
  //     res = newUser(body);
  //     if (res.ok) {
  //       counter = 0;
  //       break;
  //     }
  //   }
  // }
  if (!res.ok) {
    throw new Error('Error Sign Up');
  }

  const data = await res.json();
  console.log(data);
  return data;
}
