'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Formik, Form, Field } from 'formik';
import Link from 'next/link';
import Select from 'react-select';
import * as Yup from 'yup';

import countries from '@/data/countries.json';
import {
  CustomTextArea,
  CustomTextInput,
} from '@/components/Forms/form-elements';
import { getTimeZonesForCountry } from '@/services/timezone-management';
import PopoverElement from '@/components/Popover';

const validationRules = Yup.object({
  organizationId: Yup.string().required('Required...must...'),
});

const SignUpPage = () => {
  const [userData, setUserData] = useState({});
  const [signupStatus, setSignupStatus] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [timezoneList, setTimezoneList] = useState([]);
  const { data: session, status } = useSession();

  // useEffect(() => {
  //   if (status === 'authenticated') {
  //     window.location.href = '/';
  //   }
  // }, [session, status]);

  useEffect(() => {
    setCountryList(
      countries.map((obj) => {
        return { ...obj, value: obj.code, label: obj.name };
      })
    );
  }, []);

  const setTimeZone = (countryCode, countryName, setValues, values) => {
    const timezoneListForCountryCode = getTimeZonesForCountry(countryCode);
    setTimezoneList(timezoneListForCountryCode);
    if (timezoneListForCountryCode.length === 1) {
      setValues({
        ...values,
        selectedTimezone: timezoneListForCountryCode[0].name,
        countryCode: countryCode,
        countryName: countryName,
      });
    } else {
      setValues({
        ...values,
        selectedTimezone: '',
        countryCode: countryCode,
        countryName: countryName,
      });
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    console.log(
      'organizationId: ' + JSON.stringify(e.target.organizationId.value)
    );
    console.log('password: ' + JSON.stringify(e.target.password.value));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[url('/images/others/map.svg')] bg-cover bg-center dark:bg-[url('/images/others/map-dark.svg')]">
      <div className="glassmorphism m-6 w-full max-w-xl">
        <h2 className="mt-3 mb-5 text-3xl font-extrabold text-center text-shades-4 dark:text-shades-2 uppercase">
          Organization Signup
        </h2>

        <Formik
          initialValues={{
            organizationName: '',
            emailId: '',
            phone: '',
            // organizationId: '',
            organizationId: '',
            password: '',
            countryCode: '',
            countryName: '',
            selectedTimezone: '',
          }}
          validationSchema={validationRules}
          onSubmit={(values) => submitForm(values)}>
          {(formik) => {
            const { values, setValues } = formik;
            if (signupStatus)
              return (
                <div className="text-green-500 text-center h-screen center-flex flex-col">
                  <div className="text-2xl">User Added Successfully</div>
                  <p>
                    Credentials are sent via email. Please instruct the user to
                    modify password on first login.
                  </p>
                </div>
              );
            return (
              <Form className="grid grid-cols-2 gap-2">
                {/* Company name */}
                <div className="col-span-2 md:col-span-1">
                  <CustomTextInput
                    label={
                      <div className="flex items-center">
                        <span className="flex-grow">Company Name</span>
                      </div>
                    }
                    name="organizationName"
                    type="text"
                    placeholder="Enter Your Organization Name"
                    className="form-input"
                  />
                </div>

                {/* Organization Code */}
                <div className="col-span-2 md:col-span-1">
                  <CustomTextInput
                    label={
                      <div className="flex items-center">
                        <span className="flex-grow">Workspace ID</span>
                        <PopoverElement
                          content={
                            <div>
                              <p className="text-xs font-normal">
                                This code will be the workspace ID for your
                                company. All staff member will have to enter
                                this code to login to the system.
                              </p>
                            </div>
                          }
                        />
                      </div>
                    }
                    name="organizationId"
                    type="text"
                    placeholder="Enter Your Organization Code"
                    className="form-input"
                    value={values.organizationName}
                    disabled
                  />
                </div>

                {/* Email */}
                <div className="col-span-2 md:col-span-1">
                  <CustomTextInput
                    label={
                      <div className="flex items-center">
                        <span className="flex-grow">Email ID</span>
                      </div>
                    }
                    name="emailId"
                    type="email"
                    placeholder="Enter Email ID"
                    className="form-input"
                  />
                </div>

                {/* Contact Number */}
                <div className="col-span-2 md:col-span-1">
                  <CustomTextInput
                    label={
                      <div className="flex items-center">
                        <span className="flex-grow">Contact Number</span>
                      </div>
                    }
                    name="phone"
                    type="text"
                    placeholder="Enter Phone Number"
                    className="form-input"
                  />
                </div>

                {/* Password */}
                <div className="col-span-2 md:col-span-1">
                  <CustomTextInput
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                    className="form-input"
                  />
                </div>

                {/* Confirm Password */}
                <div className="col-span-2 md:col-span-1">
                  <CustomTextInput
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    className="form-input"
                  />
                </div>

                {/* Longitude and latitude */}
                <div className="col-span-2 grid grid-cols-2 gap-2">
                  <label className="col-span-2 flex items-center">
                    <span className="flex-grow mb-0">Office Location</span>
                    <PopoverElement
                      content={
                        <div>
                          <p className="text-xs font-normal">
                            Office location is used to verify whether attendance
                            is registered at the expected place or not.
                          </p>
                          <p className="text-xs font-normal">
                            To ccollect office location coordinates, you can use
                            your android or iOS device. Please follow the steps
                            below:
                          </p>
                          <ul className="text-xs font-normal list-disc indent-2 my-3">
                            <li className="ml-3">
                              Make sure you are at correct location
                            </li>
                            <li className="ml-3">Open Google Maps</li>
                            <li className="ml-3">
                              tap and hold on the office location on the map
                            </li>
                            <li className="ml-3">
                              You can now find the coordinates (latitude and
                              longitude) in the search box
                            </li>
                          </ul>
                        </div>
                      }
                    />
                  </label>
                  <hr class="col-span-2 h-px mt-0 mb-1 bg-gray-200 border-0 dark:bg-gray-500" />

                  <div className="col-span-2 md:col-span-1 -mt-3">
                    <CustomTextInput
                      label={
                        <span className="text-sm font-normal">Latitude</span>
                      }
                      name="latitude"
                      type="text"
                      placeholder="Enter Latitude"
                      className="form-input"
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1 -mt-3">
                    <CustomTextInput
                      label={
                        <span className="text-sm font-normal">Longitude</span>
                      }
                      name="longitude"
                      type="text"
                      placeholder="Enter Longitude"
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Country Select */}
                <div className="col-span-2 md:col-span-1 custom-select">
                  <label>Country of Office</label>
                  <Select
                    name="countryCode"
                    options={countryList}
                    onChange={(obj) => {
                      setTimeZone(obj.value, obj.label, setValues, values);
                    }}
                  />
                </div>

                {/* Timezone select */}
                <div className="col-span-2 grid grid-cols-2">
                  <label className="col-span-2 flex items-center">
                    <span className="flex-grow mb-0">Timezone</span>
                    <PopoverElement
                      content={
                        <div>
                          <p className="text-xs font-normal">
                            This timezone will be used in reports.
                          </p>
                        </div>
                      }
                    />
                  </label>
                  {timezoneList.length > 0 &&
                    timezoneList.map((obj, index) => (
                      <label
                        className="col-span-1 inline-flex items-center mx-2 my-1 cursor-pointer"
                        key={index}>
                        <input
                          type="radio"
                          name="selectedTimezone"
                          className="form-radio rounded-none peer"
                          value={obj.name}
                          onChange={(e) => {
                            setValues({
                              ...values,
                              selectedTimezone: e.target.value,
                            });
                          }}
                          checked={
                            (timezoneList.length === 1 && index === 0) ||
                            values.selectedTimezone === obj.name
                          }
                        />
                        <span className="peer-checked:text-primary dark:peer-checked:text-secondary mx-1 text-[10px] text-slate-500 dark:text-slate-200">
                          {obj.name} ({obj.offset})
                        </span>
                      </label>
                    ))}
                </div>

                {/* Address Input */}
                <div className="col-span-2">
                  <CustomTextArea
                    label={
                      <div className="flex items-center">
                        <span className="">Office Address</span>{' '}
                        <div
                          data-popover
                          id="popover-description"
                          role="tooltip"
                          class="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
                          <div class="p-3 space-y-2">
                            <h3 class="font-semibold text-gray-900 dark:text-white">
                              Activity growth - Incremental
                            </h3>
                            <p>
                              Report helps navigate cumulative growth of
                              community activities. Ideally, the chart should
                              have a growing trend, as stagnating chart
                              signifies a significant decrease of community
                              activity.
                            </p>
                            <h3 class="font-semibold text-gray-900 dark:text-white">
                              Calculation
                            </h3>
                            <p>
                              For each date bucket, the all-time volume of
                              activities is calculated. This means that
                              activities in period n contain all activities up
                              to period n, plus the activities generated by your
                              community in period.
                            </p>
                            <a
                              href="#"
                              class="flex items-center font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline">
                              Read more{' '}
                              <svg
                                class="w-2 h-2 ml-1.5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10">
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="m1 9 4-4-4-4"
                                />
                              </svg>
                            </a>
                          </div>
                          <div data-popper-arrow></div>
                        </div>
                      </div>
                    }
                    name="address"
                    type="text"
                    placeholder="Enter Address"
                    className="form-input"
                  />
                </div>

                {/* Submit button */}
                <div className="col-span-2 w-full flex justify-center my-3">
                  <button
                    type="submit"
                    className="relative flex items-center justify-center rounded-md border px-5 py-2 text-sm shadow-[0_10px_20px_-10px] outline-none transition duration-300 hover:shadow-none border-primary bg-primary text-white dark:border-secondary dark:bg-secondary font-extrabold shadow-primary/60 min-w-47.5">
                    CREATE COMPANY ACCOUNT
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>

        <p className="text-right mt-3">
          <Link
            href="/auth/signin"
            className="font-bold text-primary dark:text-secondary dark:hover:text-primary hover:text-secondary hover:underline ltr:ml-1 rtl:mr-1">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
