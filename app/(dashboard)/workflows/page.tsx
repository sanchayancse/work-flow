import { GetWorkflowsForUser } from "@/actions/workflows/getWorkflowsForUser";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { waitFor } from "@/lib/helper/waitFor";
import { AlertCircle, InboxIcon } from "lucide-react";
import React, { Suspense } from "react";
import CreateWorkflowDialog from "./_components/CreateWorkflowDialog";

const page = () => {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className=" text-3xl font-bold"> WorkFlows</h1>
          <p className=" text-muted-foreground">
            Create and manage your workflows
          </p>
        </div>
        <CreateWorkflowDialog/>
      </div>

      <div className=" h-full py-6">
        <Suspense fallback={<UserWorkflowsSkeleton />}>
          {/* Add your components here */}
          <UserWorkflows />
        </Suspense>
      </div>
    </div>
  );

  function UserWorkflowsSkeleton() {
    return (
      <div className="space-y-2">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    );
  }

  async function UserWorkflows() {
    try {
      const workflows = await GetWorkflowsForUser();
        if (workflows.length === 0) {
            return (
            <div className="flex flex-col gap-4 h-full items-center justify-center">
                <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
                    <InboxIcon size={40} className="stroke-primary"/>
                </div>
                <div className="flex flex-col gap-1 text-center">
                    <p className="font-bold"> No workflow created yet</p>
                    <p className="text-sm text-muted-foreground"> Click the button bellow to create your first workflow </p>

                </div>
                <CreateWorkflowDialog trigerText="Create your first workflow"/>
            </div>
            );
        }
      return <pre>{JSON.stringify(workflows, null, 4)}</pre>;
    } catch (e) {
      return (
        <Alert variant={"destructive"}>
          <AlertCircle className="w-4 h-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Please try again later</AlertDescription>
        </Alert>
      );
    }
  }
};

export default page;
