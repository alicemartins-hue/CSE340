
import {
    getAllCategories, getCategoryDetails,
    getProjectsByCategoryId } from '../models/categories.js';


const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title:"Categories", categories });
};

export async function showCategoryDetailsPage(req, res) {

    const id = req.params.id;

    const category = await getCategoryDetails(id);

    const projects = await getProjectsByCategoryId(id);

    res.render("category", {
        title: category.name,
        category,
        projects
    });
}

export { showCategoriesPage };