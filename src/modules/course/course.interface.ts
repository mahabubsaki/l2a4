import { Model, Schema, Types } from 'mongoose';

interface ITag {
    name: string;
    isDeleted: boolean;
}

export interface ICourseDetails {
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    description: string;
}

export interface ICourse {
    title: string;
    instructor: string;
    categoryId: Schema.Types.ObjectId;
    price: number;
    tags: ITag[];
    startDate: string;
    endDate: string;
    language: string;
    provider: string;
    durationInWeeks: number;
    createdBy: Types.ObjectId;
    details: ICourseDetails;
}


export interface ICourseMethods {
    demo: () => string;
}

export interface ICourseStatics extends Model<ICourse, object, ICourseMethods> {
    demo: () => string;
}


