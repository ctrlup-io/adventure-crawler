import { Item, BackpackItem, User, Log } from "./types";

const { VITE_API_URL } = import.meta.env;

export async function signIn(user: User): Promise<boolean> {
  try {
    const url = new URL("inscription", VITE_API_URL);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    await response.json();
    return true;
  } catch (error) {
    return false;
  }
}

export async function getItems(user: User): Promise<Item[]> {
  try {
    const url = new URL(`preparation/items?limit=1000`, VITE_API_URL);
    const credentials = btoa(`${user.name}:${user.password}`);
    const headers = new Headers({
      Authorization: `Basic ${credentials}`,
    });
    const response = await fetch(url, { headers });
    const data = await response.json();
    return data.items;
  } catch (error) {
    return [];
  }
}

export async function getScore(user: User): Promise<Item[]> {
  try {
    const url = new URL("score-board", VITE_API_URL);
    const credentials = btoa(`${user.name}:${user.password}`);
    const headers = new Headers({
      Authorization: `Basic ${credentials}`,
    });
    const response = await fetch(url, { headers });
    const data = await response.json();
    return data;
  } catch (error) {
    return [];
  }
}

export async function getBackpack(user: User): Promise<BackpackItem[]> {
  try {
    const url = new URL("preparation/backpack", VITE_API_URL);
    const credentials = btoa(`${user.name}:${user.password}`);
    const headers = new Headers({
      Authorization: `Basic ${credentials}`,
    });
    const response = await fetch(url, { headers });
    const data = await response.json();
    return data.items;
  } catch (error) {
    return [];
  }
}

export async function updateBackpack(
  user: User,
  items: string[],
): Promise<void> {
  try {
    const url = new URL("preparation/backpack", VITE_API_URL);
    const credentials = btoa(`${user.name}:${user.password}`);
    const headers = new Headers({
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
    });
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ itemsName: items }),
    });
    await response.json();
  } catch (error) {
    return;
  }
}

export async function getAdventures(user: User): Promise<Item[]> {
  try {
    const url = new URL(`preparation/adventures?limit=1000`, VITE_API_URL);
    const credentials = btoa(`${user.name}:${user.password}`);
    const headers = new Headers({
      Authorization: `Basic ${credentials}`,
    });
    const response = await fetch(url, { headers });
    const data = await response.json();
    return data.adventures;
  } catch (error) {
    return [];
  }
}

export async function exploreAdventure(user: User, name: string): Promise<Log> {
  try {
    const url = new URL(`exploration/adventures/${name}`, VITE_API_URL);
    const credentials = btoa(`${user.name}:${user.password}`);
    const headers = new Headers({
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
    });
    const response = await fetch(url, {
      method: "POST",
      headers,
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return { score: 0, report: "" };
  }
}
