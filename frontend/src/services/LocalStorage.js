const storeToken = (value) => {
  if (value) {
    console.log("Token");
    const { access, refresh } = value;
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresre_token", refresh);
  }
};

const getToken = () => {
  let access_token = localStorage.getItem("access_token");
  let refresre_token = localStorage.getItem("refresre_token");
  return { access_token, refresre_token };
};

const removeToken = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresre_token");
};

export { storeToken, getToken, removeToken };
