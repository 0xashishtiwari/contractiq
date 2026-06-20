'use server'
import {prisma} from '@/lib/prisma';
import { auth } from '@/auth';
export const getUserContracts = async () => {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
        throw new Error("User not authenticated");
    }
    const contracts = await prisma.contract.findMany({
        where : {
            userId : userId
        }
    });
    return contracts;
};