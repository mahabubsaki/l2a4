
import mongoose, { Types } from "mongoose";
import { IQueryBuilder } from "../../interface/error";
import dateToWeek from "../../utilities/dateToWeek";
import { ICourse } from "./course.interface";
import Course from "./course.model";
import { IReview } from "../review/review.interface";
import retrieveNested from "../../utilities/retrieveNested";

export const coursePost = async (payload: ICourse, userId: Types.ObjectId): Promise<ICourse> => {
    payload.durationInWeeks = payload.durationInWeeks || dateToWeek(payload.startDate, payload.endDate);
    payload.createdBy = userId;
    const result = (await Course.create(payload)).toObject();
    return result;
};
export const courseGet = async (query: IQueryBuilder): Promise<{ courses: ICourse[], meta: { total: number, limit: number, page: number; }; }> => {
    const courses = await Course.find(query.filter, null, {
        sort: query.sort,
        skip: (query.meta.page - 1) * query.meta.limit,
        limit: query.meta.limit,
        populate: {
            path: 'createdBy',
            model: 'User2',
            select: {
                password: 0,
                passwordHistory: 0
            }
        }
    });

    const total = await Course.countDocuments(query.filter);
    return { courses, meta: { limit: query.meta.limit, page: query.meta.page, total } };
};
export const courseWithReviewGet = async (id: string): Promise<{ course: ICourse, reviews: IReview[]; }> => {
    const result = await Course.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(id),
            },
        },
        {
            $facet: {
                course: [
                    {
                        $project: {
                            _id: 1,
                            title: 1,
                            instructor: 1,
                            categoryId: 1,
                            price: 1,
                            tags: 1,
                            startDate: 1,
                            endDate: 1,
                            language: 1,
                            provider: 1,
                            durationInWeeks: 1,
                            details: 1,
                            createdBy: 1
                        },
                    }, {
                        $lookup: {
                            from: "users2",
                            localField: "createdBy",
                            foreignField: "_id",
                            as: "createdBy"
                        }
                    },
                    {
                        $project: {
                            _id: 1,
                            title: 1,
                            instructor: 1,
                            categoryId: 1,
                            price: 1,
                            tags: 1,
                            startDate: 1,
                            endDate: 1,
                            language: 1,
                            provider: 1,
                            durationInWeeks: 1,
                            details: 1,
                            createdBy: {
                                $arrayElemAt: ['$createdBy', 0]
                            },
                        }
                    }, {
                        $project: {
                            "createdBy.password": 0,
                            "createdBy.passwordHistory": 0,
                        }
                    }
                ],
                reviews: [
                    {
                        $lookup: {
                            from: "reviews",
                            localField: "_id",
                            foreignField: "courseId",
                            as: "reviews",
                        },
                    },
                    {
                        $unwind: "$reviews",
                    },
                    {
                        $project: {
                            courseId: "$reviews.courseId",
                            rating: "$reviews.rating",
                            review: "$reviews.review",
                            createdBy: "$reviews.createdBy"
                        },
                    },
                    {
                        $lookup: {
                            from: "users2",
                            localField: "createdBy",
                            foreignField: "_id",
                            as: "createdBy",
                        },
                    },
                    {
                        $project: {
                            courseId: 1,
                            rating: 1,
                            review: 1,
                            createdBy: {
                                $arrayElemAt: ['$createdBy', 0]
                            },
                        },
                    },
                    {
                        $project: {
                            "createdBy.password": 0,
                            "createdBy.passwordHistory": 0,
                        },
                    }
                ],
            },
        },
    ]);


    return { course: result[0].course[0], reviews: result[0].reviews };
};
export const courseBestGet = async (): Promise<{ course: ICourse; }> => {
    const result = await Course.aggregate([
        {
            $lookup: {
                from: 'reviews',
                localField: '_id',
                foreignField: 'courseId',
                as: 'reviews',
            },
        },
        {
            $addFields: {
                averageRating: {
                    $round: [{ $avg: '$reviews.rating' }, 2],
                },
                reviewCount: { $size: '$reviews' },
            },
        },
        {
            $sort: { averageRating: -1 },
        },
        {
            $project: {
                _id: 1,
                title: 1,
                instructor: 1,
                categoryId: 1,
                price: 1,
                tags: 1,
                startDate: 1,
                endDate: 1,
                language: 1,
                provider: 1,
                durationInWeeks: 1,
                details: 1,
                averageRating: 1,
                reviewCount: 1,
                createdBy: 1
            },
        },
        {
            $lookup: {
                from: 'users2',
                localField: 'createdBy',
                foreignField: '_id',
                as: 'createdBy'
            }
        },
        {
            $project: {
                _id: 1,
                title: 1,
                instructor: 1,
                categoryId: 1,
                price: 1,
                tags: 1,
                startDate: 1,
                endDate: 1,
                language: 1,
                provider: 1,
                durationInWeeks: 1,
                details: 1,
                averageRating: 1,
                reviewCount: 1,
                createdBy: {
                    $arrayElemAt: ['$createdBy', 0]
                },
            },
        },
        {
            $project: {
                "createdBy.password": 0,
                "createdBy.passwordHistory": 0,
            },
        },
        {
            $limit: 1,
        },
    ]);;


    return { course: result[0] };
};


export const courseUpdate = async (id: string, payload: Partial<ICourse>): Promise<ICourse> => {
    const { tags, ...rest } = payload;
    const willDeleteTags = tags ? tags.filter(i => i.isDeleted === true).map(i => i.name) : [];
    const willAddTags = tags ? tags.filter(i => i.isDeleted === false) : [];

    let nested = {};
    if (rest.details) {
        nested = retrieveNested(rest.details, 'details');
        delete rest.details;
    }
    const update = { ...nested, ...rest };


    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        await Course.updateOne({ _id: new Types.ObjectId(id) }, {

            $pull: { tags: { name: { $in: willDeleteTags } } },

        }, { session });
        const result = await Course.findByIdAndUpdate(id, {
            $set: {
                ...update
            },
            $addToSet: {
                tags: {
                    $each: willAddTags
                },

            },

        }, { session, new: true, populate: { path: 'createdBy', model: 'User2', select: { password: 0, passwordHistory: 0 } } });

        await session.commitTransaction();
        return result as ICourse;

    } catch (err) {
        await session.abortTransaction();
        throw err;
    } finally {
        session.endSession();
    }

};