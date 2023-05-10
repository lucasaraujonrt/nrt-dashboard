import { supabaseClient } from "./supabase";

type getFinancialParams = {
  userId: string;
  token: string;
};

export const getFinancial = async ({ userId, token }: getFinancialParams) => {
  const client = await supabaseClient(token);

  const { data, error } = await client
    .from("financial")
    .select("*")
    .eq("user_id", userId);

  console.log("error", error);
  if (error) {
    throw error;
  }

  return data;
};

function generateUUID() {
  var d = new Date().getTime();
  var d2 = (performance && performance.now && performance.now() * 1000) || 0;
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export const setFinancial = async ({ userId, token }: getFinancialParams) => {
  const client = await supabaseClient(token);

  const { data, error } = await client.from("financial").insert({
    user_id: userId,
    name: "Financial" + generateUUID(),
    description: "Financial" + generateUUID(),
    installments: 1,
    value: 100 + Math.random() * 1000,
    payment_method: 1,
    status: 1,
  });

  console.log("error", error);

  return data;
};
