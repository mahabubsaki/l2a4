import { differenceInDays, parseISO } from 'date-fns';
export default function dateToWeek(start: string, end: string): number {
    const startDate = parseISO(start);
    const endDate = parseISO(end);
    const difference = differenceInDays(endDate, startDate);

    const daysDifference = Math.ceil((difference > 0 ? difference : 1) / 7);
    return daysDifference;
}