"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import styles from "./contact-form.module.scss";
import Button from "@/app/components/ui/button/button";
import { RadioGroup } from "@/app/components/ui/radio-group/radio-group";
import { TextArea } from "@/app/components/ui/textarea/textarea";
import { Input } from "@/app/components/ui/input/input";
import { CheckboxGroup } from "@/app/components/ui/checkbox-group/checkbox-group";

const services = ["Web Design","UX/UI Design","Brand Identity","2D/3D Motion","Video Production","Development"];
const budgets = [">$1k","$3k","$5k","$10k","$15k",">$30k"];
const timeframes = ["1 month","2-3 months","3-6 months","12 months","1 year +"];
const types = ["Individual","Company","Organisation","Government"];
const sources = ["Behance","Dribble","Instagram","LinkedIn","Awwwards","Other"];

interface FormValues {
    service: string[]; // ← змінено
    budget: string;
    timeframe: string;
    details: string;
    name: string;
    email: string;
    type: string;
    companyName: string;
    projectName: string;
    projectLink: string;
    from: string;
}

const validationSchema = Yup.object({
    service: Yup.array()
        .of(Yup.string())
        .min(1, "(Please select at least one service)")
        .required("(Please select at least one service)"),
    budget: Yup.string().required("(Please select a budget)"),
    timeframe: Yup.string().required("(Please select a timeframe)"),
    details: Yup.string().min(20, "(Minimum 20 characters)").required("(Project details are required)"),
    name: Yup.string().min(2, "(Too short)").required("(Name is required)"),
    email: Yup.string().email("(Invalid email)").required("(Email is required)"),
    type: Yup.string().required("(Please select an option)"),
    companyName: Yup.string().optional(),
    projectName: Yup.string().optional(),
    projectLink: Yup.string()
        .transform((v, orig) => (orig === "" ? undefined : v))
        .url("(Invalid URL)")
        .optional(),
    from: Yup.string().required("(Please select where you heard about us)"),
});

type Win = Window & {
    lenis?: { scrollTo?: (to: number, opts?: { duration?: number; immediate?: boolean; lock?: boolean }) => void };
    gsap?: { to: (target: Window, vars: { scrollTo: number; duration: number; ease?: string }) => void };
};

const smoothCenterScroll = (el: HTMLElement, opts?: { offset?: number; durationMs?: number }) => {
    const offset = opts?.offset ?? 0;
    const durationMs = opts?.durationMs ?? 700;
    const rect = el.getBoundingClientRect();
    const targetY = window.scrollY + rect.top - (window.innerHeight - rect.height) / 2 + offset;
    const w = window as Win;
    if (w.lenis?.scrollTo) {
        w.lenis.scrollTo(targetY, { duration: durationMs / 1000, immediate: false, lock: false });
        return durationMs;
    }
    if (w.gsap?.to) {
        w.gsap.to(window, { scrollTo: targetY, duration: durationMs / 1000, ease: "power2.out" });
        return durationMs;
    }
    window.scrollTo({ top: targetY, behavior: "smooth" });
    return durationMs;
};

const ScrollToFirstError: React.FC<{
    getContainer: () => HTMLElement | null;
    shouldRun: () => boolean;
    afterRun: () => void;
}> = ({ getContainer, shouldRun, afterRun }) => {
    const { errors, isSubmitting, isValidating } = useFormikContext<FormValues>();

    useEffect(() => {
        if (!shouldRun()) return;
        if (isSubmitting || isValidating) return;
        try {
            const names = Object.keys(errors || {});
            if (!names.length) return;
            const container = (getContainer() ?? document.body) as HTMLElement;
            const anchors: HTMLElement[] = names.flatMap((name) => {
                const byData = container.querySelector<HTMLElement>(`[data-field="${name}"]`);
                if (byData) return [byData];
                const input = container.querySelector<HTMLElement>(`[name="${name}"]`);
                if (!input) return [];
                const wrap = input.closest<HTMLElement>("[data-field]");
                return [wrap || input];
            });
            if (!anchors.length) return;
            const target = anchors
                .map((el) => ({ el, top: el.getBoundingClientRect().top }))
                .sort((a, b) => a.top - b.top)[0].el;
            const anchor = (target.closest("[data-field]") as HTMLElement) || target;
            const usedMs = smoothCenterScroll(anchor, { durationMs: 700 });
            const focusable = (anchor.matches("[name]") ? anchor : anchor.querySelector<HTMLElement>("[name]")) || anchor;
            window.setTimeout(() => focusable.focus({ preventScroll: true }), Math.max(200, Math.min(usedMs - 100, 800)));
        } finally {
            afterRun();
        }
    }, [errors, isSubmitting, isValidating, shouldRun, afterRun, getContainer]);

    return null;
};

const ContactForm: React.FC = () => {
    const rootRef = useRef<HTMLDivElement>(null);
    const submitClickedRef = useRef(false);
    const markSubmitClicked = useCallback(() => {
        submitClickedRef.current = true;
    }, []);
    const shouldRun = useCallback(() => submitClickedRef.current, []);
    const afterRun = useCallback(() => {
        submitClickedRef.current = false;
    }, []);

    const initialValues: FormValues = {
        service: [],
        budget: "",
        timeframe: "",
        details: "",
        name: "",
        email: "",
        type: "",
        companyName: "",
        projectName: "",
        projectLink: "",
        from: "",
    };

    return (
        <div ref={rootRef} className={styles.formWrapper}>
            <Formik<FormValues>
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    console.log("Submitted Data:", values);
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form className={styles.form}>
                        <ScrollToFirstError getContainer={() => rootRef.current} shouldRun={shouldRun} afterRun={afterRun} />
                        <div className={styles.formBody}>
                            <div className={styles.formGroup}>
                                <div className={styles.formGroupTitle}>01 Project Information</div>
                                <div className={styles.formGroupBody}>
                                    <div className={styles.formGroupBodyRow} data-field="service">
                                        <CheckboxGroup label="How we can help you?" name="service" options={services} />
                                    </div>
                                    <div className={styles.formGroupBodyRow} data-field="budget">
                                        <RadioGroup label="Budget in USD" name="budget" options={budgets} />
                                    </div>
                                    <div className={styles.formGroupBodyRow} data-field="timeframe">
                                        <RadioGroup label="Timeframe" name="timeframe" options={timeframes} />
                                    </div>
                                    <div className={styles.formGroupBodyRow} data-field="details">
                                        <TextArea label="Project details" name="details" placeholder="Project description, goals, brief..." />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <div className={styles.formGroupTitle}>02 General Information</div>
                                <div className={styles.formGroupBody}>
                                    <div className={styles.formGroupBodyRow}>
                                        <div className={styles.formInputs}>
                                            <div data-field="name">
                                                <Input label="Name" name="name" placeholder="Enter name" />
                                            </div>
                                            <div data-field="email">
                                                <Input label="Email" name="email" placeholder="Enter email" type="email" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.formGroupBodyRow} data-field="type">
                                        <RadioGroup label="I am a/an" name="type" options={types} />
                                    </div>
                                    <div className={styles.formGroupBodyRow}>
                                        <div className={styles.formInputs}>
                                            <div data-field="projectName">
                                                <Input label="Project name (optional)" name="projectName" placeholder="Enter name" />
                                            </div>
                                            <div data-field="projectLink">
                                                <Input label="Project link (optional)" name="projectLink" placeholder="Enter link" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <div className={styles.formGroupTitle}>03 Additional question</div>
                                <div className={styles.formGroupBody}>
                                    <div className={styles.formGroupBodyRow} data-field="from">
                                        <RadioGroup label="Where did you hear about us?" name="from" options={sources} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.formFooter}>
                            <Button variant="black" type="submit" disabled={isSubmitting} className={styles.button} onClick={markSubmitClicked}>
                                {isSubmitting ? "Submitting..." : "Send Request"}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ContactForm;
