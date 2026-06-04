"use client";

import { loginWithGoogle, logout } from "@/services/auth.service";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import { ApplicationForm } from "@/components/applications/application-form";
import { Application } from "@/types/application";
import { addApplication, getApplications } from "@/lib/application-storage";
import { ApplicationList } from "@/components/applications/application-list";
import { useEffect, useState } from "react";
import { createApplication } from "@/services/application.service";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  const { user, loading } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = (data: any) => {
    const newApp: Application = {
      id: crypto.randomUUID(),

      ...data,

      payAmount: data.payAmount ?? null,

      documents: [],

      synced: false,

      createdAt: new Date().toISOString(),
    };

    createApplication(newApp);

    setApplications(getApplications());
  };

  useEffect(() => {
    setApplications(getApplications());
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <main className="px-4 sm:px-0 container mx-auto py-10">
      <div className="mb-6 rounded border bg-muted p-4 text-sm">
        <p className="text-muted-foreground">
          {`"The future belongs to those who believe in the beauty of their
              dreams." - Eleanor Roosevelt`}
        </p>
      </div>

      <div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className="h-full">
            <AccordionTrigger className="h-full bg-amber-50 rounded-md  px-2 border border-amber-200 aria-expanded:rounded-b-none aria-expanded:bg-amber-100">
              Application Form
            </AccordionTrigger>
            <AccordionContent className="h-full">
              <ApplicationForm onSubmit={(data) => handleCreate(data)} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="mt-10">
          <h2>Applications List</h2>
          <ApplicationList applications={applications} />
        </div>
      </div>
    </main>
  );
}
