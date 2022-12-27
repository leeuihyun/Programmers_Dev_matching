const BaseUrl = "url";

const request = async (data) => {
  const response = await fetch(data);

  if (response.ok) {
    const jsonData = await response.json();
    return jsonData;
  }

  throw new Error("요청이 실패했습니다.");
};

export const fetchLanguage = async (keyword) =>
  request(`${BaseUrl}/languages?keyword=${keyword}`);
