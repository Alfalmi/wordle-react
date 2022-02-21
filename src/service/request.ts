import { WORDS } from "./words";

function getWords() {
  return WORDS;
}

export function getWordOfTheDay() {
  const words = getWords();
  const wordOfTheDay = words[getDayOfTheYear()];
  return wordOfTheDay.toUpperCase();
}
export async function isValidWord(word: string) {
  try {
    const URL = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
    const response = await fetch(URL);
    if (response.status !== 200) throw new Error("Request Failed");
    const json = await response.json();

    return json.length;
  } catch (e) {
    console.log(e);
    return false;
  }
  // const words = getWords();
  // return words.includes(word.toLowerCase());
}
function getDayOfTheYear() {
  const date = new Date();
  const start = new Date(date.getFullYear(), 0, 0);
  const diff =
    (date as any) -
    (start as any) +
    (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);
  return day;
}
