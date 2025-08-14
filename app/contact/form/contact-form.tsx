"use client";

import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styles from "./contact-form.module.scss";
import Button from "@/app/components/ui/button/button";
import { RadioGroup } from "@/app/components/ui/radio-group/radio-group";
import { TextArea } from "@/app/components/ui/textarea/textarea";
import { Input } from "@/app/components/ui/input/input";

const services = [
  "Web Design",
  "UX/UI Design",
  "Brand Identity",
  "2D/3D Motion",
  "Video Production",
  "Development",
];
const budgets = [">$1k", "$3k", "$5k", "$10k", "$15k", ">$30k"];
const timeframes = [
  "1 month",
  "2-3 months",
  "3-6 months",
  "12 months",
  "1 year +",
];
const types = ["Individual", "Company", "Organisation", "Government"];
const sources = [
  "Behance",
  "Dribble",
  "Instagram",
  "LinkedIn",
  "Awwwards",
  "Other",
];

const validationSchema = Yup.object({
  service: Yup.string().required("Please select a service"),
  budget: Yup.string().required("Please select a budget"),
  timeframe: Yup.string().required("Please select a timeframe"),
  details: Yup.string()
    .min(20, "Minimum 20 characters")
    .required("Project details are required"),
  name: Yup.string().min(2, "Too short").required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  type: Yup.string().required("Please select an option"),
  companyName: Yup.string().notRequired(),
  projectLink: Yup.string().url("Invalid URL").notRequired(),
  from: Yup.string().required("Please select where you heard about us"),
});

const ContactForm: React.FC = () => {
  return (
    <Formik
      initialValues={{
        service: "",
        budget: "",
        timeframe: "",
        details: "",
        name: "",
        email: "",
        type: "",
        companyName: "",
        projectLink: "",
        from: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log("Submitted Data:", values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <div className={styles.formBody}>
            <div className={styles.formGroup}>
              <div className={styles.formGroupTitle}>
                01 Project Information
              </div>
              <div className={styles.formGroupBody}>
                <div className={styles.formGroupBodyRow}>
                  <RadioGroup
                    label="How we can help you?"
                    name="service"
                    options={services}
                  />
                </div>
                <div className={styles.formGroupBodyRow}>
                  <RadioGroup
                    label="Budget in USD"
                    name="budget"
                    options={budgets}
                  />
                </div>
                <div className={styles.formGroupBodyRow}>
                  <RadioGroup
                    label="Timeframe"
                    name="timeframe"
                    options={timeframes}
                  />
                </div>
                <div className={styles.formGroupBodyRow}>
                  <TextArea
                    label="Project details"
                    name="details"
                    placeholder="Project description, goals, brief..."
                  />
                </div>
              </div>
            </div>

            <div className={styles.formGroup}>
              <div className={styles.formGroupTitle}>
                02 General Information
              </div>
              <div className={styles.formGroupBody}>
                <div className={styles.formGroupBodyRow}>
                  <div className={styles.formInputs}>
                    <Input label="Name" name="name" placeholder="Enter name" />
                    <Input
                      label="Email"
                      name="email"
                      placeholder="Enter email"
                      type="email"
                    />
                  </div>
                </div>
                <div className={styles.formGroupBodyRow}>
                  <RadioGroup label="I am a/an" name="type" options={types} />
                </div>
                <div className={styles.formGroupBodyRow}>
                  <div className={styles.formInputs}>
                    <Input
                      label="Project name"
                      name="projectName"
                      placeholder="Enter name (optional)"
                    />
                    <Input
                      label="Project link (optional)"
                      name="projectLink"
                      placeholder="Enter link"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.formGroup}>
              <div className={styles.formGroupTitle}>
                03 Additional question
              </div>
              <div className={styles.formGroupBody}>
                <div className={styles.formGroupBodyRow}>
                  <RadioGroup
                    label="Where did you hear about us?"
                    name="from"
                    options={sources}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.formFooter}>
            <Button variant="black" type="submit" disabled={isSubmitting} className={styles.button}>
              {isSubmitting ? "Submitting..." : "Send Request"}
            </Button>{" "}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
