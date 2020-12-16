import api from "../api"

export const generateDemoData = async (currentUserId, orgId) => {
  try {
    const res = await api.post(`/demo/generate`, { userId: currentUserId, orgId: orgId });
    console.log(res);
  } catch (err) {
    console.log(err)
  }
}