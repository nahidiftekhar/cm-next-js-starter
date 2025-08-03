"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Formik, Form, Field } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import axios from "axios";
import { signOut } from "next-auth/react";

import { CustomTextInput } from "@/components/Forms/form-elements";
import PopoverElement from "@/components/Popover";
import { showAlert } from "@/services/custom-aletrs";

const validationRules = Yup.object({
  password: Yup.string().required("Required"),
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /^(?=.*[@#$%^&+=]).*$/,
      "At least one special character (@, #, $, %, ^, &, +, or =)"
    )
    .required("New Password is required"),
  confirmPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("newPassword"), null], "Must match with new password"),
});

const ChangePassword = () => {
  const [passChangeStatus, setPassChangeStatus] = useState(false);
  const { data: session, status } = useSession();

  const handlePasswordChange = async (values) => {
    const apiResponse = await axios.post("/api/auth/change-password", {
      password: values.password,
      newPassword: values.newPassword,
    });
    console.log("apiRespoonse.data: " + JSON.stringify(apiResponse.data.error));
    if (apiResponse.data.success) {
      signOut();
      setPassChangeStatus(true);
    } else {
      setPassChangeStatus(false);
      showAlert({
        icon: "error",
        title: "Error",
        body: apiResponse.data.error,
        confirmationRequired: true,
      });
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="glassmorphism md:min-w-[400px] md:mt-10 max-w-screen-lg">
        <h2 className="mt-3 mb-5 text-3xl font-extrabold text-center text-shades-4 dark:text-shades-2">
          Change Password
        </h2>
        <Formik
          initialValues={{
            password: "",
            newPassword: "",
            confirmPassword: "",
          }}
          validationSchema={validationRules}
          onSubmit={(values) => handlePasswordChange(values)}
        >
          {(formik) => {
            const { values, setValues } = formik;
            if (passChangeStatus || status === "unauthenticated")
              return (
                <div className="text-center text-emerald-800 dark:text-emerald-400 py-2">
                  <div className="text-2xl">
                    Password Modification Successful
                  </div>
                  <p className="mb-10">Please login with your new password.</p>
                  <Link
                    className="mt-20 !w-20 text-emerald-600 bg-transparent border border-solid border-emerald-600 hover:bg-emerald-500 hover:text-white active:bg-emerald-600 font-bold uppercase text-xs px-1 py-1 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
                    href="/auth/signin"
                  >
                    <span className="mx-10 my-2">Login</span>
                  </Link>
                </div>
              );
            return (
              <Form className="grid grid-cols-2 gap-x-2">
                {/* Current Password */}
                <div className="col-span-2">
                  <CustomTextInput
                    label="Current Password"
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                    className="form-input"
                  />
                </div>
                {/* New Password */}
                <div className="col-span-2">
                  <CustomTextInput
                    label={
                      <div className="flex items-center">
                        <span className="flex-grow">New Password</span>
                        <PopoverElement
                          content={
                            <div>
                              <p className="text-xs font-semibold mb-1">
                                Password Policy:
                              </p>
                              <ul className=" list-disc ml-2">
                                <li className="font-light text-xs">
                                  At least eight characters
                                </li>
                                <li className="font-light text-xs">
                                  At least one uppercase letter
                                </li>
                                <li className="font-light text-xs">
                                  At least one lowercase letter
                                </li>
                                <li className="font-light text-xs">
                                  At least one number
                                </li>
                                <li className="font-light text-xs">
                                  At least one special character (@, #, $, %, ^,
                                  &, +, or =)
                                </li>
                              </ul>
                            </div>
                          }
                        />
                      </div>
                    }
                    name="newPassword"
                    type="password"
                    placeholder="Enter New Password"
                    className="form-input"
                  />
                </div>
                {/* Confirm Password */}
                <div className="col-span-2">
                  <CustomTextInput
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm New Password"
                    className="form-input"
                  />
                </div>
                {/* Submit button */}
                <div className="col-span-2 w-full flex justify-center my-3">
                  <button
                    type="submit"
                    className="relative flex items-center justify-center rounded-md border px-5 py-2 text-sm shadow-[0_10px_20px_-10px] outline-none transition duration-300 hover:shadow-none border-primary bg-primary text-white dark:border-secondary dark:bg-secondary font-extrabold shadow-primary/60 min-w-47.5"
                  >
                    Change Password
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default ChangePassword;
