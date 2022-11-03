const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3",
  apiKey: "e9e9d8da18ae29fc430845952232787c",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;