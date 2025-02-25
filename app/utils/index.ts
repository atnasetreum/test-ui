export const clearDomain = (domain: string) => {
  return domain
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .split("/")[0];
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
