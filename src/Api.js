export async function apiLogin(loginData) {
    const url =
        "http://https://gerenciador-protetico.adaptable.app/users/login";
    // console.log(loginData);
    try {
        const response = await fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
        });

        if (response.status === 200) {
            const data = await response.json();
            // console.log("Login successfully");
            localStorage.setItem("token", data.token);
            return true;
        } else {
            throw new Error();
        }
    } catch (error) {
        throw Error(error);
    }
}
export async function apiRegister(loginData) {
    const url =
        "http://https://gerenciador-protetico.adaptable.app/users/register";
    // console.log(loginData);
    try {
        const response = await fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
        });

        if (response.status === 200) {
            const data = await response.json();
            // console.log("Login successfully");
            localStorage.setItem("token", data.token);
            return true;
        } else {
            throw new Error();
        }
    } catch (error) {
        throw Error(error);
    }
}
async function setupFetch(url, reqMethod = "get", body) {
    if (!localStorage["token"]) {
        await apiLogin();
        // localStorage.setItem("token", data.token);
    }

    const reqConfig = {
        method: reqMethod,
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage["token"],
        },
    };
    if (body) {
        reqConfig.body = JSON.stringify(body);
    }
    try {
        const response = await fetch(url, reqConfig);
        if (response.status === 200 || response.status === 400) {
            const data = await response.json();
            return data;
        }

        if (response.status === 401) {
            localStorage.removeItem("token");
            return "Old token";
        }
    } catch (err) {
        throw Error(err);
    }
}
export async function APItodos(category) {
    const url = `http://https://gerenciador-protetico.adaptable.app/api/${category}/todos`;
    const data = await setupFetch(url, "get");
    // console.log(data);
    return data;
}
export async function APIDetails(category, id) {
    const url = `http://https://gerenciador-protetico.adaptable.app/api/${category}/${id}`;
    const data = await setupFetch(url, "get");
    return data;
}
export async function APIGetServiceBy(id, by) {
    const url = `http://https://gerenciador-protetico.adaptable.app/api/servico/todos/${by}/${id}`;
    const data = await setupFetch(url, "get");
    return data;
}

export async function APIPostNewData(formData) {
    const url = `http://https://gerenciador-protetico.adaptable.app/api/${formData["category"]}/novo`;
    // console.log(formData);
    const data = await setupFetch(url, "post", formData);
    // console.log(data);
    return data;
}
export async function APIPutData(formData, id) {
    const url = `http://https://gerenciador-protetico.adaptable.app/api/${formData["category"]}/${id}/edit`;
    // console.log(formData);
    const data = await setupFetch(url, "put", formData);
    // console.log(data);

    return data;
}
export async function ApiOneExcel(id) {
    const url = `http://https://gerenciador-protetico.adaptable.app/api/export/${id}`;
    const reqConfig = {
        method: "Get",
        headers: {
            Authorization: "Bearer " + localStorage["token"],
        },
    };

    try {
        const response = await fetch(url, reqConfig);
        if (response.status === 200) {
            const blob = await response.blob();
            // console.log(data);
            return blob;
        }
    } catch (err) {
        throw Error(err);
    }
}

export async function ApiMonthExcel(id, date) {
    const url = `http://https://gerenciador-protetico.adaptable.app/api/export/${id}/${date}`;
    const reqConfig = {
        method: "Get",
        headers: {
            Authorization: "Bearer " + localStorage["token"],
        },
    };

    try {
        const response = await fetch(url, reqConfig);
        if (response.status === 200) {
            const blob = await response.blob();
            // console.log(data);
            return blob;
        }
    } catch (err) {
        throw Error(err);
    }
}
