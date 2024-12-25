"use client";

import CustomDialogHeader from "@/components/CustomDialogHeader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Workflow, WorkflowSchemaType } from "@/schema/workflow";
import { Layers2Icon, Loader2 } from "lucide-react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { CreateWorkflow } from "@/actions/workflows/createWorkflows";
import { toast } from "sonner";

function CreateWorkflowDialog({ trigerText }: { trigerText?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<WorkflowSchemaType>({
    resolver: zodResolver(Workflow),
    defaultValues: {},
  });

  const {mutate, isPending} = useMutation({
    mutationFn: CreateWorkflow,
    onSuccess: () => {
     toast.success("Workflow created successfully", {id: "create-workflow"})
    },
    onError: (e) => {
      toast.error("Failed to create workflow", {id: "create-workflow"})
    }
  })

  const onSubmit = useCallback((values: WorkflowSchemaType) => {
    toast.loading("Creating workflow", {id: "create-workflow"})
    mutate(values)
  }, [mutate]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>{trigerText ?? "Create workflow"}</Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          icon={Layers2Icon}
          title="Create a new workflow"
          subTitle="Create a new workflow by providing a name and description"
        />
        <div className="p-6">
          <Form {...form}>
            <form className="space-y-8 w-full" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Name
                      <p className="text-xs text-primary">(required)</p>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Choose a destructive and unique name for your workflow
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
                )}
              />

              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Description
                      <p className="text-xs text-muted-foreground">
                        (optional)
                      </p>
                    </FormLabel>
                    <FormControl>
                      <Textarea className="resize-none " {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide a brief description of ehat your workflow does.
                      <br></br>
                      This will help you and your team understand what the
                      workflow does
                    </FormDescription>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? <Loader2 className="animate-spin"/> : "Proceed"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateWorkflowDialog;
