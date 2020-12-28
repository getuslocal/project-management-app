import api from '../api';

export const generateDemoData = async (currentUserId, orgId) => {
  try {
    await api.post(`/demo/generate`, {
      userId: currentUserId,
      orgId: orgId,
    });
  } catch (err) {
    console.log(err);
  }
};
