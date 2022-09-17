const apiToken =
    "T7OqOkiabiqR7BRosIYObcVm-Ov0GYjI1Hg5QKCTDm-qADs6hJGoigla7FikaJfu01w",
  userEmail = "rodrigoleite1073@gmail.com",
  api = "https://www.universal-tutorial.com/api/",
  d = document,
  $country = d.getElementById("select-country"),
  $state = d.getElementById("select-state"),
  $city = d.getElementById("select-city"),
  $errorMessage = d.querySelector(".error-message");
let token;
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
  } catch (err) {
    console.error(err);
    let message = `${err.statusText}` || "Error de autorizacion";
    $errorMessage.textContent = `Error ${err.status}:${message}`;
  }
};

const getContries = async () => {
  token = await getAuthToken();
  try {
    const res = await fetch(`${api}countries/`, {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }),
      json = await res.json();
    if (!res.ok) {
      throw {
        status: res.status,
        statusText: res.statusText,
      };
    }
    let $options = `<option value="">Select a country</option>`;
    json.forEach((el) => {
      $options += `<option value="${el.country_name}">${el.country_name}</option>`;
    });
    $country.innerHTML = $options;
  } catch (err) {
    console.error(err);
    let message = `${err.statusText}` || "Error al cargar los paises";
    $errorMessage.textContent = `Error ${err.status}:${message}`;
  }
};

const getStates = async (country) => {
  fetch(`${api}states/${country}`, {
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      let $options = `<option value="">Select a state</option>`;
      json.forEach((el) => {
        $options += `<option value="${el.state_name}">${el.state_name}</option>`;
      });
      $state.innerHTML = $options;
      $state.removeAttribute("disabled", "");
    })
    .catch((err) => {
      console.error(err);
      let message = `${err.statusText}` || "Error al cargar los estados";
      $errorMessage.textContent = `Error ${err.status}:${message}`;
    });
};

const getCities = async (state) => {
  console.log(state);
  fetch(`${api}cities/${state}`, {
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((res) => res.json())
    .then((json) => {
      let $options = `<option value="">Select a city</option>`;
      json.forEach((el) => {
        $options += `<option value="${el.city_name}">${el.city_name}</option>`;
      });
      $city.innerHTML = $options;
      $city.removeAttribute("disabled", "");
    })
    .catch((err) => {
      console.error(err);
      let message = `${err.statusText}` || "Error al cargar los estados";
      $errorMessage.textContent = `Error ${err.status}:${message}`;
    });
};

d.addEventListener("DOMContentLoaded", getContries);
d.addEventListener("change", (e) => {
  if (e.target === $country) {
    getStates($country.value);
  } else if (e.target === $state) {
    getCities($state.value);
  }
});
