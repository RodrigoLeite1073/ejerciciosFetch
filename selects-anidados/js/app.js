const apiToken =
    "T7OqOkiabiqR7BRosIYObcVm-Ov0GYjI1Hg5QKCTDm-qADs6hJGoigla7FikaJfu01w",
  userEmail = "rodrigoleite1073@gmail.com",
  api = "https://www.universal-tutorial.com/api/";

const getAuthToken = async () => {
  let authToken;
  try {
    let res = await fetch(api + "getaccesstoken/", {
        headers: {
          Accept: "application/json",
          "api-token": apiToken,
          "user-email": userEmail,
          "Access-Control-Allow-Origin": "*",
        },
      }),
      json = await res.json();
    authToken = json.auth_token;
    if (!res.ok) {
      throw {
        status: res.status,
        statusText: res.statusText,
      };
    }
    return authToken;
  } catch (err) {}
};

const getContries = async (auth) => {
  console.log(auth);
  try {
    const res = await fetch(`${api}countries/`, {
        headers: {
          Authorization: "Bearer " + auth,
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }),
      json = await res.json();
    console.log(json);
    if (!res.ok) {
      throw {
        status: res.status,
        statusText: res.statusText,
      };
    }
  } catch (err) {}
};

getAuthToken().then((auth) => getContries(auth));
