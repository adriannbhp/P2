import axios from "axios";
import { server } from "../../server";

// create product
export const createProduct =
  (
    name,
    description,
    category,
    tags,
    originalPrice,
    discountPrice,
    stock,
    shopId,
    images
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "productCreateRequest",
      });

      const { data } = await axios.post(
        `${server}/product/create-product`,
        name,
        description,
        category,
        tags,
        originalPrice,
        discountPrice,
        stock,
        shopId,
        images,
      );
      dispatch({
        type: "productCreateSuccess",
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: "productCreateFail",
        payload: error.response.data.message,
      });
    }
  };

// get All Products of a shop
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsShopRequest",
    });

    const { data } = await axios.get(
      `${server}/product/get-all-products-shop/${id}`
    );
    dispatch({
      type: "getAllProductsShopSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsShopFailed",
      payload: error.response.data.message,
    });
  }
};

// update product
export const updateProduct = (productId, productData) => async (dispatch) => {
  try {
    dispatch({
      type: "updateProductRequest",
    });

    const { data } = await axios.put(
      `${server}/product/update-product/${productId}`,
      productData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    dispatch({
      type: "updateProductSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "updateProductFail",
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Get product details
export const getProductDetails = (productId) => async (dispatch) => {
  try {
    dispatch({ type: 'getProductDetailsRequest' });
    const { data } = await axios.get(`${server}/product/get-product/${productId}`);
    dispatch({
      type: 'getProductDetailsSuccess',
      payload: data.product
    });
  } catch (error) {
    dispatch({
      type: 'getProductDetailsFail',
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// delete product of a shop
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProductRequest",
    });

    const { data } = await axios.delete(
      `${server}/product/delete-shop-product/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteProductSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProductFailed",
      payload: error.response.data.message,
    });
  }
};

// get all products
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsRequest",
    });

    const { data } = await axios.get(`${server}/product/get-all-products`);
    dispatch({
      type: "getAllProductsSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsFailed",
      payload: error.response.data.message,
    });
  }
};
