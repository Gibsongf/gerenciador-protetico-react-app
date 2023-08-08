export async function apiLogin(loginData) {
    const url = "http://localhost:3000/users/login";
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
            console.log("Login successfully");
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
        if (response.status === 200) {
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
    const url = `http://localhost:3000/api/${category}/todos`;
    const data = await setupFetch(url, "get");
    return data;
}
