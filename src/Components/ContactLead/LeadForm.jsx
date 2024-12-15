import React, {useContext, useState} from 'react';
import {useFormik} from "formik";
import {useTranslation} from "react-i18next";
import "./style-form.scss"
import axios from "axios";
import {MyContext} from "../App/App";

const LeadForm = () => {
    let value = useContext(MyContext);
    const [success, setSuccess] = useState(false)
    const {t} = useTranslation();
    const validate = (values) => {
        const errors = {};

        if (!values.phone) {
            errors.phone = "Required";
        }

        if (!values.name) {
            errors.name = "Required";
        }

        if (!values.direction) {
            errors.direction = "Required";
        }

        return errors;
    };
    const formik = useFormik({
        initialValues: {
            name: "",
            phone: "",
            direction: ""
        },
        validate,
        onSubmit: (values) => {

            let user = {
                phone: values.phone,
                first_name: values.name,
                category: values.direction,
            }

            axios.post(`${value.url}contactUs/`, user).then((response) => {
                setSuccess(true)
                setTimeout(() => {
                    setSuccess(false)
                }, 4000)
                formik.resetForm()
            })

        },
    });

    return (
        <div className="lead-form">
            {success && <div className="success">
                <div className="card-success">
                    <div className="animation">
                        <div className="success-animation">
                            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                                <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                            </svg>
                        </div>
                    </div>
                    <div className="title">
                        {t("successText")}
                    </div>
                </div>
            </div>}
            <h1 className="title">
                {t("titleForm")}
            </h1>
            <form onSubmit={formik.handleSubmit} className="input-box">
                <label htmlFor="name">{t("name")}</label>
                <div className={`input-lead ${formik.errors.name === "Required" ? "Required" : ""}`}>
                    <img src="./images/name-icon.png" alt="name" loading="lazy"/>
                    <input
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        name="name" placeholder={t("name")} type="text"/>
                </div>
                <label htmlFor="phone">{t("phone")}</label>
                <div className={`input-lead ${formik.errors.phone === "Required" ? "Required" : ""}`}>
                    <img src="./images/phone-icon.png" alt="phone" loading="lazy"/>
                    <input
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                        name="phone" placeholder={t("phone")} type="text"/>
                </div>
                <label htmlFor="direction">{t("directionForm")}</label>
                <div className={`input-lead ${formik.errors.direction === "Required" ? "Required" : ""}`}>
                    <img src="./images/direction-icon.png" alt="description" loading="lazy"/>
                    <select onChange={formik.handleChange} value={formik.values.direction} name="direction"
                            id="direction">
                        <option value="">{t("directionForm")}</option>
                        <option value="national">{t("national")}</option>
                        <option value="modern">{t("modern")}</option>
                        <option value="promo">{t("promo")}</option>
                    </select>
                </div>
                <button type="submit">
                    {t("send")}
                </button>
            </form>
        </div>
    );
};

export default LeadForm;