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
  const res = await fetch(
    `https://blog-platform.kata.academy/api/articles/${slug}`
  );
  if (!res.ok) {
    throw new Error('Error article SLUG');
  }

  const data = await res.json();
  return data;
}

export async function postUser(body) {
  const res = await fetch('https://blog-platform.kata.academy/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return data;
}

export async function putUser(token, body) {
  const res = await fetch('https://blog-platform.kata.academy/api/user', {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return data;
}

export async function getUser(token) {
  const res = await fetch('https://blog-platform.kata.academy/api/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data;
}

export async function signInUser(body) {
  const res = await fetch(
    'https://blog-platform.kata.academy/api/users/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  );

  const data = await res.json();
  return data;
}
