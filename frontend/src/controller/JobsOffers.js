import api from "../utils";

const getJobsOffers = async (query) => {
  if (!query || query === "") {
    query = "front-end";
  }

  try {
    const result = await api.get(
      `/api/v0/search/jobs?query=${query}&per_page=10&expand=["company"]`
    );
    return result.data.data;
  } catch (e) {
    console.log("Error ", e);
    return [];
  }
};

export default getJobsOffers;
