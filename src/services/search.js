const BaseUrl = "https://property-search-jfgkbkgjzc.now.sh";

export default function getPropertiesForArea(area) {
  return fetch(`${BaseUrl}/search?q=${area}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network error during search");
      }

      return response;
    });
}
