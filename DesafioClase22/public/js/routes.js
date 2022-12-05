const getProducts = async () => {
  try {
    const response = await fetch("/api/productos-test");
    const products = await response.json();
    return products;
  } catch (error) {
    console.log(error);
  }
};

export const API_ROUTES = {
  getProducts,
};
