/* eslint-disable no-await-in-loop */
export async function fetchArticles(offSet, token = null) {
  let res;
  if (!token) {
    res = await fetch(
      `https://blog-platform.kata.academy/api/articles?limit=5&offset=${offSet}`
    );
  } else {
    res = await fetch(
      `https://blog-platform.kata.academy/api/articles?limit=5&offset=${offSet}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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

export async function createArticle(token, body) {
  const res = await fetch('https://blog-platform.kata.academy/api/articles', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return data;
}

export async function updateArticle(token, slug, body) {
  const res = await fetch(
    `https://blog-platform.kata.academy/api/articles/${slug}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  );

  return res;
}

export async function deleteArticle(slug, token) {
  const res = await fetch(
    `https://blog-platform.kata.academy/api/articles/${slug}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res;
}

export async function slugFavorite(slug, token) {
  const res = await fetch(
    `https://blog-platform.kata.academy/api/articles/${slug}/favorite`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();
  return data;
}
