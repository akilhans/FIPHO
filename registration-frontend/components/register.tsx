"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BrandLockup } from "@/components/brand-lockup";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/+$/, "");

const formSchema = z.object({
  full_name: z
    .string()
    .min(3, { message: "Full name must be at least 3 characters." }),
  country: z.string().min(1, { message: "Please select a country." }),
  role: z.string().min(1, { message: "Please select a role." }),
  subject: z.string().min(1, { message: "Please select a subject." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  whatsapp_number: z.string().regex(/^\+[1-9]\d{1,14}$/, {
    message:
      "Please enter a valid WhatsApp number starting with + (e.g., +1234567890)",
  }),
  additional_number: z.string().regex(/^\+[1-9]\d{1,14}$/, {
    message:
      "Please enter a valid number starting with + (e.g., +1234567890)",
  }).or(z.literal("")),
  number_of_students: z
    .string()
    .min(1, { message: "Please select number of students." }),
  number_of_team_leaders: z
    .string()
    .min(1, { message: "Please select number of team leaders." }),
});

const RegistrationForm: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      country: "",
      role: "",
      subject: "",
      email: "",
      whatsapp_number: "",
      additional_number: "",
      number_of_students: "0",
      number_of_team_leaders: "0",
    },
  });

  const [countries, setCountries] = useState<{ id: number; name: string }[]>(
    []
  );
  const [roles, setRoles] = useState<{ id: number; name: string }[]>([]);
  const [subjects, setSubjects] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await fetch(`${baseUrl}/api/countries/`, {
          method: "GET",
          headers: {
            Accept: "*/*",
          },
        });
        if (!res.ok) throw new Error("Failed to fetch countries");
        const data = await res.json();
        // Ensure data is always an array
        setCountries(Array.isArray(data) ? data : data?.data || data?.results || []);
      } catch (error) {
        console.error("Error fetching countries:", error);
        toast.error("Failed to load countries");
        setCountries([]); // Set empty array on error
      }
    }
    fetchCountries();
  }, []);

  useEffect(() => {
    async function fetchRoles() {
      try {
        const res = await fetch(`${baseUrl}/api/roles/`, {
          method: "GET",
          headers: {
            Accept: "*/*",
          },
        });
        if (!res.ok) throw new Error("Failed to fetch roles");
        const data = await res.json();
        // Ensure data is always an array
        setRoles(Array.isArray(data) ? data : data?.data || data?.results || []);
      } catch (error) {
        console.error("Error fetching roles:", error);
        toast.error("Failed to load roles");
        setRoles([]); // Set empty array on error
      }
    }
    fetchRoles();
  }, []);

  useEffect(() => {
    async function fetchSubjects() {
      try {
        const res = await fetch(`${baseUrl}/api/subjects/`, {
          method: "GET",
          headers: {
            Accept: "*/*",
          },
        });
        if (!res.ok) throw new Error("Failed to fetch subjects");
        const data = await res.json();
        // Ensure data is always an array
        setSubjects(Array.isArray(data) ? data : data?.data || data?.results || []);
      } catch (error) {
        console.error("Error fetching subjects:", error);
        toast.error("Failed to load subjects");
        setSubjects([]); // Set empty array on error
      }
    }
    fetchSubjects();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = {
        full_name: values.full_name,
        country: parseInt(values.country),
        role: parseInt(values.role),
        subject: parseInt(values.subject),
        email: values.email,
        whatsapp_number: values.whatsapp_number,
        additional_number: values.additional_number || null,
        number_of_students: Number(values.number_of_students),
        number_of_team_leaders: Number(values.number_of_team_leaders),
      };

      const res = await fetch(`${baseUrl}/api/participation-requests/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success(
          "Thank you for your registration. You will receive a confirmation email from the organization shortly. Please allow a few moments for this correspondence to arrive."
        );
        form.reset();
      } else {
        const errorData = await res.json().catch(() => null);
        if (errorData) {
          const firstError = Object.values(errorData).flat()[0];
          if (typeof firstError === "string") {
            toast.error(firstError);
          } else {
            toast.error("Failed to submit registration.");
          }
        } else {
          toast.error("Failed to submit registration.");
        }
      }
    } catch (error) {
      toast.error("An error occurred while submitting.");
      console.error(error);
    }
  }

  const studentCounts = [
    { id: "0", value: "0", label: "0 student" },
    { id: "1", value: "1", label: "1 student" },
    { id: "2", value: "2", label: "2 students" },
    { id: "3", value: "3", label: "3 students" },
    { id: "4", value: "4", label: "4 students" },
    { id: "5", value: "5", label: "5 students" },
  ];

  const teamLeaders = [
    { id: "0", value: "0", label: "0 team leader" },
    { id: "1", value: "1", label: "1 team leader" },
    { id: "2", value: "2", label: "2 team leaders" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8"
    >
      <Toaster />

      <div className="mb-8 flex justify-center">
        <BrandLockup priority />
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Registration Form
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Array.isArray(countries) &&
                      countries.map((country) => (
                        <SelectItem
                          key={country.id}
                          value={country?.id?.toString()}
                        >
                          {country.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Array.isArray(roles) &&
                      roles.map((role) => (
                        <SelectItem key={role.id} value={role?.id?.toString()}>
                          {role.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your subject" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Array.isArray(subjects) &&
                      subjects.map((subject) => (
                        <SelectItem
                          key={subject.id}
                          value={subject?.id?.toString()}
                        >
                          {subject.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="number_of_students"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How many students are coming?</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select number of students" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {studentCounts.map((option) => (
                      <SelectItem key={option.id} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="number_of_team_leaders"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How many team leaders are coming?</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select number of team leaders" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {teamLeaders.map((option) => (
                      <SelectItem key={option.id} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john.doe@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="whatsapp_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>WhatsApp Number</FormLabel>
                <FormControl>
                  <Input placeholder="+1234567890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="additional_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Number</FormLabel>
                <FormControl>
                  <Input placeholder="+1234567890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            Submit Registration
          </Button>
        </form>
      </Form>
    </motion.div>
  );
};

export default RegistrationForm;
