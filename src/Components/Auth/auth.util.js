import axios from "axios";
import { API_URL } from "../../Config/config.constant";
import { setCredentials } from "../../Redux/features/loginSlice";

async function onLogin(values, dispatch, login) {
    let phoneNumWithoutPrefix = values.phoneNumber.replace(/[^+\d]/g, "");
    let phoneNumber = values.prefix ? (values.prefix + values.phoneNumber.replace(/[^+\d]/g, "")) : phoneNumWithoutPrefix;
    delete values.prefix;
    let value = { ...values, phoneNumber };

    let promise = new Promise(async function (resolve, reject) {
        try {
            const userData = await login(value).unwrap();
            dispatch(setCredentials({ ...userData.data }));
            resolve('SUCCESS');
        } catch (err) {
            reject(err);
        }
    });
    return promise;
}

async function onRegister(values) {
    let phoneNumber = values.prefix + values.phoneNumber.replace(/[^+\d]/g, "");
    if (values.surname === undefined || values.surname === null) {
        values.surname = "";
    }
    let loginData = {
        password: values.password,
        phoneNumber
    }
    const { prefix, password2, agreement, ...rest } = values;
    let data = {
        ...rest,
        deleted: false,
        phoneNumber,
    };

    let promise = new Promise((resolve, reject) => {
        axios({
            method: "POST",
            url: API_URL + "/auth/register",
            data,
        }).then((res) => {
            let response = {
                ...res,
                loginData // QEYDIYYATDAN SONRA LOGIN OLMAQ UCUN ISTIFADE OLUNUR
            }
            if (res.status === 200 || res.status === 201) resolve(response);
        })
            .catch((err) => {
                reject(err);
            })
    })
    return promise;
}


export { onLogin, onRegister }