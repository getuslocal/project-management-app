export const projectCategories = {
  BUSINESS: 'Business',
  MARKETING: 'Marketing',
  SOFTWARE: 'Software',
};

export const defaultProjectIcons = {
  FLAG: 'https://i.ibb.co/gJn4w3P/project-1.png',
  MOUNTAIN: 'https://i.ibb.co/0Dn9KCf/project-2.png',
  UFO: 'https://i.ibb.co/pXjfMX3/project-5.png',
  CLOUD: 'https://i.ibb.co/xfdgWYD/viewavatar.png',
  VOLUME: 'https://i.ibb.co/tJMKsfC/viewavatar2.png',
};

export const getRandomProjectIcon = () => {
  // Get random int between 1 and 4.
  const rand = Math.floor(Math.random() * 5);
  const randomIcon = Object.values(defaultProjectIcons)[rand];

  if(!randomIcon) return Object.values(defaultProjectIcons)[0];

  return randomIcon;
}

export const defaultUserIcon = "https://i.ibb.co/k6c1RR5/default-profile.png";