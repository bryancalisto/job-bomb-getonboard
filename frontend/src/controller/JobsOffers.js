import api from "../utils";

const getJobsOffers = async (query, page) => {
  if (!query || query === "") {
    query = "front-end";
  }

  try {
    const result = await api.get(
      `/api/v0/search/jobs?query=${query}&per_page=10&page=${page}&expand=["company"]`
    );
    return result;
  } catch (e) {
    console.log("Error ", e);
    return false;
  }
};

export default getJobsOffers;
