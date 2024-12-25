"use server"

import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { Workflow, WorkflowSchemaType } from '@/schema/workflow';
import { WorkflowStatus } from '@/types/workflow';
import { auth } from '@clerk/nextjs/server';


export async function CreateWorkflow(
    from: WorkflowSchemaType
) {
    // Add your code here
    const {success, data} = Workflow.safeParse(from);
    if(!success) {
        throw new Error("Invalid input");
    }
    //check user authentication
    const {userId} = await auth();

    if(!userId) {
        throw new Error("User not authenticated")
    }

    const result = await prisma.workflow.create({
        data: {
            userId,
            status: WorkflowStatus.DRAFT,
            definition: "Default definition",  // Add your code here
            ...data
        }
    });

    if(!result) {
        throw new Error("Failed to create workflow");
    }

    redirect(`/workflows/editor/${result.id}`);
}