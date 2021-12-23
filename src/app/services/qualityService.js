import httpServise from "./httpService";

const qualityEndpoint = `quality/`;

const qualityService = {
  update: async (id, content) => {
    const { data } = await httpServise.put(qualityEndpoint + id, content);
    return data;
  },

  get: async (id) => {
    const { data } = await httpServise.get(qualityEndpoint + id);
    return data;
  },

  fetchAll: async () => {
    const { data } = await httpServise.get(qualityEndpoint);
    return data;
  },
};

export default qualityService;
