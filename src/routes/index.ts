import express from "express";
import courseRouter from "../modules/course/course.route";
import categoryRouter from "../modules/category/category.route";
import reviewRouter from "../modules/review/review.route";



const router = express.Router();

const applicationRoutes = [
    { path: '/', controller: courseRouter },
    { path: '/categories', controller: categoryRouter },
    { path: '/reviews', controller: reviewRouter },
];

applicationRoutes.forEach(route => {
    router.use(route.path, route.controller);
});

export default router;
