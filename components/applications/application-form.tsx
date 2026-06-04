"use client";

import { useState } from "react";
import {
  ApplicationStatus,
  PaymentStatus,
  ApplicationType,
  ApplicationDocument,
} from "@/types/application";

import { now } from "@/lib/date";
import { useAuth } from "@/hooks/useAuth";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

interface ApplicationFormData {
  name: string;
  source: string;
  url: string;
  applicationType: ApplicationType;
  paymentStatus: PaymentStatus;
  payAmount?: number;
  appliedDate: string;
  lastApplicationDate: string;
  status: ApplicationStatus;

  circularUrl?: string;

  circularFile?: File | undefined;
  documents?: ApplicationDocument[];
  synced?: boolean;
  createdAt?: string;
  updatedAt?: string;
  daysLeft?: number;

  remarks?: string;
}

interface Props {
  onSubmit: (data: ApplicationFormData) => void;
}

const initialForm: ApplicationFormData = {
  name: "",
  source: "",
  url: "",
  applicationType: "government",
  paymentStatus: "not-required",
  payAmount: undefined,
  appliedDate: now(),
  lastApplicationDate: "",
  status: "draft",
  circularUrl: "",
  circularFile: undefined,
  daysLeft: undefined,
  remarks: "",
};

export function ApplicationForm({ onSubmit }: Props) {
  const [formData, setFormData] = useState<ApplicationFormData>(initialForm);
  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formData,
      daysLeft: formData.lastApplicationDate
        ? Math.ceil(
            (new Date(formData.lastApplicationDate).getTime() -
              new Date().getTime()) /
              (1000 * 60 * 60 * 24),
          )
        : undefined,
    };

    onSubmit(dataToSubmit);

    setFormData(initialForm);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData.circularFile && e.target.name === "circularFile") {
      setFormData({
        ...formData,
        circularFile: e.target.files?.[0],
      });
      return;
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      className="grid sm:grid-cols-3 gap-4 items-center border rounded-b-md rounded-t-none border-t-0 p-4"
      onSubmit={handleSubmit}
    >
      <Field>
        <FieldLabel htmlFor="app-name">Application Name</FieldLabel>
        <Input
          id="app-name"
          type="text"
          placeholder="Application Name"
          onChange={(e) => handleChange(e)}
          value={formData.name}
          name="name"
          required
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="app-source">Source</FieldLabel>
        <Input
          id="app-source"
          type="text"
          placeholder="Source (e.g. LinkedIn, University Website)"
          onChange={(e) => handleChange(e)}
          value={formData.source}
          name="source"
          required
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="app-url">URL</FieldLabel>
        <Input
          id="app-url"
          type="text"
          placeholder="URL"
          onChange={(e) => handleChange(e)}
          value={formData.url}
          name="url"
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="last-application-date">
          Last Application Date
        </FieldLabel>

        <Input
          id="last-application-date"
          type="date"
          placeholder="Last Application Date"
          onChange={(e) => handleChange(e)}
          value={formData.lastApplicationDate}
          name="lastApplicationDate"
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="application-type">Application Type</FieldLabel>
        <Select
          value={formData.applicationType}
          onValueChange={(value) =>
            setFormData({
              ...formData,
              applicationType: value as ApplicationType,
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an application type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Applications Type</SelectLabel>
              <SelectItem value="jobs">Jobs</SelectItem>
              <SelectItem value="admission">Admission</SelectItem>
              <SelectItem value="scholarship">Scholarship</SelectItem>
              <SelectItem value="government">Government</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>

      <Field>
        <FieldLabel className="block mb-1">Payment Status</FieldLabel>
        <Select
          value={formData.paymentStatus}
          onValueChange={(value) =>
            setFormData({
              ...formData,
              paymentStatus: value as PaymentStatus,
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select payment status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Payment Status</SelectLabel>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="not-required">Not Required</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>

      <Field>
        <FieldLabel className="block mb-1">
          Pay Amount {formData.paymentStatus === "not-required" && "🔒"}
        </FieldLabel>
        <Input
          type="number"
          placeholder="Pay Amount"
          value={formData.payAmount ?? ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              payAmount: e.target.value ? Number(e.target.value) : undefined,
            })
          }
          disabled={formData.paymentStatus === "not-required"}
        />
      </Field>

      <Field>
        <FieldLabel className="block mb-1">
          Circular URL {user && "(optional)"}
        </FieldLabel>
        <Input
          placeholder="Circular URL"
          value={formData.circularUrl}
          onChange={(e) =>
            setFormData({ ...formData, circularUrl: e.target.value })
          }
        />
      </Field>

      <Field>
        <FieldLabel className="block mb-1">
          Circular File {!user && "🔒"}
        </FieldLabel>

        <Input
          type="file"
          disabled={!user}
          onChange={(e) =>
            handleChange({
              ...e,
              target: { ...e.target, name: "circularFile" },
            } as React.ChangeEvent<HTMLInputElement>)
          }
          placeholder="Circular URL"
        />
      </Field>

      <Button className="w-fit" type="submit">
        Save Application
      </Button>
    </form>
  );
}
