import { ICourseDetails } from "../modules/course/course.interface";


const retrieveNested = (obj: ICourseDetails, base: string) => {
    const objKeys = Object.keys(obj);
    const result: Record<string, string> = {};
    objKeys.forEach(key => {
        result[`${base}.${key}`] = obj[key as keyof typeof obj];
    });
    return result;
};

export default retrieveNested;