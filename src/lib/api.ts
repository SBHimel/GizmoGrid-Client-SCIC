import { authClient } from "./auth-client";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';

interface ProductDataType {
  title: string;
  price: string;
  category: string;
  description: string;
  stock: string;
  image: string; 
}

export const addProductToServer = async (productData: ProductDataType) => {
  const {data: token} = await authClient.token()
  console.log(token);
  const response = await fetch(`${BASE_URL}/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token?.token}`
    },
    body: JSON.stringify(productData),
  });

  return await response.json();
};


export const getSellerProducts = async () => {
  try {
    const { data: tokenData } = await authClient.token();
    const token = tokenData?.token;

    // 🎯 ইউআরএল পরিবর্তন করে /api/seller/products করা হলো
    const response = await fetch(`${BASE_URL}/api/seller/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token || ""}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Call Error (getSellerProducts):", error);
    return { success: false, data: [] };
  }
};



/**
 * 🗑️ প্রোডাক্ট ডিলিট করার API কল
 */
export const deleteProductFromServer = async (productId: string) => {
  try {
    const { data: tokenData } = await authClient.token();
    const token = tokenData?.token;

    const response = await fetch(`${BASE_URL}/api/products/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token || ""}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Call Error (deleteProductFromServer):", error);
    return { success: false, message: "সার্ভারের সাথে যোগাযোগ করা যায়নি।" };
  }
};




/**
 * 🔍 নির্দিষ্ট একটি প্রোডাক্টের ডাটা আনা
 */
export const getSinglePro = async (productId: string) => {
  try {
    const { data: tokenData } = await authClient.token();
    const token = tokenData?.token;

    const response = await fetch(`${BASE_URL}/api/products/${productId}/edit`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token || ""}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("API Call Error (getSingleProduct):", error);
    return { success: false, data: null };
  }
};

/**
 * 🔄 প্রোডাক্ট আপডেট করা
 */
export const updateProductOnServer = async (productId: string, updatedFields: any) => {
  try {
    const { data: tokenData } = await authClient.token();
    const token = tokenData?.token;

    const response = await fetch(`${BASE_URL}/api/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token || ""}`,
      },
      body: JSON.stringify(updatedFields),
    });
    return await response.json();
  } catch (error) {
    console.error("API Call Error (updateProductOnServer):", error);
    return { success: false, message: "সার্ভারের সাথে যোগাযোগ করা যায়নি।" };
  }
};


/**
 * 🌍 Fetch all products with search, filtering, and pagination (Public API)
 */
export const getAllProducts = async (queryParams: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/products?${queryParams}`, {
      method: "GET",
    });
    return await response.json();
  } catch (error) {
    console.error("API Call Error (getAllProducts):", error);
    return { success: false, data: [], totalPages: 1, currentPage: 1 };
  }
};


/**
 * 🔍 নির্দিষ্ট একটি প্রোডাক্টের ডিটেইলস ও রিলেটেড আইটেম আনা
 */
export const getSingleProduct = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/products/${id}`, {
      method: "GET",
    });
    return await response.json();
  } catch (error) {
    console.error("API Call Error (getSingleProduct):", error);
    return { success: false, data: null, relatedProducts: [] };
  }
};


// 👥 ১. সব ইউজারের লিস্ট গেট করার ফাংশন
export const getAllUsers = async () => {
  const { data: tokenData } = await authClient.token();

  const response = await fetch(`${BASE_URL}/api/admin/users`, {
    headers: {
      Authorization: `Bearer ${tokenData?.token}`,
    },
  });

  return await response.json();
};

// ⚡ ২. ইউজারের রোল আপডেট করার ফাংশন
export const updateUserRoleInDB = async (
  userId: string,
  role: string
) => {
  const { data: tokenData } = await authClient.token();

  const response = await fetch(
    `${BASE_URL}/api/admin/users/${userId}/role`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenData?.token}`,
      },
      body: JSON.stringify({ role }),
    }
  );

  return await response.json();
};

// তোমার ফ্রন্টএন্ডের api ফাইলে (যেখানে সব API ফাংশন থাকে)


export const updateUserStatusInDB = async (
  userId: string,
  status: string
) => {
  try {
    const { data } = await authClient.token();

    const res = await fetch(`${BASE_URL}/api/admin/users/${userId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data?.token}`,
      },
      body: JSON.stringify({ status }),
    });

    return await res.json();
  } catch (error) {
    console.error("API error updating status:", error);
    return { success: false };
  }
};


export const getAllProductsForAdmin = async () => {
  try {
    const { data: token } = await authClient.token();

    const res = await fetch(`${BASE_URL}/api/admin/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.token}`,
      },
    });

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return { success: false };
  }
};


export const deleteProductByAdmin = async (productId: string) => {
  try {
    const { data: token } = await authClient.token();

    const res = await fetch(
      `${BASE_URL}/api/admin/products/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.token}`,
        },
      }
    );

    return await res.json();
  } catch (error) {
    console.error("Failed to delete product:", error);
    return { success: false };
  }
};