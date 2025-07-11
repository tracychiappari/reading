import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Perusal } from '@/types/models';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getInitials = (fullName: string) => {
    const allNames = fullName.trim().split(' ');
    const initials = allNames.reduce((acc, curr, index) => {
        if(index === 0 || index === allNames.length - 1){
            acc = `${acc}${curr.charAt(0).toUpperCase()}`;
        }
        return acc;
    }, '');
    return initials;
}

export const formatStatus = (status: Perusal['status']) => {
    const statusMap = {
        not_started: 'Not Started',
        in_progress: 'In Progress',
        completed: 'Completed',
        abandoned: 'Abandoned'
    };

    return statusMap[status] || status;
};
